-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_progressId_fkey`;

-- DropForeignKey
ALTER TABLE `progresses` DROP FOREIGN KEY `progresses_username_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_username_fkey`;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `progresses` ADD CONSTRAINT `progresses_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_progressId_fkey` FOREIGN KEY (`progressId`) REFERENCES `progresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
