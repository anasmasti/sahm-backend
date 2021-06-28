const express = require('express')
//import actions model for post methods
const actions = require("../models/actions");



// post a new actions 
exports.AddAction=  async (req,res) => {
    // console.log(req.body);
  
     try{
        const action = new actions({
            vetement: {
                type: req.body.vetement.type,
                size: req.body.vetement.size,
                gender: req.body.vetement.gender,
                selected: req.body.vetement.selected,
            },
            formation: {
                type: req.body.formation.type,
                selected: req.body.formation.selected,
            },
            abonnement_mobile: {
                operator: req.body.abonnement_mobile.operator,
                selected: req.body.abonnement_mobile.selected,
            },
            abonnement_transport: {
                type_abonnement: req.body.abonnement_transport.type_abonnement,
                selected: req.body.abonnement_transport.selected,
            },
            autre:{ 
                text: req.body.autre.text,
                selected: req.body.autre.selected,
            },
            statut: req.body.statut,
            details: req.body.details,
            etat: req.body.etat,
            date_action: req.body.date_action,
            benificier: req.body.benificier
        }) ;
         const savedactions = await action.save();
         res.json(savedactions);
     }
     catch(err){
         res.json({message : err.message});
     }
       

};

//get normal actions
exports.ActionNormal= async (req,res)=>{
   try{
       const actionsList = await actions.find({statut:"normal" , etat:"initié"});
       res.json(actionsList);
   }
   catch(err){
       res.json({message : err.message});
   }
// res.send('test route')
    
};

//get alert actions
exports.GetActionAlerts =  async (req,res)=>{
     
    try{
        const actionsList = await actions.find({statut:"alert" , etat:"initié"});
        res.json(actionsList);
    }
    catch(err){
        res.json({message : err.message});
    }
  
 };

 //get action by id
 exports.ActionById= async (req,res)=>{
    try{
        const actionsByID = await actions.find({_id: req.params.actionsID});
        res.json(actionsByID);
    }
    catch(err){
        res.json({message : err.message});
    }
     
 };

//delete action by id 
exports.deleteById= async (req,res)=>{
    try{
        const deletedactions = await actions.remove({_id: req.params.actionsID});
        res.json(deletedactions);
    }
    catch(err){
        res.json({message : err.message});
    }
     
 };

 //delete all actions 
 exports.DeleteActions= async (req,res)=>{
    try{
        const deletedactions = await actions.remove();
        res.json(deletedactions);
    }
    catch(err){
        res.json({message : err.message});
    }
 // res.send('test route')
     
 };


//   contribuer une action 
exports.ContribuerAction= async (req,res)=>{
    try{
       
        const actionsByID = await actions.updateOne({_id: req.params.actionsID}, {$set: {etat : req.body.etat , giver: req.body.giver}} );
        // const userByID = await userByID.updateOne({_id: req.body._id}, {$set: {action : req.params.actionsID}} );
          res.json(actionsByID);
        //   res.json(userByID);
        }
    catch(err){
        res.json({message : err.message});
    }
 res.send('test route');
     
 };



//  join action with benif by id 
exports.ActionBenif= async (req,res)=>{
    try{
        const actionBenif = await actions.find({_id: req.params.actionsID} ).populate('benificier');
        // const userByID = await userByID.updateOne({_id: req.body._id}, {$set: {action : req.params.actionsID}} );
          res.json(actionBenif);
        //   res.json(userByID);
        }
    catch(err){
        res.json({message : err.message});
    }
 res.send('test route')
     
 };



//   renitialiser une action 
exports.Renitialiser= async (req,res)=>{
    try{
       
        const actionsByID = await actions.updateOne({_id: req.params.actionsID}, {$set: {giver: req.body.giver , etat:req.body.etat}} );
        // const userByID = await userByID.updateOne({_id: req.body._id}, {$set: {action : req.params.actionsID}} );
          res.json(actionsByID);
        //   res.json(userByID);
        }
    catch(err){
        res.json({message : err.message});
    }
 res.send('test route')
     
 };


//get count of actions contribuer par selected giver  60c7675e8f244f21d45b24b8
exports.GiverById= async (req,res)=>{
    try{
        const userById = await actions.find({giver: req.params.userID}).populate('benificier');

        if(userById){
            res.json(userById);
        }
        else{
            res.json(0);
        }
        
    }
    catch(err){
        res.json(0);
    }
 // res.send('test route')
     
 };


 //search action statut = normal 
 exports.SearchActionNormal= async (req,res)=>{
    try{
        let parms = req.params.motCle;
        let actionRecherché = 0;
        if(parms === "vétement"){
            actionRecherché = await actions.find({'vetement.selected':"true" , etat: "initié" , statut:"normal" });
        }
        else if(parms === "formation"){
            actionRecherché = await actions.find({'formation.selected':"true" , etat: "initié" , statut:"normal" });
        }
        else if(parms === "abonnement_transport"){
            actionRecherché = await actions.find({'abonnement_transport.selected':"true" , etat: "initié" , statut:"normal" });
        }
        else if(parms === "abonnement_mobile"){
            actionRecherché = await actions.find({'abonnement_mobile.selected':"true" , etat: "initié" , statut:"normal" });
        }
        else if(parms === "autre"){
            actionRecherché = await actions.find({'autre.selected':"true" , etat: "initié" , statut:"normal" });
        }
       

        if(actionRecherché){
            res.json(actionRecherché);
        }
        else{
            res.json(0);
        }
        
    }
    catch(err){
        res.json(err.message);
    }
     
 };


 //search action statut = alert 
 exports.SearchActionAlert=async (req,res)=>{
    try{
        let parms = req.params.motCle;
        let actionRecherché = 0;
        if(parms === "vétement"){
            actionRecherché = await actions.find({'vetement.selected':"true" , etat: "initié" , statut:"alert" });
        }
        else if(parms === "formation"){
            actionRecherché = await actions.find({'formation.selected':"true" , etat: "initié" , statut:"alert" });
        }
        else if(parms === "abonnement_transport"){
            actionRecherché = await actions.find({'abonnement_transport.selected':"true" , etat: "initié" , statut:"alert" });
        }
        else if(parms === "abonnement_mobile"){
            actionRecherché = await actions.find({'abonnement_mobile.selected':"true" , etat: "initié" , statut:"alert" });
        }
        else if(parms === "autre"){
            actionRecherché = await actions.find({'autre.selected':"true" , etat: "initié" , statut:"alert" });
        }
       

        if(actionRecherché){
            res.json(actionRecherché);
        }
        else{
            res.json(0);
        }
        
    }
    catch(err){
        res.json(err.message);
    }
     
 }
