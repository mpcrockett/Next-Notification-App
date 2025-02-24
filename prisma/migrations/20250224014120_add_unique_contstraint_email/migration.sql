/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `therapist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "therapist_email_key" ON "therapist"("email");
