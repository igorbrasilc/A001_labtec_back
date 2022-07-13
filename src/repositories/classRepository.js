import db from '../database.js';

function getAvailableRooms() {
    return db.query(`
    SELECT
    cl.id as "classId", cl.room, us.email as "responsibleEmail", us.name as "responsibleName"
    FROM classrooms cl
    JOIN users us ON cl."responsibleId" = us.id
    `)
}

const classRepository = {
    getAvailableRooms
}

export default classRepository