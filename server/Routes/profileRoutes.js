const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const getUser = require('../middleware/getuserMiddile');
const User = require('../models/userModel');
const ATS = require('../models/atsModel');
const Interview = require('../models/interviewModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});
const upload = multer({ storage: storage });

// Get profile data
router.get('/', getUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); 
        const atsScores = await ATS.find({ userId }).sort({ createdAt: -1 }).limit(3);
        const interviews = await Interview.find({ userId }).sort({ createdAt: -1 }).limit(3);
        
        res.json({ user, atsScores, interviews });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update profile data
router.put('/', getUser, upload.single('profileImg'), async (req, res) => {
    try{
        const userId = req.user.id;
        const { name, bio, contact, email, github } = req.body;
        const profileImg = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updateData = { name, bio, contact, email, github };
        if (profileImg) {
            updateData.profileImg = profileImg;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



// router.get('/createAts',async (req,res)=>{
//     ATS.create({
//         userId: "668b72888a15a9579fa3ce35",
//         resumeName : "cv1.pdf",
//         score: 70
//     })
//     ATS.create({
//         userId: "668b72888a15a9579fa3ce35",
//         resumeName : "cv2.pdf",
//         score: 90
//     })
//     ATS.create({
//         userId: "668b72888a15a9579fa3ce35",
//         resumeName : "cv3.pdf",
//         score: 60
//     })
// });

// router.get('/createInterview',async (req,res)=>{
//     Interview.create({
//         userId: "668b72888a15a9579fa3ce35",
//         score: 70,
//         mode: "online"
//     })
//     Interview.create({
//         userId: "668b72888a15a9579fa3ce35",
//         score: 90,
//         mode: "online"
//     })
//     Interview.create({
//         userId: "668b72888a15a9579fa3ce35",
//         score: 60,
//         mode: "online"
//     })
// });

module.exports = router;






// "668b72888a15a9579fa3ce35"