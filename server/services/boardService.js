const five = require('johnny-five');
const board = new five.Board();
const Color = require('color');
const Moment = require('moment');
const clientService = require('./clientService');
const Message = require('./../models/Message');
const tinygradient = require("tinygradient");

Array.prototype.insert = function (position, element) {
    const result = this.map(el => el);
    result.splice(position, 0, element);
    return result;
};

//todo: think
// Array.prototype.insert = function (callback) {
//     const result = this.map(el => el);
//     let canInsert = false;
//     this.forEach((el, i) => {
//         canInsert = callback(el, i, this);
//         if (canInsert) {
//             result.splice(position, 0, element);
//         }
//     });
// };

board
    .on('ready', () => {
        setLightColor('#000000');
        setInterval(() => {
            const color = getColor();
            clientService.sendToAll(new Message({
                header: 'Color',
                body: color,
                status: 'success'
            }));
            setLightColor(color);
        }, 60 * 1000);
    })
    .on('fail', () => {
        getColor();
        setInterval(() => {
            const color = getColor();
            clientService.sendToAll(new Message({
                header: 'Color',
                body: color,
                status: 'success'
            }));
        }, 60 * 1000);
    });

function getDayPercentage() {
    const moment = new Moment();
    const duration = Moment.duration(moment.format('HH:mm'), 'HH:mm').asMinutes();

    return 100 / 1440 * duration;
}

function getColor() {
    let dayPos = getDayPercentage() / 100;
    clientService.sendToAll(new Message({
        header: 'Position',
        body: dayPos,
        status: 'success'
    }));
    let colorMap = [
        {start: '00:00', end: '05:00', color: '#000000'},
        {start: '05:01', end: '08:00', color: '#ff8055'},
        {start: '08:01', end: '20:00', color: '#ffff55'},
        {start: '20:01', end: '21:00', color: '#ff8055'},
        {start: '21:01', end: '22:00', color: '#0000c0'},
        {start: '22:01', end: '23:59', color: '#000000'},
    ];
    const colorMapPercentage = colorMap
        .map(color => {
            const startDuration = Moment.duration(color.start, 'HH:mm').asMinutes();
            const endDuration = Moment.duration(color.end, 'HH:mm').asMinutes();
            const startPercentage = 100 / 1440 * startDuration;
            const endPercentage = 100 / 1440 * endDuration;

            return {
                start: startPercentage,
                end: endPercentage,
                color: color.color
            };
        })
        .map(color => {
            const pos = ((color.end - color.start) / 2 + color.start) / 100;
            return {
                pos,
                color: color.color
            }
        })
        .insert(colorMap.length, {pos: 1, color: '#000000'})
        .insert(0, {pos: 0, color: '#000000'})
        .map((el, index, array) => {
            if (index === 0) {
                clientService.sendToAll(new Message({
                    header: 'Gradient',
                    body: tinygradient(array).css(),
                    status: 'success'
                }));
            }

            return el;
        })
        .filter((color, index, array) => {
            if (index !== 0 && index !== array.length - 1) {
                const nextEl = array[index + 1];
                const prevEl = array[index - 1];
                if ((color.pos <= dayPos && dayPos <= nextEl.pos) || (prevEl.pos <= dayPos && dayPos <= color.pos)) {
                    return true;
                }
            } else {
                if (dayPos === index) {
                    return true;
                }
            }
        });

    dayPos -= colorMapPercentage[0].pos;
    colorMapPercentage[1].pos -= colorMapPercentage[0].pos;
    colorMapPercentage[0].pos = 0;

    const multiplier = 1 / colorMapPercentage[1].pos;
    colorMapPercentage[1].pos *= multiplier;
    dayPos *= multiplier;
    const startColor = Color(colorMapPercentage[0].color);
    const endColor = Color(colorMapPercentage[1].color);

    const rDiff = endColor.red() - startColor.red();
    const gDiff = endColor.green() - startColor.green();
    const bDiff = endColor.blue() - startColor.blue();

    const newColor = Color({r: startColor.red() + rDiff * dayPos, g: startColor.green() + gDiff * dayPos, b: startColor.blue() + bDiff * dayPos});

    return '#' + newColor.rgbNumber().toString(16);
}


function setLightColor(newColor) {
    const colorObj = new Color(newColor).object();
    const r = new five.Led(9);
    const g = new five.Led(10);
    const b = new five.Led(11);
    r.brightness(255 - colorObj.r);
    g.brightness(255 - colorObj.g);
    b.brightness(255 - colorObj.b);
}

module.exports = {setLightColor};