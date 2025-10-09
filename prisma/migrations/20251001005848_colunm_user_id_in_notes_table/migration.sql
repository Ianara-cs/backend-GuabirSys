/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `notes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "notes_user_id_key" ON "notes"("user_id");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
