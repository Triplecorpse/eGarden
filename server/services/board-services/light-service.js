// Private API for board-service
// Not recommended to call from elsewhere
// Service for handle board's lights

const config = require('./../settings-service');
const tinycolor = require('tinycolor2');
const log = require('./../log-service');
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
        const whitepoint = config.config.whitepoint;
        const color = handlewp(value, whitepoint);

        if (rgb) {
            rgb.color(color);
            state.light = value;
            log.info(`Board light set to ${color}: real value is ${value}, whitepoint is ${whitepoint}`);
        } else {
            log.error(`Board light failed to set to ${color}: real value was ${value}, whitepoint was ${whitepoint}. Reason - no rgb object identified`);
        }
    },
    get state() {
        return state;
    },
    set rgb(value) {
        if (!rgb) {
            rgb = value;
            log.info('RGB object was set', value);
        } else {
            log.error('Somebody wanted to set RGB object but it have been already set.');
            log.error('Desired value', value);
            log.error('Existed value', rgb);
        }
    }
};