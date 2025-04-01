-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PROVIDER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
