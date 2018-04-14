// Public API for board communication

const five = require('johnny-five');
const board = new five.Board();
const clientService = require('../client-service');
const Message = require('../../models/Message');
const tinygradient = require("tinygradient");
const scheduleService = require('../schedule-service');
const lightService = require('./light-service');
const e = require('./../events-service');
const log = require('./../log-service');
let lightInterval;
let color;

e.on('server:config-update', data => {
    if (data.success && !lightInterval) {
        board
            .on('ready', (e) => {
                lightService.rgb = new five.Led.RGB({
                    pins: {
                        red: 9,
                        green: 10,
                        blue: 11
                    },
                    isAnode: true
                });
                log.info('Board init succeeded:', e);
                boardState(true);
            })
            .on('fail', (e) => {
                log.error('Board init failed, run emulation instead:', e);
                boardState(false);
            });
    }
});

function boardState(success) {
    color = getColor();
    log.info('Color to be set:', color);
    if (success) {
        lightService.light = color;
    } else {
        log.info('IS EMULATED');
    }
    sendFrontendData(color);
    lightInterval = setTimeout(boardState, 60 * 1000, success);
}

function sendFrontendData(color) {
    clientService.sendToAll(new Message({
        header: 'color',
        body: color,
        status: 'success'
    }));

    clientService.sendToAll(new Message({
        header: 'gradient',
        body: tinygradient(scheduleService.lightMap).css(),
        status: 'success'
    }));

    clientService.sendToAll(new Message({
        header: 'position',
        body: scheduleService.dayPos,
        status: 'success'
    }));
}

function getColor() {
    const map = scheduleService.lightMap;
    const dayPos = scheduleService.dayPos;
    const gradient = tinygradient(map);

    return gradient.rgbAt(dayPos).toHexString();
}

const light = {
    stop(reason) {
        clearTimeout(lightInterval);
        log.info('Light switching interrupted', reason);
    },
    start(reason) {
        if (board.isReady) {
            boardState(true);
            console.log('Light switching renewed', reason);
        } else {
            console.log('An error occurred when starting lights, emulation run instead');
            clearTimeout(lightInterval);
            boardState(false)
        }
    },
    set(color) {
        try {
            lightService.light = color;
            clearTimeout(lightInterval);
            console.log('Light was set to', color);
        } catch (e) {
            console.error('Light cannot be set', e);
        }
    },
    get() {
        return color
    }
};

module.exports = {
    schedule: scheduleService.lightMap,
    dayPos: scheduleService.dayPos,
    light
};
