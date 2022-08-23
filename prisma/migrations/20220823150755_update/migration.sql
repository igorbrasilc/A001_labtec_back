/*
  Warnings:

  - Made the column `levelId` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "levelId" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);
