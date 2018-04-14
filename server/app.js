const express = require('express');
const config = require('./config');
const log = require('./services/log-service');
const app = express();
const port = process.env.port || config.port;

require('express-ws')(app);

app.use('/', require('./routes/'));
app.use(express.static('./eGardenUI/dist'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    log.info(`Server started on port ${port}`);
});