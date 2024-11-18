const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// const filePath = path.join(__dirname, '../resume_txt/');

router.post('/get-questionArray', async (req, res) => {
    try {
     
        const filePath = req.body.name;
        
        // const fullFilePath = path.join(filePath, fileName);

        // Read the file asynchronously
        // const data = await fs.readFile(filePath, 'utf8');
        const data = await fs.readFile( filePath, 'utf8');
        async function run() {
          // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
          const genAI = new GoogleGenerativeAI("AIzaSyAgA1iRMuFU59sZTob94PdESlgSwAYTHok");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        
          const prompt = `${data} use this resume to generate at most 4 mock interview questions and return an array of objects. Do not generate any additional text.`;
        
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          let cleanedString = text.replace(/```javascript|```/g, '');
          cleanedString = cleanedString.replace("json", "");
          let questionsArray = JSON.parse(cleanedString)
          console.log(questionsArray)
          // localStorage.setItem('questionsArray',questionsArray)

  
          res.send({ questionsArray });
        }
        
        run();
    
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred' });
    }
});

router.get('/:userId', (req, res) => {
    res.send("User result");
});

module.exports = router;
