-- CreateTable
CREATE TABLE "Alternative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alt1" TEXT NOT NULL,
    "alt2" TEXT NOT NULL,
    "choose" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_alt1_fkey" FOREIGN KEY ("alt1") REFERENCES "Alternative" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_alt2_fkey" FOREIGN KEY ("alt2") REFERENCES "Alternative" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
