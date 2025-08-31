import {
  pgTable,
  text,
  timestamp,
  integer,
  json,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { documentsTable } from "./documents.schema";
import { usersTable } from "./users.schema";

export const analyticsTable = pgTable(
  "analytics",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    documentId: text("document_id").references(() => documentsTable.id, {
      onDelete: "cascade",
    }),
    eventType: text("event_type").notNull(), // 'document_created', 'words_written', 'session_time', etc.
    eventData: jsonb("event_data"), // Flexible data storage for different event types
    sessionId: text("session_id"),
    timestamp: timestamp("timestamp", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("analytics_user_id_idx").on(table.userId),
    index("analytics_document_id_idx").on(table.documentId),
    index("analytics_event_type_idx").on(table.eventType),
    index("analytics_timestamp_idx").on(table.timestamp),
  ]
);
