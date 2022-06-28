import db from '../database.js';

function getUsersByEmail(email) {
    return db.query('SELECT * FROM users WHERE email = $1', [email]);
}

function insertUser(name, email, hashPassword) {
    return db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashPassword])
}

const authRepository = {
    getUsersByEmail,
    insertUser
}

export default authRepository;