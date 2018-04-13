const router = require('express').Router();
const fileService = require('../services/file-service');
const clientService = require('../services/client-service');
const boardService = require('../services/board-services/board-service');
const Message = require('./../models/Message');
const tinygradient = require("tinygradient");

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
    const light = new Message({header: 'color', status: 'success', body: boardService.lightColor});
    const gradient = new Message({header: 'gradient', status: 'success', body: tinygradient(boardService.schedule).css()});
    const dayPos = new Message({header: 'position', status: 'success', body: boardService.dayPos.toString()});

    ws.send(JSON.stringify(message));
    ws.send(JSON.stringify(gradient));
    ws.send(JSON.stringify(dayPos));
    ws.send(JSON.stringify(light));

    clientService.addClient(ws.upgradeReq.headers['sec-websocket-key'], ws);

    ws.on('message', (msg) => {
        const message = JSON.parse(msg);

        console.log(message);

        if (message.header === 'color') {
            boardService.light.stop();
            boardService.light.set(message.body);
        }
    });

    ws.on('close', () => {
        clientService.removeClient(ws.upgradeReq.headers['sec-websocket-key']);
    });
});

module.exports = router;