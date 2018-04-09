const five = require('johnny-five');
const board = new five.Board();
const Color = require('color');

board.on('ready', function() {
    changeColor('FFFFFF');
});

function changeColor(newColor) {
    const color = new Color(`#${newColor}`);
    const colorObj = color.object();
    const r = new five.Led(9);
    const g = new five.Led(10);
    const b = new five.Led(11);
    r.brightness(255-colorObj.r);
    g.brightness(255-colorObj.g);
    b.brightness(255-colorObj.b);
}

module.exports = {changeColor};