const express = require('express');
const router = express.Router();
const verify = require('../verifyToken');
const Users = require('../../models/Users');
// const { registerValidation } = require('../../validation');
// const bcrypt = require('bcryptjs');

// get all  users
router.get('/', async (req,res) => {
    const user = await Users.find();
    res.json(user);
});

//Add new user
router.post('/', async(req, res) => {
    try{
        const validation = registerValidation(req.body);
        if(validation.error) return res.send(validation.error.details[0].message);
        const userExists = await Users.findOne({email : req.body.email});
        
       if(userExists) return res.send('email already exists');
        // const salt = await bcrypt.genSalt(10);
        const hashedPW = req.body.password ;
        const user = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        age: req.body.age,
        school_level: req.body.school_level,
        job: req.body.job,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: hashedPW,
        adress: req.body.adress,
        cin: req.body.cin,
        type: req.body.type,
       
    });
    await user.save();
    res.send(user);
    }
    catch(err){
        res.send(err.message);
    }
});


//get selected beneficiary by id 
router.get('/ActionBenef/:benifID', async (req,res) => {
    try {
        const benif = await Users.find({action : req.params.benifID});
    if(!benif) return res.send('benif not found !!');
    res.send(benif);
    } 
    catch (error) {
        res.send(error.message);
    }
    
});
//set action to  selected beneficiary by id 
router.patch('/ActionBenef/:benifID', async (req,res) => {
    try {
    const benif = await Users.updateOne({_id: req.params.benifID}, {$set: {action : req.body.action}} );
    if(!benif) return res.send('benif not found !!');
    // const savedbenif = await benif.save();
    res.send(benif);
    } 
    catch (error) {
        res.send(error.message);
    }
    
});




// modifier 
router.post('/:userID', async(req, res) => {
    try{
        const userExists = await Users.findOne({_id : req.params.userID});
        
       if(userExists)
        {
           
            userExists.action = req.body.action;
        }
    await userExists.save();
    res.send(userExists);
    }
    catch(err){
        res.send(err.message);
    }
});


// delete user by id 
router.delete('/:userID',async (req,res)=>{
    try{
        const deletedUser = await Users.remove({_id: req.params.userID});
        res.json(deletedUser);
    }
    catch(err){
        res.json({message : err.message});
    }
 // res.send('test route')
     
 });



 

module.exports = router;
















// {
//     "first_name":"aymane",
//     "last_name":"hammouch",
//     "gender":"masculin",
//     "age":"21",
//     "school_level":"bac+2",
//     "job":"software developper",
//     "phone":"0606060606",
//     "email":"aymane@mail.com",
//     "username":"aymane01",
//     "password":"medi2019",
//     "adress":"ain sebaa casablanca maroc",
//     "cin":"BJ1111",
//     "type":"giver"
// }