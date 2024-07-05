const multer = require('multer');
const getuser = require('../middleware/getuserMiddile');
const resumePost = require('../models/resume');
const express = require('express');
const cors = require('cors');

const path = require('path');
const fs = require('fs');
const router = express.Router();

router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../client/src/resume/');
    fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Appending extension
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format'), false);
    }
  }
});

router.post('/upload', getuser, upload.single('file'), async (req, res) => {
  try {
    const { description } = req.body;

    const fileName = req.file.filename;
    console.log(req.user.id);

    await resumePost.create({ fileName, description, user: req.user.id });

    console.log(req.body);
    res.send("Uploaded!!");
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
