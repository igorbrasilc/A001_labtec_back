import express from 'express';
import cors from "cors";
import chalk from 'chalk';

import router from './routers/index.js';

import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router());

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(chalk.bold.green('Server running on ' + process.env.PORT));
});