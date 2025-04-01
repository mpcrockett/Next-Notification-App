/*
  Warnings:

  - You are about to drop the column `appTime` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `apptTime` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "appTime",
ADD COLUMN     "apptTime" TEXT NOT NULL;
