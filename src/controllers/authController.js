/* eslint-disable import/extensions */
import db from '../database.js';

export async function signUp(req, res) {
    const {name, email, password} = req.body;

    try {
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);

        res.status(201).send('Usuário cadastrado!');
    } catch (e) {
        res.status(500).send('Erro do servidor');
        console.log('Erro ao fazer o cadastro', e);
    }
}