const five = require('johnny-five');
const state = {};
let rgb;

module.exports = {
    set light(value) {
        rgb.color(value);
        state.light = value;
    },
    get state() {
        return state;
    },
    rgb
};