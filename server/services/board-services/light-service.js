const config = require('./../settings-service');
const tinycolor = require('tinycolor2');
const state = {};
let rgb;

function handlewp(color, whitepoint) {
    const cl = tinycolor(color).toRgb();
    const wp = tinycolor(whitepoint).toRgb();
    const newCl = tinycolor({r: wp.r / 255 * cl.r, g: wp.g / 255 * cl.g, b: wp.b / 255 * cl.b});

    return newCl.toHexString();
}

module.exports = {
    set light(value) {
        rgb.color(handlewp(value, config.config.whitepoint));
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