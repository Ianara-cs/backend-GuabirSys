/*
  Warnings:

  - Added the required column `updated_at` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

UPDATE "notes"
SET "updated_at" = CURRENT_TIMESTAMP
WHERE "updated_at" IS NULL;

ALTER TABLE "notes"
ALTER COLUMN "updated_at" SET NOT NULL;
