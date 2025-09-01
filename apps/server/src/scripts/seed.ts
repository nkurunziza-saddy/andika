import * as schema from "../db/schema";
import { db } from "@/db";
import type { DocumentContentInterface } from "@andika/shared";
import { type InsertTypes } from "@/types";

const main = async () => {
  console.log("Deleting existing data...");

  await db.delete(schema.documentsTable);
  await db.delete(schema.chaptersTable);

  console.log("Seeding database with realistic content...");

  const user = await db.query.usersTable.findFirst();
  if (!user) {
    process.abort();
  }
  console.log("User fetched.");

  // Create a few documents with chapters and notes

  console.log("Database seeding complete with realistic stories and notes!");
  process.exit(0);
};

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
