CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "levelId" INTEGER REFERENCES "accessLevels"("id") DEFAULT 2,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (name, "levelId", email, password) 
VALUES ('CESFI', 1, 'cesfi@udesc.br', 'senhaTemporaria');

CREATE TABLE "accessLevels" (
"id" SERIAL PRIMARY KEY,
"level" VARCHAR(20) NOT NULL UNIQUE    
);

INSERT INTO "accessLevels" (level) VALUES ('admin');
INSERT INTO "accessLevels" (level) VALUES ('user');

CREATE TABLE "classrooms" (
    "id" SERIAL PRIMARY KEY,
    "room" VARCHAR(100) NOT NULL,
    "needsAuth" BOOLEAN NOT NULL,
    "responsibleId" INTEGER REFERENCES "users"("id") DEFAULT 1
);

CREATE TABLE "pendingRoomReservations" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "reservationDate" TIMESTAMP NOT NULL,
    "reservationHour" TEXT NOT NULL,
    "durationInHours" TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "roomId" INTEGER NOT NULL REFERENCES "classrooms"("id")
);

CREATE TABLE "roomReservations" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "reservationDate" TIMESTAMP NOT NULL,
    "reservationHour" TEXT NOT NULL,
    "durationInHours" TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "roomId" INTEGER NOT NULL REFERENCES "classrooms"("id")
);