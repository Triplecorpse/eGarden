const router = require('express').Router();
const fileService = require('./../services/fileService');

router.use('/api', require('./api'));

router.get('/', function (req, res) {
    fileService.readFile('./eGardenUI/dist/index.html')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

module.exports = router;