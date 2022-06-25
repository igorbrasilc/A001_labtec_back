import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function tokenValidation(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.status(401).redirect('/login');

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(500).send(error);
        console.log('Erro do servidor ao validar token de acesso', error);
    }
}