const usb = require('usb');
const clientService = require('./../services/clientService');

function watch() {
    usb.on('attach', device => {
        clientService.sendToAll(device);
    })
}

module.exports = {watch};