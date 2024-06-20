const express = require('express');
const router = express.Router();

router.post('/upload', (req,res)=>{
    res.send("uploading user resume");
});
router.get('/:userId', (req,res)=>{
    res.send("User details");
});

router.put('/update',(req,res)=>{
    res.send("Updating user resume");
})

module.exports = router;
