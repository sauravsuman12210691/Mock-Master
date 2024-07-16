const express = require('express');
const router = express.Router();

router.post('/result', async (req, res) => {
  try {
    const question = req.body.question;
    const answer = req.body.answer;
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    async function run() {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const finalPrompt = `
      Based on the following question and answer, rate the answer on a scale from 0 to 100, and provide an explainable feedback about the answer to make it better:\n\n
      Question: ${question}\n
      Answer: ${answer}\n\n
      Response should be in the format:\n
      Score: <score>\n
      Tip: <tip>;
    `;
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = await response.text();

      // Parse the response manually
      const scoreMatch = text.match(/Score: (\d+)/);
      const tipMatch = text.match(/Tip: (.*)/);

      if (scoreMatch && tipMatch) {
        const resultjson = {
          score: parseInt(scoreMatch[1], 10),
          tip: tipMatch[1].trim()
        };
        res.send(resultjson);
      } else {
        res.send({ error: "Invalid response format" });
      }
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
