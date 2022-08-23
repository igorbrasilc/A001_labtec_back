import prisma from '../database.js';

async function getUsersByEmail(email) {
    return prisma.users.findMany({
        where: { email },
        include: {
            _count: {
                select: {
                    pendingRoomReservations: true,
                },
            },
        },
    });
}

async function insertUser(name, email, hashPassword) {
    return prisma.users.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
    });
}

const authRepository = {
    getUsersByEmail,
    insertUser,
};

export default authRepository;
