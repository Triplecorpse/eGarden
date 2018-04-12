const five = require('johnny-five');
const board = new five.Board();
const clientService = require('../client-service');
const Message = require('../../models/Message');
const tinygradient = require("tinygradient");
const scheduleService = require('../schedule-service');
const lightService = require('./light-service');
let lightInterval;
let color;
let rgb;

board
    .on('ready', () => boardState(true))
    .on('fail', () => boardState(false));

function boardState(success) {
    console.log('Board init success:', success);
    color = getColor();
    if (success) {
        lightService.rgb = new five.Led.RGB({
            pins: {
                red: 9,
                green: 10,
                blue: 11
            },
            isAnode: true
        });
        lightService.light = color;
    }
    console.log('Color to be set:', color);
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

module.exports = {get light() {return color}, schedule: scheduleService.lightMap, dayPos: scheduleService.dayPos};
