const router = require('express').Router();

router.use('/device-list', require('./device-list'));

module.exports = router;