-- CreateTable
CREATE TABLE "accessLevels" (
    "id" SERIAL NOT NULL,
    "level" VARCHAR(20) NOT NULL,

    CONSTRAINT "accessLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" SERIAL NOT NULL,
    "room" VARCHAR(100) NOT NULL,
    "needsAuth" BOOLEAN NOT NULL,
    "responsibleId" INTEGER DEFAULT 1,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendingRoomReservations" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "reservationDate" TIMESTAMP(6) NOT NULL,
    "reservationHour" TEXT NOT NULL,
    "durationInHours" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "pendingRoomReservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roomReservations" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "reservationDate" TIMESTAMP(6) NOT NULL,
    "reservationHour" TIMESTAMP(6) NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "roomReservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "levelId" INTEGER DEFAULT 2,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accessLevels_level_key" ON "accessLevels"("level");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pendingRoomReservations" ADD CONSTRAINT "pendingRoomReservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pendingRoomReservations" ADD CONSTRAINT "pendingRoomReservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "roomReservations" ADD CONSTRAINT "roomReservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "roomReservations" ADD CONSTRAINT "roomReservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "accessLevels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
