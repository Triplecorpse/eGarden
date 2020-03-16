import {Light} from './light.service';
import express from 'express';
import dotenv from 'dotenv'

const app = express();
const port = process.env.PORT;
const light = new Light();

dotenv.config();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
