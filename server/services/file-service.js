const fs = require('fs');

function readFile(path) {
    return new Promise (executor);

    function executor(resolve, reject) {
        fs.readFile(path, 'UTF8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }
}

module.exports = {readFile};
