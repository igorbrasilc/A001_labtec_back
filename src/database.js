import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const {password, host, user, port, database, MODE} = process.env;

let databaseConfig;

if (MODE === 'PROD') {
    databaseConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
}

if (MODE === 'DEV') {
    databaseConfig = {
        user,
        password,
        host,
        port,
        database
    };
}

const db = new Pool(databaseConfig);

export default db;