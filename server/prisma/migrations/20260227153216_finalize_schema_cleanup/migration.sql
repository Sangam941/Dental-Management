/*
  Warnings:

  - You are about to drop the column `dueAmount` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the column `expenseAmount` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the column `paidAmount` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the `doctor_schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "doctor_schedules" DROP CONSTRAINT "doctor_schedules_doctorId_fkey";

-- AlterTable
ALTER TABLE "opd_entries" DROP COLUMN "dueAmount",
DROP COLUMN "expenseAmount",
DROP COLUMN "paidAmount",
DROP COLUMN "paymentMethod",
DROP COLUMN "totalAmount",
ADD COLUMN     "gender" "Gender" DEFAULT 'MALE';

-- DropTable
DROP TABLE "doctor_schedules";

-- DropEnum
DROP TYPE "DayOfWeek";

-- CreateTable
CREATE TABLE "billings" (
    "id" UUID NOT NULL,
    "opdEntryId" UUID NOT NULL,
    "totalAmount" DECIMAL(65,30) DEFAULT 0,
    "paymentMethod" "PaymentMethod" DEFAULT 'CASH',
    "paidAmount" DECIMAL(65,30) DEFAULT 0,
    "dueAmount" DECIMAL(65,30) DEFAULT 0,
    "expenseAmount" DECIMAL(65,30) DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "billings_opdEntryId_idx" ON "billings"("opdEntryId");

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_opdEntryId_fkey" FOREIGN KEY ("opdEntryId") REFERENCES "opd_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
