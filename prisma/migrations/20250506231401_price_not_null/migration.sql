/*
  Warnings:

  - Made the column `price` on table `TattooStudioService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TattooStudioService" ALTER COLUMN "price" SET NOT NULL;
