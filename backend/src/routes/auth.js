const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
        res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
