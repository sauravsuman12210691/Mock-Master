const express = require('express');
const router = express.Router();
const AIService = require('../services/aiservice'); // Import the AI service

router.post('/result', async (req, res) => {
  try {
    const questionsArray = req.body.questionsArray;
    const answersArray = req.body.answersArray;

    const QuesAnsPair = {
      question: questionsArray,
      answer: answersArray
    };

    try {
      const result = await AIService.checkQuestionAndAnswer(QuesAnsPair);
      res.send(result);
    } catch (err) {
      console.error('Error during content generation:', err);
      res.status(500).send({ error: 'An error occurred while generating content.' });
    }
  } catch (err) {
    console.error('Error during request processing:', err);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
});

router.get('/:userId', (req, res) => {
  res.send('user result');
});

module.exports = router;