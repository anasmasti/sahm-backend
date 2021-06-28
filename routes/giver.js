const express = require('express');
const router = express.Router();
//import giver model for post methods
const Giver = require("../models/giver");

router.get('/',async (req,res)=>{
   try{
       const giversList = await Giver.find();
       res.json(giversList);
   }
   catch(err){
       res.json({message : err.message});
   }
// res.send('test route')
    
});

router.get('/:giverID',async (req,res)=>{
    try{
        const giverById = await Giver.findById(req.params.giverID);
        res.json(giverById);
    }
    catch(err){
        res.json({message : err.message});
    }
 // res.send('test route')
     
 });

 router.delete('/:giverID',async (req,res)=>{
    try{
        const deletedGiver = await Giver.remove({_id: req.params.giverID});
        res.json(deletedGiver);
    }
    catch(err){
        res.json({message : err.message});
    }
 // res.send('test route')
     
 });

// post a new giver 
router.post('/', async (req,res) => {
    // console.log(req.body);
  
     try{
        const giver = new Giver({
            Nom : req.body.Nom,
            Prenom : req.body.Prenom,
            Cin : req.body.Cin,
            tel : req.body.tel
        }) ;
         const savedGiver = await giver.save();
         res.json(savedGiver);
     }
     catch(err){
         res.json({message : err.message});
     }
       

});

module.exports = router;