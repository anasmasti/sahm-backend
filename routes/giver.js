const Giver = require('../models/giver.model.js');
var express = require('express');
var router = express.Router()

//Add new giver
router.post('/', async(req, res) => {
    const giver = new Giver({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        gender: req.body.gender,
        cin: req.body.cin,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        action: req.body.action,
        activation: req.body.activation,
    });
    await giver.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error creating."
            });
        });
});

//Find all givers and sort them by order descending 
router.get('/', async(req, res) => {
    await Giver.find().populate('action', 'type -_id').sort({ 'updatedAt': 'desc' })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error retrieving."
            });
        });
});

//Find giver by id
router.get('/:Id', async(req, res) => {
    await Giver.findById(req.params.Id).populate('action', 'type -_id')
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Giver not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
});

//Get count of givers
router.get('/count', async(req, res) => {
    const count = await Giver.find().countDocuments();
    return res.send(JSON.stringify(count));
});

//Update giver
router.put('/:Id', async(req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "content can't be empty"
        });
    }
    await Giver.findByIdAndUpdate(req.params.Id, {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            gender: req.body.gender,
            cin: req.body.cin,
            type: req.body.type,
            phone: req.body.phone,
            email: req.body.email,
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
})

//Delete giver
router.delete('/:Id', async(req, res) => {
    await Giver.findByIdAndRemove(req.params.Id)
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