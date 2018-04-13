const Moment = require('moment');

let schedule = [
    {time: '00:00', light: '#000000'},
    {time: '04:00', light: '#000000'},
    {time: '04:30', light: '#220080'},
    {time: '05:00', light: '#ff8585'},
    {time: '08:00', light: '#eeb639'},
    {time: '12:00', light: '#ffffff'},
    {time: '15:00', light: '#ffffff'},
    {time: '18:00', light: '#eeb639'},
    {time: '20:00', light: '#ff8585'},
    {time: '22:00', light: '#2d2d87'},
    {time: '22:30', light: '#000000'},
    {time: '24:00', light: '#000000'},
];

function getDayPosition() {
    const moment = new Moment();
    const duration = Moment.duration(moment.format('HH:mm'), 'HH:mm').asMinutes();

    return duration / 1440;
}

function getLightMap() {
    return schedule.map(item => {
        const pos = Moment.duration(item.time, 'HH:mm').asMinutes() / 1440;

        return {pos, color: item.light}
    });

}

module.exports = {
    get lightMap() {
        return getLightMap();
    },
    get dayPos() {
        return getDayPosition()
    }
};