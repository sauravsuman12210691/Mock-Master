const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const getuser = require('../middleware/getuserMiddile');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();
const ATSModel = require('../models/atsModel');


const filePath = path.join(__dirname, '../resume_txt/');

router.post('/getResume', getuser, async (req, res) => {
  try {
    const { name, jobtitle, resumeName } = req.body;
    // const fullFilePath = path.join(filePath, name);
    
    const data = fs.readFileSync(name, 'utf8');
  
    
  const genAI = new GoogleGenerativeAI("AIzaSyAgA1iRMuFU59sZTob94PdESlgSwAYTHok");
  
  async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = `Generate the ATS score for the following resume data: ${data} and job title: ${jobtitle}. Evaluate how well this resume aligns with the job title and return a score in numeric form. Do not generate a single letter other than a score in numeric form.`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const score = parseFloat(text);
    // console.log(text);
    // res.send(text)
    const userId = req.user.id;
    const updateResume = await ATSModel.create({ userId, score, resumeName });
  
    console.log(updateResume);
    res.send({ score });
  }
    run();


   
    // const cleanedString = text.replace(/```javascript|```/g, '').trim();


    // if (isNaN(score)) {
    //   throw new Error('Failed to parse score');
    // }

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
});

router.get('/:userId', getuser, (req, res) => {
  res.send('Resume result');
});

module.exports = router;
