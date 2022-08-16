import prisma from '../src/database.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const accessLevels = [
    {
        level: 'admin',
    },
    { level: 'user' },
];

const USER_ADMIN = {
    name: 'cesfi',
    levelId: 1,
    email: 'cesfi@udesc.br',
    password: bcrypt.hashSync(process.env.USER_ADMIN || 'secret', 10),
};

async function main() {
    await prisma.$connect();
    await prisma.accessLevels.createMany({ data: accessLevels });
    await prisma.users.create({ data: USER_ADMIN });
}

main()
    .catch((err) => {
        console.log('Error', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
