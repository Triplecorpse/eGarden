const five = require('johnny-five');
const tinycolor = require('tinycolor2');

const state = {};
let rgb;

module.exports = {
    set light(value) {
        // rgb.color(tinycolor.mix(value, '#ff0000', amount = 40).toHexString());
        rgb.color(value);
        state.light = value;
    },
    get state() {
        return state;
    },
    set rgb(value) {
        if (!rgb) {
            rgb = value;
        }
    },
    get rgb() {
        return rgb;
    }
};