const Admin = require('../models/giver.model.js');
var express = require('express');
var router = express.Router()

//Add new admin
router.post('/', async(req, res) => {
    const admin = new Admin({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
        cin: req.body.cin,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
    });
    await admin.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error creating."
            });
        });
});

//Find all admins and sort them by order descending 
router.get('/', async(req, res) => {
    await Admin.find().sort({ 'updatedAt': 'desc' })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error retrieving."
            });
        });
});

//Get admin by id
router.get('/:Id', async(req, res) => {
    await Admin.findById(req.params.Id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
});

//Get count of all admins
router.get('/count/all', async(req, res) => {
    const count = await Admin.find().countDocuments();
    return res.send(JSON.stringify(count));
});

//Update admin
router.put('/:Id', async(req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "content can't be empty"
        });
    }
    await Admin.findByIdAndUpdate(req.params.Id, {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            gender: req.body.gender,
            age: req.body.age,
            cin: req.body.cin,
            type: req.body.type,
            phone: req.body.phone,
            email: req.body.email,
        }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
});

//Delete admin
router.delete('/:Id', async(req, res) => {
    await Admin.findByIdAndRemove(req.params.Id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.Id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
});


module.exports = router;