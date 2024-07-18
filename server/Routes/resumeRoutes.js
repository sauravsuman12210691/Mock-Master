const multer = require('multer');
const getuser = require('../middleware/getuserMiddile');
const resumePost = require('../models/resume');
const express = require('express');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const path = require('path');
const fs = require('fs');
const router = express.Router();


router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../resume/');
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

// router.post('/upload', getuser, upload.single('file'), async (req, res) => {
//   try {
//     const { description } = req.body;
//     console.log(req.user);
//     const fileName = req.file.filename;
//     console.log(req.user.id);

//     await resumePost.create({ fileName, description, user: req.user.id });

//     console.log(req.body);
//     res.send("Uploaded!!");
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Server Error');
//   }
// });






const upload2 = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../resume/');
      console.log('Creating directory:', uploadPath); // Add log
      try {
        fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
        cb(null, uploadPath);
      } catch (error) {
        console.error('Error creating directory:', error);
        cb(error);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

router.post('/uploadPdfToText', getuser, upload2.single('file'), async (req, res) => {
  try {
    const { description } = req.body;
    const fileName = req.file.filename;

    await resumePost.create({ fileName, description, user: req.user.id });

    const pdfPath = req.file.path;
    console.log('PDF path:', pdfPath); // Add log
    const dataBuffer = fs.readFileSync(pdfPath);

    pdfParse(dataBuffer).then(async result => {
      // New Text file generet karne kee liye
      const txtFilePath = path.join(__dirname, '../resume_txt/', path.basename(pdfPath, '.pdf') + '.txt');
      console.log('Creating text file at:', txtFilePath); // Add log
      fs.writeFileSync(txtFilePath, result.text);

      // Read the text file
      const data = fs.readFileSync(txtFilePath, 'utf8');

      // To delete pdf
      fs.unlinkSync(pdfPath);

      res.send({ message: "PDF converted to text and saved.", filePath: txtFilePath,fileName:fileName });
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
