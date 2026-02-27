const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Other'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    adminRemarks: { type: String },
    imageUrl: { type: String },
    isConfirmedByStudent: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
