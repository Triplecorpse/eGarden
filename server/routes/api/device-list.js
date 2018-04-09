const router = require('express').Router();


router.get('/', function(req, res) {
    res.json({v: '0.1'});
});

module.exports = router;