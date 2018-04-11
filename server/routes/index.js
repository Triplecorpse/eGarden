const router = require('express').Router();
const fileService = require('./../services/fileService');
const clientService = require('./../services/clientService');
const boardService = require('./../services/boardService');
const Message = require('./../models/Message');

router.use('/api', require('./api'));

router.get('/', function (req, res) {
    fileService.readFile('./eGardenUI/dist/index.html')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

router.ws('/connect', (ws) => {
    const message = new Message({header: 'connection', status: 'success', body: 'Connection established'});
    ws.send(JSON.stringify(message));
    clientService.addClient(ws.upgradeReq.headers['sec-websocket-key'], ws);

    ws.on('message', (msg) => {
        const message = JSON.parse(msg);

        console.log(message);

        // boardService.setLightColor(message);
    });

    ws.on('close', () => {
        clientService.removeClient(ws.upgradeReq.headers['sec-websocket-key']);
    });
});

module.exports = router;