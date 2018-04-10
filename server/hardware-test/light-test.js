const five = require('johnny-five');
const board = new five.Board();
const Color = require('color');

board.on('ready', () => {
    const colorObj = new Color('#b45a74').object();
    const rgb = new five.Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        },
        isAnode: true
    });
    rgb.color("#0000c0");
});
