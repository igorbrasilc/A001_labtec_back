import prisma from "../database.js";

async function getUsersByEmail(email) {
  return prisma.users.findMany({ where: { email } });
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
