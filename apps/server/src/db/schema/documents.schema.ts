// documents.ts
import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
  json,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { documentTypeEnum } from "./enums.schema";
import { usersTable } from "./users.schema";

export const documentsTable = pgTable(
  "documents",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: text("title").notNull().default("Untitled Document"),
    content: jsonb("content").default({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
    }),
    documentType: documentTypeEnum("document_type")
      .notNull()
      .default("document"),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    isAnonymous: boolean("is_anonymous").default(false),
    isPublic: boolean("is_public").default(false),
    wordCount: integer("word_count").default(0),
    lastEditedBy: text("last_edited_by").references(() => usersTable.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    index("documents_user_id_idx").on(table.userId),
    index("documents_type_idx").on(table.documentType),
    index("documents_created_at_idx").on(table.createdAt),
    index("documents_updated_at_idx").on(table.updatedAt),
  ]
);
