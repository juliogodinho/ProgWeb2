-- CreateTable
CREATE TABLE "user" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "email" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
