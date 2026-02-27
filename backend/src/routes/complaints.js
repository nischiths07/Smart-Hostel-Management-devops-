const express = require('express');
const Complaint = require('../models/Complaint');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Student: Submit complaint
router.post('/', auth, async (req, res) => {
    try {
        const complaint = new Complaint({
            ...req.body,
            student: req.user._id
        });
        await complaint.save();
        res.status(201).json(complaint);
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
