/*
  Warnings:

  - The values [CARD,OTHER] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sheetId` on the `opd_entries` table. All the data in the column will be lost.
  - You are about to drop the `opd_sheets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entryDateBs` to the `opd_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'ONLINE');
ALTER TABLE "public"."opd_entries" ALTER COLUMN "paymentMethod" DROP DEFAULT;
ALTER TABLE "opd_entries" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "public"."PaymentMethod_old";
ALTER TABLE "opd_entries" ALTER COLUMN "paymentMethod" SET DEFAULT 'CASH';
COMMIT;

-- DropForeignKey
ALTER TABLE "opd_entries" DROP CONSTRAINT "opd_entries_sheetId_fkey";

-- DropIndex
DROP INDEX "opd_entries_sheetId_idx";

-- AlterTable
ALTER TABLE "opd_entries" DROP COLUMN "sheetId",
ADD COLUMN     "entryDateBs" TEXT NOT NULL,
ADD COLUMN     "entryMonth" TEXT,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "totalAmount" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "paidAmount" DROP NOT NULL,
ALTER COLUMN "dueAmount" DROP NOT NULL,
ALTER COLUMN "expenseAmount" DROP NOT NULL;

-- DropTable
DROP TABLE "opd_sheets";
