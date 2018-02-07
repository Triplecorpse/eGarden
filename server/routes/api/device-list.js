const router = require('express').Router();
const usb = require('usb');

router.get('/', function(req, res) {
    res.json(usb.getDeviceList());
});

module.exports = router;