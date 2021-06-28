const express = require('express');
const router = express.Router();
const actionController = require('../../controllers/actionsController');



router.get('/',actionController.ActionNormal);


router.get('/alert',actionController.GetActionAlerts);


router.get('/:actionsID',actionController.ActionNormal);


router.get('/actionBenif/:actionsID',actionController.ActionBenif);


router.get('/giver/:userID',actionController.GiverById);


router.get('/searchNormal/:motCle',actionController.SearchActionNormal);


router.get('/searchAlert/:motCle',actionController.SearchActionAlert);


router.post('/',actionController.AddAction);


router.delete('/:actionsID',actionController.deleteById);


router.put('/contribuer/:actionsID',actionController.ContribuerAction);


router.put('/renitialiser/:actionsID',actionController.Renitialiser);


module.exports = router;