/*
  Warnings:

  - You are about to drop the column `platformId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[postId,keywordId]` on the table `KeywordOccurrence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_platformId_fkey";

-- DropIndex
DROP INDEX "Post_url_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "platformId",
DROP COLUMN "timestamp",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Platform";

-- CreateIndex
CREATE UNIQUE INDEX "KeywordOccurrence_postId_keywordId_key" ON "KeywordOccurrence"("postId", "keywordId");
