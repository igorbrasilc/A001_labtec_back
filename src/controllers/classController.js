import classRepository from '../repositories/classRepository.js';
import dayjs from 'dayjs';

export async function scheduleRoom(req, res) {
    const {
        description,
        reservationDate,
        durationInHours,
        reservationHour,
        userId,
        roomId,
    } = req.body;
    try {
        const classroomData = {
            description,
            reservationDate,
            durationInHours,
            reservationHour,
            userId,
            roomId,
        };

        await classRepository.insertClassroomReservation(classroomData);
        res.status(201).send('Created reservation!');
    } catch (e) {
        res.status(500).send(e);
        console.log('Erro ao fazer a reserva', e);
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
    let confirmedReservations = null;

    try {
        const room = await classRepository.getRoom(Number(roomId));
        if (room.responsibleId === user.id) {
            confirmedReservations =
                await classRepository.getConfirmedReservationsAdmin(room.id);
        } else {
            confirmedReservations =
                await classRepository.getConfirmedReservations(
                    room.id,
                    user.id
                );
        }

        res.status(200).send(confirmedReservations);
    } catch (err) {
        console.log('Erro ao buscar reservas confirmadas da sala', err);
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
