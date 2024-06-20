const express = require('express');
const router = express.Router();

router.post('/register', (req,res)=>{
    res.send("Registering user");
});

router.post('/login', (req,res)=>{
    res.send("User login");
});

module.exports = router;