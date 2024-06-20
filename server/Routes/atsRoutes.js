const express = require('express');
const router = express.Router();

router.post('/validateResume', (req,res)=>{
    res.send("Validating user resume")
});

module.exports = router;