/*
  Warnings:

  - Added the required column `platform` to the `KeywordOccurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KeywordOccurrence" ADD COLUMN     "platform" TEXT NOT NULL;
