const express = require('express');
const fs = require('fs');
const router = express.Router();
const filePath =".././client/src/resume_txt/";
router.post('/get-questionArray', (req,res)=>{
   try{
    let file =filePath+req.body.name;
    // return res.send(file)
   const data= fs.readFileSync(file,'utf8');

   try{
    
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI("AIzaSyCrz8IzEzcdfZiWMlb-8fK8fkpDaNh-IVE");
    
    async function run() {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const prompt = `${data} use this resume to generate atmost 15 mock interview question and return an array of object dont generate a single letter other then array of object in js and do not use back tick in the output `;
    
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      let cleanedString = text.replace(/```javascript|```/g, '');
      cleanedString = cleanedString.replace("json","")
      const questionsArray = JSON.parse(cleanedString);
// console.log(tes;
      res.send(questionsArray);
    }
    
    run();
   }catch(err){
    res.send({error: "error occured in reading file.txt"});
   }

//    res.send(data);
   
   }catch(err){
    res.send({error: "error occured in reading file.txt"});
   }
});

router.get('/:userId',(req,res)=>{
    res.send("User result");
});

module.exports = router;