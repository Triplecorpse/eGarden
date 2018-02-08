const usb = require('usb');
const usbDetect = require('usb-detection');
const clientService = require('./../services/clientService');
const http = require('http');
const fs = require('fs');
const file = fs.createWriteStream('./server/dictionary/dic');

http.get('http://www.linux-usb.org/usb.ids', function (response) {
    console.log('USB dictionary was updated');
    response.pipe(file);
}).on('error', function (err) { // Handle errors
    fs.unlink('./server/dictionary/dic'); // Delete the file async. (But we don't check the result)
    console.log('Error when updating USB dictionary');
});

function watch() {
    usbDetect.startMonitoring();
    usbDetect.on('change', device => {
        // clientService.sendToAll(device);
    });
    usb.on('attach', device => {
        device.open();
        clientService.sendToAll(device.interfaces);
    })
}

function unWatch() {
    usbDetect.stopMonitoring();
}


module.exports = {watch, unWatch};