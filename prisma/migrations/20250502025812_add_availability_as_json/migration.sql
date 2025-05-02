/*
  Warnings:

  - You are about to drop the `AvailabilitySlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvailabilitySlot" DROP CONSTRAINT "AvailabilitySlot_tattooStudioServiceId_fkey";

-- AlterTable
ALTER TABLE "TattooStudioService" ADD COLUMN     "availability" JSONB;

-- DropTable
DROP TABLE "AvailabilitySlot";
