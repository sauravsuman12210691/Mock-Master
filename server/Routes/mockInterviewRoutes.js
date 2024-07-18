const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const filePath = path.join(__dirname, '../resume_txt/');

router.post('/get-questionArray', async (req, res) => {
   
        const fileName = req.body.name;
        const fullFilePath = path.join(filePath, fileName);
        const data = fs.readFileSync(fullFilePath, 'utf8');

        const { GoogleGenerativeAI } = require('@google/generative-ai');

        const genAI = new GoogleGenerativeAI("AIzaSyCrz8IzEzcdfZiWMlb-8fK8fkpDaNh-IVE");

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `${data} use this resume to generate at most 4 mock interview questions and return an array of objects. Do not generate any additional text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response();
        const text = response.text();
        
        let cleanedString = text.replace(/```javascript|```/g, '');
        cleanedString = cleanedString.replace("json", "");
        const questionsArray = JSON.parse(cleanedString);
        
        res.send({ questionsArray });
})
    
//     } catch (err) {
//         res.send({ error:err });
//     }
// });

router.get('/:userId', (req, res) => {
    res.send("User result");
});

module.exports = router;
