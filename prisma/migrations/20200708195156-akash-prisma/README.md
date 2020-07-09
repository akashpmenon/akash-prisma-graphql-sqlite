# Migration `20200708195156-akash-prisma`

This migration has been generated at 7/8/2020, 7:51:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"email" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT NOT NULL,
"password" TEXT NOT NULL)

ALTER TABLE "Link" ADD COLUMN "postedById" INTEGER ;

CREATE UNIQUE INDEX "User.email" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200708142437-akash_prisma_migrate..20200708195156-akash-prisma
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 // 1
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url = "***"
 }
 // 2
 generator client {
@@ -14,5 +14,15 @@
   id          Int      @id @default(autoincrement())
   createdAt   DateTime @default(now())
   description String
   url         String
+  postedBy    User?    @relation(fields: [postedById], references: [id])
+  postedById  Int?
+}
+
+model User {
+  id        Int      @id @default(autoincrement())
+  name      String
+  email     String   @unique
+  password  String
+  links     Link[]
 }
```


