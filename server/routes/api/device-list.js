const router = require('express').Router();
const usb = require('usb');
const usbDetect = require('usb-detection');


router.get('/', function(req, res) {
    res.json(usb.getDeviceList());
    // usbDetect.find(function(err, devices) {
    //     if(err) {
    //         res.status(500).send(err);
    //     } else {
    //         res.send(devices);
    //     }
    // });
});

module.exports = router;