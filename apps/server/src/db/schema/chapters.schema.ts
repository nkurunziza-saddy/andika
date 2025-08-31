import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { documentsTable } from "./documents.schema";
import { sql } from "drizzle-orm";

export const chaptersTable = pgTable(
  "chapters",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    documentId: text("document_id")
      .notNull()
      .references(() => documentsTable.id, { onDelete: "cascade" }),
    title: text("title").notNull().default("Untitled Chapter"),
    content: jsonb("content").default({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
    }),
    orderIndex: integer("order_index").notNull().default(0),
    wordCount: integer("word_count").default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("chapters_document_id_order_idx").on(
      table.documentId,
      table.orderIndex
    ),
    index("chapters_document_id_idx").on(table.documentId),
  ]
);
