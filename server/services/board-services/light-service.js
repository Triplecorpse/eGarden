const five = require('johnny-five');
const board = new five.Board();
const state = {};
let rgb;

board
    .on('ready', () => {
        rgb = new five.Led.RGB({
            pins: {
                red: 9,
                green: 10,
                blue: 11
            },
            isAnode: true
        });
        rgb.color('#00ff00');
    });

module.exports = {
    set light(value) {
        rgb.color(value);
        state.light = value;
    },
    get state() {
        return state;
    }
};