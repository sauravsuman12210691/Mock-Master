const express = require('express');
const router = express.Router();

router.post('/start', (req,res)=>{
    res.send("Starting mock interview");
});

router.get('/:userId',(req,res)=>{
    res.send("User result");
});

module.exports = router;