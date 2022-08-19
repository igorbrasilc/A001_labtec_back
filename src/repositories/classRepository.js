import prisma from '../database.js';

async function getAvailableRooms() {
    return prisma.$queryRaw`
    SELECT
    cl.id as "classId", cl.room, us.email as "responsibleEmail", us.name as "responsibleName"
    FROM classrooms cl
    JOIN users us ON cl."responsibleId" = us.id
    `;
}

async function insertClassroomReservation(data) {
    return prisma.pendingRoomReservations.create({ data });
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

const classRepository = {
    getAvailableRooms,
    insertClassroomReservation,
    getRoom,
    getPendingReservations,
    getPendingReservationsAdmin,
    getConfirmedReservations,
    getAllPendingReservations,
    getAllConfirmedReservations,
};

export default classRepository;
