import {
  pgTable,
  text,
  timestamp,
  integer,
  json,
  index,
  type AnyPgColumn,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { versionTypeEnum } from "./enums.schema";
import { documentsTable } from "./documents.schema";
import { usersTable } from "./users.schema";
import { chaptersTable } from "./chapters.schema";

export const documentVersionsTable = pgTable(
  "document_versions",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    documentId: text("document_id")
      .notNull()
      .references(() => documentsTable.id, { onDelete: "cascade" }),
    chapterId: text("chapter_id").references(() => chaptersTable.id, {
      onDelete: "cascade",
    }),
    authorId: text("author_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    title: text("title").notNull(),
    content: jsonb("content").notNull(),
    commitMessage: text("commit_message"),
    versionType: versionTypeEnum("version_type").notNull().default("auto_save"),
    parentVersionId: text("parent_version_id").references(
      (): AnyPgColumn => documentVersionsTable.id
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("versions_document_id_idx").on(table.documentId),
    index("versions_chapter_id_idx").on(table.chapterId),
    index("versions_created_at_idx").on(table.createdAt),
    index("versions_author_id_idx").on(table.authorId),
  ]
);
