const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Interview', InterviewSchema);
