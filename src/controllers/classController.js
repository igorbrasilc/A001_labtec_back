import db from '../database.js';

export async function scheduleRoom(req, res) {
    const {description, reservationDate, durationInHours, reservationHour, userId, roomId} = req.body;

    try {
        await db.query(`
        INSERT INTO "roomReservations"
        (description, "reservationDate", "durationInHours", "reservationHour", "userId", "roomId")
        VALUES
        ($1, $2, $3, $4, $5, $6)
        `, []);
    } catch (e) {
        res.status(500).send('Erro do servidor');
        console.log('Erro ao fazer a reserva', e);
    }
}