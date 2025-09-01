import {
  pgTable,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { documentsTable } from "./documents.schema";
import { usersTable } from "./users.schema";
import { collaboratorRoleEnum } from "./enums.schema";

export const collaboratorsTable = pgTable(
  "collaborators",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    documentId: text("document_id")
      .notNull()
      .references(() => documentsTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    role: collaboratorRoleEnum("role").notNull().default("VIEWER"),
    invitedBy: text("invited_by")
      .notNull()
      .references(() => usersTable.id),
    invitedAt: timestamp("invited_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    lastAccessAt: timestamp("last_access_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("collaborators_document_user_idx").on(
      table.documentId,
      table.userId
    ),
    index("collaborators_document_id_idx").on(table.documentId),
    index("collaborators_user_id_idx").on(table.userId),
  ]
);
