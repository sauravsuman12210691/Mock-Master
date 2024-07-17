const express = require('express');
const fs = require('fs');
const router = express.Router();
const getuser = require('../middleware/getuserMiddile')
const filePath = "../client/src/resume_txt/"; // Ensure this path is correct
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require("dotenv");
dotenv.config();
const ATSModel =require("../models/atsModel")

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/getResume', getuser,async (req, res) => {
  try {
    const file =  req.body.name;
    const jobtitle = req.body.jobtitle;
    const fileName = req.body.resumeName;

    const data = fs.readFileSync(file, 'utf8');

    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate the ATS score for the following resume data: ${data} and job title: ${jobtitle}. Evaluate how well this resume aligns with the job title and return a score in numeric form. Do not generate a single letter other than a score in numeric form in JS and do not use back ticks in the output.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    const cleanedString = text.replace(/```javascript|```/g, '').trim();

    const score = parseFloat(cleanedString);

    if (isNaN(score)) {
      throw new Error("Failed to parse score");
    }
    const userId = req.user.id;
const updateResume = await ATSModel.create({userId,score,resumeName:fileName})
  
 
  console.log(updateResume)
  res.send({ score });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred while processing the request." });
  }
});

router.get('/:userId',getuser, (req, res) => {
  res.send("Resume result");
});

module.exports = router;
