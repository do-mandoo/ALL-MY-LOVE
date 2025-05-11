/*
  Warnings:

  - Made the column `tweetId` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Response` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "tweetId" INTEGER NOT NULL,
    CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Response_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("comment", "created_at", "id", "tweetId", "updated_at", "userId") SELECT "comment", "created_at", "id", "tweetId", "updated_at", "userId" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
CREATE INDEX "Response_userId_idx" ON "Response"("userId");
CREATE INDEX "Response_tweetId_idx" ON "Response"("tweetId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
