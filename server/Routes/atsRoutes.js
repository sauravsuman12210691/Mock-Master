const express = require('express');
const fs = require('fs');
const router = express.Router();
const filePath = "../client/src/resume_txt/"; // Fixed the path
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Use environment variables for sensitive information
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/getResume', async (req, res) => {
  try {
    const file = filePath + req.body.name;
    const jobtitle = req.body.job;

    // Reading the resume file
    const data = fs.readFileSync(file, 'utf8');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate the ATS score for the following resume data: ${data} and job title: ${jobtitle}. Evaluate how well this resume aligns with the job title and return a score in numeric form. Do not generate a single letter other than a score in numeric form in JS and do not use back ticks in the output.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    let cleanedString = text.replace(/```javascript|```/g, '').replace("json", "");

    const score = JSON.parse(cleanedString);

    res.send({ score });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred while processing the request." });
  }
});

router.get('/:userId', (req, res) => {
  res.send("Resume result");
});

module.exports = router;
