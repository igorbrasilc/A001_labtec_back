/* eslint-disable import/extensions */
import db from '../database.js';

import { signUpSchema } from  '../schemas/authSchemas.js';

export async function signUpValidator(req, res, next) {
    const {body} = req;

    const {error} = signUpSchema.validate(body, {abortEarly: false});

    if (error) {
        return res.status(422).send(error.details.map(error => {
            return error.message;
        }))
    }

    try {
        const userSearch = await db.query('SELECT id FROM users WHERE email = $1', [body.email]);

        if (userSearch.rowCount > 0) return res.status(409).send('Usuário já cadastrado');

        next();
    } catch (e) {
        res.status(500).send('Erro do servidor');
        console.log('Erro ao fazer o cadastro', e);
    }
}