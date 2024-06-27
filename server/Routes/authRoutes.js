const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/userModel');
const session = require('express-session');
const cors = require('cors');
const app = express();
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
const isAuthe = (req,res,next)=>{
    console.log(req.session.isAuth)
    if(req.session.isAuth){
        console.log("hyy")
        next();
    }else{
        console.log("ghjh")
        let val = req.session.isAuth;
        res.send({authentication:val});
    }
}
router.post('/register', async (req,res)=>{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.send("All fields are required");
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
        res.send("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
        name,
        email,
        password:hashedPassword
    });

    await newUser.save();

    res.send("User registered successfully");
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
    req.session.isAuth = true;
    return res.send({authentication:true})
    
});
router.post('/dashboard',isAuthe,(req,res)=>{

    res.send({message:"Welcome to dashboard"})
})

module.exports = router;