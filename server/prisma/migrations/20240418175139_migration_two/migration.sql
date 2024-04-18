/*
  Warnings:

  - You are about to drop the `Allocated` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Limit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `allocated` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allocated" DROP CONSTRAINT "Allocated_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Limit" DROP CONSTRAINT "Limit_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "allocated" INTEGER NOT NULL,
ADD COLUMN     "limit" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Allocated";

-- DropTable
DROP TABLE "Limit";
