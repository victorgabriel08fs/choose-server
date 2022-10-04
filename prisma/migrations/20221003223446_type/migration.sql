-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alternative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'others',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Alternative" ("createdAt", "id", "text", "updatedAt") SELECT "createdAt", "id", "text", "updatedAt" FROM "Alternative";
DROP TABLE "Alternative";
ALTER TABLE "new_Alternative" RENAME TO "Alternative";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
