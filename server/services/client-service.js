const clients = {};
const fs = require('fs');
const Log = require('log');
const log = new Log('info', fs.createWriteStream('my.messages.log'));

function addClient(key, ws) {
    clients[key] = ws;
    log.info(`NEW CLIENT: registered ${key} at ${new Date()}`);
}

function removeClient(key) {
    delete clients[key];
    log.info(`REMOVED CLIENT: unregistered ${key} at ${new Date()}`);
}

function sendToAll(message, options) {
    options = options || {};
    log.info('Websocket message is to be sent', message);
    try {
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        } else if (typeof message !== 'string') {
            message = message.toString();
        }

        for (let key in clients) {
            if (clients.hasOwnProperty(key)) {
                clients[key].send(message);
            }
        }

        if (!clients.length) {
            log.warning('NO CLIENT REGISTERED')
        } else {
            log.info(`SENT TO ${clients.length} CLIENTS`)
        }

        return true;
    } catch (e) {

        log.error('Couldn\'t send some messages', e);


        return false;
    }
}

module.exports = {addClient, removeClient, sendToAll};
