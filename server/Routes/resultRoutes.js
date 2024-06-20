const express = require('express');
const router = express.Router();

router.get('/:userId', (req,res)=>{
    res.send("User result");
});

module.exports = router;