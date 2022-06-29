/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRepository from '../repositories/authRepository.js';
import 'dotenv/config';

export async function signUp(req, res) {
    const {name, email, password} = req.body;
    const {body} = req;

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const userSearch = await authRepository.getUsersByEmail(body.email);

        if (userSearch.rowCount > 0) return res.status(409).send('Usuário já cadastrado');

        await authRepository.insertUser(name, email, hashPassword);

        res.status(201).send('Usuário cadastrado!');
    } catch (e) {
        res.status(500).send('Erro do servidor');
        console.log('Erro ao fazer o cadastro', e);
    }
};

export async function signIn(req, res) {
    const {email, password} = req.body;

    try {
        const userSearch = await authRepository.getUsersByEmail(email);

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

export async function getUserInfos(req, res) {
    const { user } = res.locals;

    res.status(200).send(user);
}