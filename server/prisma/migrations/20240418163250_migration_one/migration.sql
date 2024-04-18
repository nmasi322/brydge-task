/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allocated" DROP CONSTRAINT "Allocated_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Limit" DROP CONSTRAINT "Limit_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Allocated" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Limit" ALTER COLUMN "categoryId" DROP NOT NULL;

-- DropTable
DROP TABLE "Token";

-- AddForeignKey
ALTER TABLE "Allocated" ADD CONSTRAINT "Allocated_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limit" ADD CONSTRAINT "Limit_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
