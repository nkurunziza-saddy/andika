import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { documentsTable } from "./documents.schema";
import { usersTable } from "./users.schema";
import { collaboratorRoleEnum } from "./enums.schema";

export const shareLinksTable = pgTable(
  "share_links",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    documentId: text("document_id")
      .notNull()
      .references(() => documentsTable.id, { onDelete: "cascade" }),
    createdBy: text("created_by")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    role: collaboratorRoleEnum("role").notNull().default("VIEWER"),
    isActive: boolean("is_active").default(true),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("share_links_document_id_idx").on(table.documentId),
    index("share_links_token_idx").on(table.token),
  ]
);
