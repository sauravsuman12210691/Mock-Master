const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env file

class AIService {
  static async checkQuestionAndAnswer(QuesAnsPair) {
    const question = QuesAnsPair.question;
    const answer = QuesAnsPair.answer;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

    const finalPrompt = `
      Based on the following question and answer, rate the answer on a scale from 0 to 100, and provide a explanable feedback about the answer to make it better:\n\n
      Question: ${question}\n
      Answer: ${answer}\n\n
      Response should be in the format:\n
      Score: <score>\n
      Tip: <tip>;
    `;

    const result = await model.generateContent(finalPrompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
}

module.exports = AIService;
