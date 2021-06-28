// const { required } = require('@hapi/joi');
const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Users = require("../models/Users");
// const { registerValidation, loginValidation } = require('../validation');
// const jwt = require('jsonwebtoken');


router.post('/register', async (req,res) => {
    try{
        res.send(1);
//     const validation = registerValidation(req.body);
//     if(validation.error) return res.send(validation.error.details[0].message);
//     const userExists = await Users.findOne({email : req.body.email});
   
//    if(userExists) return res.send('email already exists');
//     // const salt = await bcrypt.genSalt(10);
//     const hashedPW = await bcrypt.hash(req.body.password , salt);
//     const user = new Users({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashedPW
//     });
//     const savedUser = await user.save();
//     res.send(savedUser);
    }
    catch(err){
        res.send(err.message);
    }
});

router.post('/login', async(req,res) => {
    // const validation = loginValidation(req.body);
    // if(validation.error) return res.send(validation.error.details[0].message);
    // const user = await Users.findOne({email: req.body.email});
    // if(!user) return res.send('email introuvable');
    // const pw = await bcrypt.compare(req.body.password,user.password);
    // if(!pw) return res.send('mot de passe incorrect');
    
    // //JWT signing
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token);
    
    // res.send('logged in succesfully !')
    res.send(1);
});

router.get('/register',async (req,res)=>{
    try{
        const toutUsers = await Users.find();
        res.json(toutUsers);
    }
    catch(err){
        res.json({message : err.message});
    }
 // res.send('test route')
     
 });




// ------------------------------------------------

   
//--------------------------------------------------
module.exports = router;