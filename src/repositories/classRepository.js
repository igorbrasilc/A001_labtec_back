import prisma from '../database.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/pt-br.js';

dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

async function getAvailableRooms() {
    return prisma.$queryRaw`
    SELECT
    cl.id as "classId", cl.room, us.email as "responsibleEmail", us.name as "responsibleName"
    FROM classrooms cl
    JOIN users us ON cl."responsibleId" = us.id
    `;
}

async function insertClassroomReservation(data, numberOfWeeks) {
    if (!numberOfWeeks || Number(numberOfWeeks) === 1) {
        return prisma.pendingRoomReservations.create({ data });
    } else {
        for (let i = 0; i < numberOfWeeks; i++) {
            const reservationDate = dayjs(data.reservationDate, 'DD/MM/YYYY')
                .add(7 * i, 'day')
                .format('DD/MM/YYYY')
                .toString();
            await prisma.pendingRoomReservations.create({
                data: { ...data, reservationDate },
            });
        }
    }
}

async function getRoom(id) {
    return prisma.classrooms.findFirstOrThrow({
        where: { id },
        include: { users: { select: { name: true, email: true } } },
    });
}

async function getPendingReservations(roomId, userId) {
    return prisma.pendingRoomReservations.findMany({
        where: { roomId, userId },
        include: {
            classrooms: {},
            users: { select: { name: true, email: true } },
        },
    });
}

async function getPendingReservationsAdmin(roomId) {
    return prisma.pendingRoomReservations.findMany({
        where: { roomId },
        include: { classrooms: {} },
    });
}

async function getConfirmedReservations(roomId) {
    return prisma.roomReservations.findMany({
        where: { roomId },
        include: { classrooms: {} },
    });
}

async function getUniquePendingReservation(id) {
    return prisma.pendingRoomReservations.findUnique({
        where: { id },
        include: { classrooms: {} },
    });
}

async function getUniqueConfirmedReservation(id) {
    return prisma.roomReservations.findUnique({
        where: { id },
        include: { classrooms: {} },
    });
}

async function getAllConfirmedReservations(userId, userLevel) {
    if (userLevel === 'admin') {
        return prisma.roomReservations.findMany({
            where: {
                classrooms: {
                    responsibleId: userId,
                },
            },
            include: {
                classrooms: {},
                users: { select: { name: true, email: true } },
            },
        });
    } else {
        return prisma.roomReservations.findMany({
            where: {
                userId,
            },
            include: {
                classrooms: {
                    select: {
                        room: true,
                    },
                },
                users: { select: { name: true, email: true } },
            },
        });
    }
}

async function getRoomReservation(id) {
    return prisma.pendingRoomReservations.findFirstOrThrow({ where: { id } });
}

async function getConfirmedRoomReservation(id) {
    return prisma.roomReservations.findFirstOrThrow({ where: { id } });
}

async function insertToConfirmedReservations(data, numberOfWeeks) {
    return prisma.roomReservations.create({ data });
}

async function deletePendingRoomReservation(id) {
    return prisma.pendingRoomReservations.delete({ where: { id } });
}

async function getAllPendingReservations(userId, userLevel) {
    if (userLevel === 'admin') {
        return prisma.pendingRoomReservations.findMany({
            where: {
                classrooms: {
                    responsibleId: userId,
                },
            },
            include: {
                classrooms: {},
                users: { select: { name: true, email: true } },
            },
        });
    } else {
        return prisma.pendingRoomReservations.findMany({
            where: {
                userId,
            },
            include: {
                classrooms: {
                    select: {
                        room: true,
                    },
                },
                users: { select: { name: true, email: true } },
            },
        });
    }
}

async function deleteReservation(id) {
    try {
        await prisma.roomReservations.delete({ where: { id } });
    } catch (err) {
        await prisma.pendingRoomReservations.delete({ where: { id } });
    }
}

const classRepository = {
    getAvailableRooms,
    insertClassroomReservation,
    getRoom,
    getPendingReservations,
    getPendingReservationsAdmin,
    getConfirmedReservations,
    getAllPendingReservations,
    getAllConfirmedReservations,
    getRoomReservation,
    insertToConfirmedReservations,
    deletePendingRoomReservation,
    getConfirmedRoomReservation,
    deleteReservation,
    getUniquePendingReservation,
    getUniqueConfirmedReservation,
};

export default classRepository;
