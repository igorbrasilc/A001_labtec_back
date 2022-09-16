import classRepository from '../repositories/classRepository.js';
import dayjs from 'dayjs';

export async function scheduleRoom(req, res) {
    const { description, reservationDate, durationInHours, reservationHour } =
        req.body;
    const { roomId } = req.params;
    const { id, levelId } = res.locals.user;
    try {
        const classroomData = {
            description,
            reservationDate,
            durationInHours,
            reservationHour,
            userId: Number(id),
            roomId: Number(roomId),
        };

        if (Number(levelId) === 1) {
            await classRepository.insertToConfirmedReservations(classroomData);
        } else {
            await classRepository.insertClassroomReservation(classroomData);
        }

        res.status(201).send('Created reservation!');
    } catch (e) {
        res.status(500).send(e);
        console.log('Erro ao fazer a reserva', e);
    }
}

export async function deleteReservation(req, res) {
    const { user } = res.locals;
    const { reservaId } = req.params;

    try {
        if (user.levelId !== 1) {
            const reservation = await classRepository.getConfirmedReservations(
                Number(reservaId)
            );
            if (reservation?.userId !== Number(user.id)) {
                throw new Error(
                    'Esta reserva não pertence ao usuário para ser deletada'
                );
                return;
            }
        }

        await classRepository.deleteConfirmedReservation(Number(reservaId));

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
        console.log('Erro ao deletar a reserva', err);
    }
}

export async function getAvailableRooms(req, res) {
    try {
        const availableRooms = await classRepository.getAvailableRooms();

        res.status(200).send(availableRooms);
    } catch (e) {
        res.status(500).send(e);
        console.log('Erro ao fazer a reserva', e);
    }
}

export async function getPendingReservations(req, res) {
    const { roomId } = req.params;
    const { user } = res.locals;
    let pendingReservations = null;

    try {
        const room = await classRepository.getRoom(Number(roomId));
        if (room.responsibleId === user.id) {
            pendingReservations =
                await classRepository.getPendingReservationsAdmin(room.id);
        } else {
            pendingReservations = await classRepository.getPendingReservations(
                room.id,
                user.id
            );
        }

        res.status(200).send(pendingReservations);
    } catch (err) {
        console.log('Erro ao buscar reservas pendentes da sala', err);
        res.status(500).send(err);
    }
}

export async function getConfirmedReservations(req, res) {
    const { roomId } = req.params;
    const { user } = res.locals;

    if (isNaN(Number(roomId))) {
        return res.status(422).send('O param deve ser numérico');
    }

    try {
        const room = await classRepository.getRoom(Number(roomId));
        const confirmedReservations =
            await classRepository.getConfirmedReservations(room.id);

        res.status(200).send(confirmedReservations);
    } catch (err) {
        console.log('Erro ao buscar reservas confirmadas da sala', err);
        res.status(500).send(err);
    }
}

export async function getAllConfirmedReservations(req, res) {
    const { userLevel } = req.params;
    const { user } = res.locals;

    if (userLevel === 'admin' && user.levelId !== 1)
        return res
            .status(401)
            .send('Não autorizado para esta rota, acesse /user');

    if (userLevel === 'user' && user.levelId != 2)
        return res
            .status(401)
            .send('Não autorizado para esta rota, acesse /admin');

    try {
        const confirmedReservations =
            await classRepository.getAllConfirmedReservations(
                user.id,
                userLevel === 'user' ? 'user' : 'admin'
            );
        res.status(200).json(confirmedReservations);
    } catch (err) {
        console.log(
            'Erro ao buscar reservas confirmadas para este usuário',
            err
        );
        res.status(500).send(err);
    }
}

export async function getAllPendingReservations(req, res) {
    const { userLevel } = req.params;
    const { user } = res.locals;

    if (userLevel === 'admin' && user.levelId != 1)
        return res
            .status(401)
            .send('Não autorizado para esta rota, acesse /user');

    if (userLevel === 'user' && user.levelId != 2)
        return res
            .status(401)
            .send('Não autorizado para esta rota, acesse /admin');

    try {
        const pendingReservations =
            await classRepository.getAllPendingReservations(
                user.id,
                userLevel === 'user' ? 'user' : 'admin'
            );
        res.status(200).json(pendingReservations);
    } catch (err) {
        console.log(
            'Erro ao buscar reservas confirmadas para este usuário',
            err
        );
        res.status(500).send(err);
    }
}

export async function getRoom(req, res) {
    const { id } = req.params;
    try {
        const room = await classRepository.getRoom(Number(id));
        res.status(200).send(room);
    } catch (err) {
        console.log('Erro ao buscar sala', err);
        res.status(500).send(err);
    }
}

export async function approveReservation(req, res) {
    const { reservaId } = req.params;
    const { user } = res.locals;

    try {
        const roomReservation = await classRepository.getRoomReservation(
            Number(reservaId)
        );
        delete roomReservation.id;
        await classRepository.insertToConfirmedReservations(roomReservation);
        await classRepository.deletePendingRoomReservation(Number(reservaId));
        res.status(201).send('Reserva confirmada!');
    } catch (err) {
        console.log('Erro ao buscar reserva', err);
        res.status(500).send(err);
    }
}

export async function disapproveReservation(req, res) {
    const { reservaId } = req.params;
    const { user } = res.locals;

    try {
        const roomReservation = await classRepository.getRoomReservation(
            Number(reservaId)
        );
        await classRepository.deletePendingRoomReservation(Number(reservaId));
        res.status(201).send('Reserva cancelada!');
    } catch (err) {
        console.log('Erro ao buscar reserva', err);
        res.status(500).send(err);
    }
}
