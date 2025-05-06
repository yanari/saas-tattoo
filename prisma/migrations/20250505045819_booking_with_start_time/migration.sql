/*
  Warnings:

  - You are about to drop the column `quoteId` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artistQuoteId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'AWAITING_PAYMENT', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_quoteId_fkey";

-- DropIndex
DROP INDEX "Booking_quoteId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "quoteId",
ADD COLUMN     "artistQuoteId" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "confirmedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QuoteResponse" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentInstructions" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_artistQuoteId_key" ON "Booking"("artistQuoteId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_artistQuoteId_fkey" FOREIGN KEY ("artistQuoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
