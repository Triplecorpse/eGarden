const fs = require('fs');
const log = require('./log-service');

function readFile(path) {
    return new Promise (executor);

    function executor(resolve, reject) {
        fs.readFile(path, 'UTF8', (err, data) => {
            if (err) {
                reject(err);
                log.error(`Error reading file ${path}`, err);
            } else {
                resolve(data);
                log.info(`File ${path} was read successfully`);
            }
        });
    }
}

module.exports = {readFile};
