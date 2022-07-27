/*
  Warnings:

  - Added the required column `durationInHours` to the `roomReservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pendingRoomReservations" ALTER COLUMN "reservationDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "roomReservations" ADD COLUMN     "durationInHours" TEXT NOT NULL,
ALTER COLUMN "reservationDate" SET DATA TYPE TEXT,
ALTER COLUMN "reservationHour" SET DATA TYPE TEXT;
