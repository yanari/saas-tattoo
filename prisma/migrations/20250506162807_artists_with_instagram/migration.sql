/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_slug_key" ON "Artist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_email_key" ON "Artist"("email");
