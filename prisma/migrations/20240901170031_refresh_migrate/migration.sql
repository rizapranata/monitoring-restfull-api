/*
  Warnings:

  - You are about to alter the column `progressId` on the `images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_progressId_fkey`;

-- AlterTable
ALTER TABLE `images` MODIFY `progressId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_progressId_fkey` FOREIGN KEY (`progressId`) REFERENCES `progresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
