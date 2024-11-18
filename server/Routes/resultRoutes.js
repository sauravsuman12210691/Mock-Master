const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuserMiddile');
const interviewModel = require('../models/interviewModel');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

router.post('/result', getuser, async (req, res) => {
  try {
    const questionAnswer = req.body.questionAnswer;
    const stringAnswer = JSON.stringify(questionAnswer);

    async function run() {
      const genAI = new GoogleGenerativeAI("AIzaSyAgA1iRMuFU59sZTob94PdESlgSwAYTHok");

      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const prompt = `Based on the following question and answer, rate the answer on a scale from 0 to 100, and provide an explainable feedback about the answer to make it better. Do not generate a single letter other than a score in numeric form and feedback in JS and do not use backticks in the output.\n\n
    Question and Answer: ${stringAnswer}\n
    Response should be in the format:\n
    {
      "score" : <score>,
      "feedback" : "<feedback>"
    }`
    
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonResponse = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      const data = JSON.parse(jsonResponse);

      const userId = req.user.id;
      await interviewModel.create({
        userId,
        score: data.score,
        mode: "online",
        feedback: data.feedback
      });
      res.send({ data });
    
    }
    
    run();

  } catch (err) {
    console.error('Error processing result:', err);
    res.status(500).send({ error: "Error occurred in processing the result." });
  }
});

router.get('/:userId', (req, res) => {
  res.send('user result');
});

module.exports = router;
