import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import router from './routers/index.js';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT_LOCAL, process.env.HOST, () => {
    console.log(chalk.bold.green('Server running on ' + process.env.PORT_LOCAL))
});