const User = require('../../models/user.model.js');
var express = require('express');
var router = express.Router()

//Add new user
router.post('/', async(req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        age: req.body.age,
        school_level: req.body.school_level,
        job: req.body.job,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.adress,
        cin: req.body.cin,
        type: req.body.type,
        action: req.body.action,
        activation: req.body.activation,
    });
    await user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error creating."
            });
        });
});

//Find all user and sort them by order descending 
router.get('/', async(req, res) => {
    await User.find().populate('action', 'type -_id').sort({ 'updatedAt': 'desc' })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error retrieving."
            });
        });
});

//Get user by id
router.get('/:Id', async(req, res) => {
    await User.findById(req.params.Id).populate('action', 'type -_id')
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
});

//Get count of all benifiteds
router.get('/count/all', async(req, res) => {
    const count = await User.find().countDocuments();
    return res.send(JSON.stringify(count));
});

//Update user
router.put('/:Id', async(req, res) => {
    try {
        if (Object.keys(req.body).length === 0) return res.send("content cannot be empty")

        await User.findByIdAndUpdate(req.params.Id, {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
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
                        message: "User not found with id " + req.params.Id
                    });
                }
                res.send(data);
            })
    } catch {
        throw res.send("Can't update user with Id " + req.params.Id)
    }
});

//Delete benificed
router.delete('/:Id', async(req, res) => {
    await User.findByIdAndRemove(req.params.Id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.Id
                });
            }
            res.send({ message: "User deleted successfully!" });
        })
});


module.exports = router;