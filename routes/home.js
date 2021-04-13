var express = require('express');
var router = express.Router()

//Show message on init app
router.get('/', (req, res) => res.send('Sahm API Work! :)'))

module.exports = router;