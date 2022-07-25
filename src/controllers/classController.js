import classRepository from "../repositories/classRepository.js";

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
  } catch (e) {
    res.status(500).send(e);
    console.log("Erro ao fazer a reserva", e);
  }
}

export async function getAvailableRooms(req, res) {
  try {
    const availableRooms = await classRepository.getAvailableRooms();

    res.status(200).send(availableRooms.rows);
  } catch (e) {
    res.status(500).send(e);
    console.log("Erro ao fazer a reserva", e);
  }
}
