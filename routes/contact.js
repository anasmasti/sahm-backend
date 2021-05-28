const Contact = require('../models/contact.model.js');
const express = require('express');
const router = express.Router();

//Add contact
router.post('/', async(req, res) => {
    const contact = new Contact({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        message: req.body.message,
    });
    await contact
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "can't add contact" || err.message,
            });
        });
});

//get all contact
router.get('/', async(req, res) => {
    await Contact.find()
        .sort({
            updatedAt: 'desc',
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send("Can't get All Contacts", err);
        });
});

//get Contcat by ID
router.get('/:Id', async(req, res) => {
    await Contact.findById(req.params.Id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send('not found or invalid ID', err);
        });
});

//Delete contacts
router.delete('/:Id', async(req, res) => {
    await Contact.findByIdAndDelete(req.params.Id)
        .then(() => {
            res.send('Deleted Succefuly');
        })
        .catch((err) => {
            res.send({
                message: err.message || 'error deleting',
            });
        });
});

module.exports = router;