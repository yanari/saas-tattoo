/*
  Warnings:

  - The `location` column on the `TattooStudio` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TattooStudio" ADD COLUMN     "bio" TEXT,
DROP COLUMN "location",
ADD COLUMN     "location" JSONB;
