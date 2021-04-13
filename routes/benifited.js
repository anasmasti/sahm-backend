const Benifited = require('../models/benifited.model.js');
var express = require('express');
var router = express.Router()

//Add new benifited
router.post('/', async(req, res) => {
    const benifited = new Benifited({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
        school_level: req.body.school_level,
        job: req.body.job,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        cin: req.body.cin,
        type: req.body.type,
        action: req.body.action,
        activation: req.body.activation,
    });
    await benifited.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error creating."
            });
        });
});

//Find all benifited and sort them by order descending 
router.get('/', async(req, res) => {
    await Benifited.find().populate('action', 'type -_id').sort({ 'updatedAt': 'desc' })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error retrieving."
            });
        });
});

//Get benifited by id
router.get('/:Id', async(req, res) => {
    await Benifited.findById(req.params.Id).populate('action', 'type -_id')
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Benifited not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
});

//Get count of all benifiteds
router.get('/count/all', async(req, res) => {
    const count = await Benifited.find().countDocuments();
    return res.send(JSON.stringify(count));
});

//Update benifited
router.put('/:Id', async(req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "content can't be empty"
        });
    }
    await Benifited.findByIdAndUpdate(req.params.Id, {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            gender: req.body.gender,
            age: req.body.age,
            school_level: req.body.school_level,
            job: req.body.job,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            cin: req.body.cin,
            type: req.body.type,
            action: req.body.action,
            activation: req.body.activation,
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

//Delete benificed
router.delete('/:Id', async(req, res) => {
    await Benifited.findByIdAndRemove(req.params.Id)
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