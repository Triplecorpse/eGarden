const five = require('johnny-five');
const state = {};

module.exports = {
    set light(value) {
        const rgb = new five.Led.RGB({
            pins: {
                red: 9,
                green: 10,
                blue: 11
            },
            isAnode: true
        });
        rgb.color(value);
        state.light = value;
    },
    get state() {
        return state;
    }
};