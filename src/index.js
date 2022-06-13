import express from 'express';
import cors from 'cors';

import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(chalk.bold.green('Server running on ' + process.env.PORT));
});