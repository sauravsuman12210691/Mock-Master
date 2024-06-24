const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/userModel');
const session = require('express-session');
const mongodbSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');

const mongodbURI = 'mongodb://localhost:27017/MockMaster';
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/MockMaster');

const store = new mongodbSession({
    uri: mongodbURI,
    collection: 'mysession'
});
router.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: store
}))
const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.send({authentication:req.session.isAuth});
    }
}
router.post('/register', async(req,res)=>{
    
    // const salt = await bcrypt.genSalt(10);
    // var secPassword = await bcrypt.hash(req.body.password, salt)
    // let userdet = await user.create({
    //    name: req.body.name,
    //    password: secPassword,
    //    email: req.body.email,
       
    // })
    // res.send({message:"User created successfully"})
    // // const {name, email, password} = req.body;
    
});

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const avilUser =await  user.findOne({email})
    console.log(avilUser)
    if(!avilUser){
    return res.send({authentication:false})
}
const isMatch = await bcrypt.compare(password,avilUser.password)
// const isMatch = password == avilUser.password;
if(!isMatch){
       return res.send({authentication:false})
       
    }
    return res.send({authentication:true})
    
});


module.exports = router;