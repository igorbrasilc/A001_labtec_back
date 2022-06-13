import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const {password, host, user, port, database} = process.env;

// const databaseConfig = {
//     connectionString: process.env.DATABASE_URL
// };

const databaseConfig = {
    user,
    password,
    host,
    port,
    database
};

if (process.env.MODE === 'PROD') {
    databaseConfig.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);

export default db;