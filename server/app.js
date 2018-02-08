const express = require('express');
const config = require('./config');

const app = express();
const port = process.env.port || config.port;

const expressWs = require('express-ws')(app);

app.use('/', require('./routes/'));
app.use(express.static('./eGardenUI/dist'));

require('./services/usbService').watch();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});