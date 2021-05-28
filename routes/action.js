const Action = require('../models/action.model.js');
const express = require('express');
const router = express.Router();

//Add action
router.post('/', async(req, res) => {
    const action = new Action({
        vetement: {
            type: req.body.vetement_type,
            size: req.body.vetement_size,
            gender: req.body.vetement_gender,
        },
        formation: req.body.formation,
        abonnement_mobile: {
            operator: req.body.operator,
        },
        abonnement_transport: {
            type_abonnement: req.body.type_abonnement,
        },
        autre: req.body.autre,
    });
    await action
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error Creating',
            });
        });
});

// get all actions
router.get('/', async(req, res) => {
    await Action.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error getting all actions',
            });
        });
});

//find action by ID
router.get('/:Id', async(req, res) => {
    await Action.findById(req.params.Id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(404).send({
                message: `"Not found with Id"${req.params.Id}` || err.message,
            });
        });
});

//update action
router.put('/:Id', async(req, res) => {
    if (!req.body.content) {
        res.send('content cant be empty');
    }
    await Action.findByIdAndUpdate(req.params.Id, {
        vetement: {
            type: req.body.vetement_type,
            size: req.body.vetement_size,
            gender: req.body.vetement_gender,
        },
        formation: req.body.formation,
        abonnement_mobile: {
            operator: req.body.operator,
        },
        abonnement_transport: {
            type_abonnement: req.body.type_abonnement,
        },
        autre: req.body.autre,
    }).then((data) => {
        res.send('');
    });
});

//Delete Action
router.delete('/:Id', async(req, res) => {
    await Action.findByIdAndRemove(req.params.Id)
        .then(() => {
            res.send('Removed Successfuly');
        })
        .catch((err) => {
            res.status(404).send({
                message: `"cannot remove with id"${req.params.Id}` || err.message,
            });
        });
});

module.exports = router;