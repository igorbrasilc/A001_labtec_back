/* eslint-disable import/extensions */
import db from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function signUp(req, res) {
    const {name, email, password} = req.body;
    const {body} = req;

    try {
        const userSearch = await db.query('SELECT * FROM users WHERE email = $1', [body.email]);

        if (userSearch.rowCount > 0) return res.status(409).send('Usuário já cadastrado');

        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, await bcrypt.hash(password, 10)]);

        res.status(201).send('Usuário cadastrado!');
    } catch (e) {
        res.status(500).send('Erro do servidor');
        console.log('Erro ao fazer o cadastro', e);
    }
};

export async function signIn(req, res) {
    const {email, password} = req.body;

    try {
        const userSearch = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userSearch.rowCount > 0 && bcrypt.compareSync(password, userSearch.rows[0].password)) {
            const token = jwt.sign(userSearch.rows[0], process.env.JWT_SECRET, { expiresIn: 60*60 })

            res.status(200).send({token});
        } else {
            return res.status(422).send('Usuário inexistente ou senha incompatível!');
        }
    } catch (e) {
        res.status(500).send('Erro do servidor');
        console.log('Erro ao fazer o login', e);
    }
}