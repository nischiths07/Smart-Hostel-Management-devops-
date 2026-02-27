const express = require('express');
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Student: Submit complaint with optional image
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const complaintData = {
            ...req.body,
            student: req.user._id
        };
        
        if (req.file) {
            complaintData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const complaint = new Complaint(complaintData);
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Student: Confirm resolution
router.patch('/:id/confirm', auth, async (req, res) => {
    try {
        const complaint = await Complaint.findOne({ _id: req.params.id, student: req.user._id });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found or unauthorized' });
        
        if (complaint.status !== 'Resolved') {
            return res.status(400).json({ message: 'Only resolved complaints can be confirmed.' });
        }

        complaint.isConfirmedByStudent = true;
        await complaint.save();
        res.json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Student: View their complaints
router.get('/my', auth, async (req, res) => {
    try {
        const complaints = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: View all complaints
router.get('/', auth, adminAuth, async (req, res) => {
    try {
        const { status, category } = req.query;
        let query = {};
        if (status) query.status = status;
        if (category) query.category = category;

        const complaints = await Complaint.find(query)
            .populate('student', 'name email')
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Update complaint status
router.patch('/:id', auth, adminAuth, async (req, res) => {
    try {
        const { status, adminRemarks } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status, adminRemarks },
            { new: true }
        );
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
