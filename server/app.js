const express = require('express');
const config = require('./config');

const app = express();
const port = process.env.port || config.port;

app.use('/', require('./routes/'));
app.use(express.static('./eGardenUI/dist'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});