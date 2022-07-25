import prisma from "../src/database.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const USER_ADMIN = {
  name: "cesfi",
  levelId: 1,
  email: "cesfi@udesc.br",
  password: bcrypt.hashSync(process.env.USER_ADMIN || "secret", 10),
};

const accessLevels = [
  {
    level: "admin",
  },
  { level: "user" },
];

async function main() {
  await prisma.$connect();
  await prisma.users.create({ data: USER_ADMIN });
  await prisma.accessLevels.createMany({ data: accessLevels });
}

main()
  .catch((err) => {
    console.log("Error", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
