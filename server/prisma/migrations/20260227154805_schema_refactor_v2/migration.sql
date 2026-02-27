/*
  Warnings:

  - You are about to drop the column `name` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `entryDateBs` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the column `patientName` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNo` on the `opd_entries` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentName]` on the table `departments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentName` to the `departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryDate` to the `opd_entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `opd_entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "departments_name_key";

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "name",
ADD COLUMN     "departmentName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "gender" "Gender" DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "opd_entries" DROP COLUMN "entryDateBs",
DROP COLUMN "patientName",
DROP COLUMN "phoneNo",
ADD COLUMN     "entryDate" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "departments_departmentName_key" ON "departments"("departmentName");
