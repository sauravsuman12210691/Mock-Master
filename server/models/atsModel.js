const mongoose = require('mongoose');

const ATSSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    resumeName: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('ATS', ATSSchema);
