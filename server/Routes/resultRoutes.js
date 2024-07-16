const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuserMiddile')
const interviewModel = require('../models/interviewModel')
router.post('/result', getuser,async (req, res) => {
  try {
    const questionAnswer = req.body.questionAnswer;
const stringAnswer = JSON.stringify(questionAnswer)
  
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    async function run() {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const finalPrompt = `
      Based on the following question and answer, rate the answer on a scale from 0 to 100, and provide an explainable feedback about the answer to make it better:\n\n
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
      const cleanedString = text.replace(/```javascript|```/g, '').trim();
      const cleanedString1 = cleanedString.replace(/json|/g, '').trim();
  let hhh = JSON.parse( cleanedString1)
      // Parse the response manually
      // const scoreMatch = text.match(/Score: (\d+)/);
      // const tipMatch = text.match(/Tip: (.*)/);
      const userId = req.user.id;

    //  const val = await interviewModel.create({userId,score:hhh.score})
        res.send(cleanedString1);
       
    }
    
    run();
  } catch (err) {
    res.send({ error: "Error occurred in reading file.txt" });
  }
});

router.get('/:userId', (req, res) => {
  res.send('user result');
});

module.exports = router;
