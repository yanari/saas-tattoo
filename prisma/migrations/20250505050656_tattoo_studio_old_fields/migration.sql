/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `TattooStudio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `TattooStudio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "TattooStudio" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "phones" TEXT[],
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "styles" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "TattooStudio_slug_key" ON "TattooStudio"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TattooStudio_email_key" ON "TattooStudio"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
