import prisma from "../database.js";

async function getAvailableRooms() {
  return prisma.$queryRaw`
    SELECT
    cl.id as "classId", cl.room, us.email as "responsibleEmail", us.name as "responsibleName"
    FROM classrooms cl
    JOIN users us ON cl."responsibleId" = us.id
    `;
}

async function insertClassroomReservation(data) {
  return prisma.pendingRoomReservations.insert({ data });
}

const classRepository = {
  getAvailableRooms,
  insertClassroomReservation,
};

export default classRepository;
