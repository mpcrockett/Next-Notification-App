/*
  Warnings:

  - You are about to drop the column `therapistId` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the `therapist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_therapistId_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "therapistId";

-- DropTable
DROP TABLE "therapist";
