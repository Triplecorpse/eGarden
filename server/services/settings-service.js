const fileService = require('./file-service');
const e = require('./events-service');
const Message = require('../models/Message');
let config;

(function update() {
    fileService.readFile(__dirname + '/config.json')
        .then(data => {
            config = JSON.parse(data);
            setTimeout(update, 60000);
            e.emit('server:config-update', new Message({header: 'server:config-update', body: data, status: 'success'}));
        })
        .catch(err => {
            console.error(err);
            e.emit('server:config-update', new Message({header: 'server:config-update', body: err, status: 'fail'}));
        })
})();

module.exports = {get config() {return config}};
