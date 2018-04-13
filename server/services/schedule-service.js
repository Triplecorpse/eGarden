const Moment = require('moment');
const settingsService = require('./settings-service');

function getDayPosition() {
    const moment = new Moment();
    const duration = Moment.duration(moment.format('HH:mm'), 'HH:mm').asMinutes();

    return duration / 1440;
}

function getLightMap() {
    if (!settingsService.config) {
        return [];
    }
    const schedule = settingsService.config.schedule;

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