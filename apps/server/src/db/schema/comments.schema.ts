import {
  pgTable,
  text,
  timestamp,
  json,
  boolean,
  index,
  type AnyPgColumn,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { documentsTable } from "./documents.schema";
import { chaptersTable } from "./chapters.schema";
import { usersTable } from "./users.schema";

export const commentsTable = pgTable(
  "comments",
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
    content: text("content").notNull(),
    position: jsonb("position"), // Store cursor position/text selection
    parentCommentId: text("parent_comment_id").references(
      (): AnyPgColumn => commentsTable.id,
      { onDelete: "cascade" }
    ),
    isResolved: boolean("is_resolved").default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    index("comments_document_id_idx").on(table.documentId),
    index("comments_chapter_id_idx").on(table.chapterId),
    index("comments_author_id_idx").on(table.authorId),
    index("comments_created_at_idx").on(table.createdAt),
  ]
);
