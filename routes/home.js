var express = require('express');
var router = express.Router()
var path = require('path');

//Call the index file on init app
router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})

module.exports = router;