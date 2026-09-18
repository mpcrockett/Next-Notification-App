/*
  Warnings:

  - You are about to drop the column `twilioOptedIn` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "twilioOptedIn",
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
