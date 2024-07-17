const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuserMiddile');
const interviewModel = require('../models/interviewModel');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require("dotenv");
dotenv.config();

router.post('/result', getuser, async (req, res) => {
  try {
    const questionAnswer = req.body.questionAnswer;
    const stringAnswer = JSON.stringify(questionAnswer);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const finalPrompt = `
      Based on the following question and answer, rate the answer on a scale from 0 to 100, and provide an explainable feedback about the answer to make it better.Do not generate a single letter other than a score in numeric form and feedback in JS and do not use back ticks in the output.:\n\n
      Question and Answer: ${stringAnswer}\n
     
      Response should be in the format:\n
     {
      "score" : <score>,
      "feedback" : "<feedback>"
      }
    `;

      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = await response.text();

      // Log the raw response for debugging
      console.log('Raw AI response:', text);

      // Add robust JSON parsing with error handling
      try {
        // Attempt to clean the response text
        const jsonResponse = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonResponse);

        const userId = req.user.id;
        const val = await interviewModel.create({
          userId,
          score: data.score,
          mode: "online",
          feedback: data.feedback
        });
        res.send({ data });
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send({ error: "Error occurred in processing the result. Invalid response format." });
      }
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