import { relations } from "drizzle-orm";
import { usersTable, userSettingsTable } from "./users.schema";
import { documentsTable } from "./documents.schema";
import { chaptersTable } from "./chapters.schema";
import { documentVersionsTable } from "./versions.schema";
import { collaboratorsTable } from "./collaborators.schema";
import { commentsTable } from "./comments.schema";
import { shareLinksTable } from "./share-links.schema";
import { analyticsTable } from "./analytics.schema";

export const usersRelations = relations(usersTable, ({ many }) => ({
  documents: many(documentsTable),
  documentVersions: many(documentVersionsTable),
  collaborations: many(collaboratorsTable),
  comments: many(commentsTable),
  shareLinks: many(shareLinksTable),
  settings: many(userSettingsTable),
  analytics: many(analyticsTable),
}));

export const documentsRelations = relations(
  documentsTable,
  ({ one, many }) => ({
    author: one(usersTable, {
      fields: [documentsTable.userId],
      references: [usersTable.id],
    }),
    lastEditor: one(usersTable, {
      fields: [documentsTable.lastEditedBy],
      references: [usersTable.id],
    }),
    chapters: many(chaptersTable),
    versions: many(documentVersionsTable),
    collaborators: many(collaboratorsTable),
    comments: many(commentsTable),
    shareLinks: many(shareLinksTable),
    analytics: many(analyticsTable),
  })
);

export const chaptersRelations = relations(chaptersTable, ({ one, many }) => ({
  document: one(documentsTable, {
    fields: [chaptersTable.documentId],
    references: [documentsTable.id],
  }),
  versions: many(documentVersionsTable),
  comments: many(commentsTable),
}));

export const documentVersionsRelations = relations(
  documentVersionsTable,
  ({ one }) => ({
    document: one(documentsTable, {
      fields: [documentVersionsTable.documentId],
      references: [documentsTable.id],
    }),
    chapter: one(chaptersTable, {
      fields: [documentVersionsTable.chapterId],
      references: [chaptersTable.id],
    }),
    author: one(usersTable, {
      fields: [documentVersionsTable.authorId],
      references: [usersTable.id],
    }),
    parentVersion: one(documentVersionsTable, {
      fields: [documentVersionsTable.parentVersionId],
      references: [documentVersionsTable.id],
    }),
  })
);

export const collaboratorsRelations = relations(
  collaboratorsTable,
  ({ one }) => ({
    document: one(documentsTable, {
      fields: [collaboratorsTable.documentId],
      references: [documentsTable.id],
    }),
    user: one(usersTable, {
      fields: [collaboratorsTable.userId],
      references: [usersTable.id],
    }),
    inviter: one(usersTable, {
      fields: [collaboratorsTable.invitedBy],
      references: [usersTable.id],
    }),
  })
);

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  document: one(documentsTable, {
    fields: [commentsTable.documentId],
    references: [documentsTable.id],
  }),
  chapter: one(chaptersTable, {
    fields: [commentsTable.chapterId],
    references: [chaptersTable.id],
  }),
  author: one(usersTable, {
    fields: [commentsTable.authorId],
    references: [usersTable.id],
  }),
  parentComment: one(commentsTable, {
    fields: [commentsTable.parentCommentId],
    references: [commentsTable.id],
  }),
  replies: many(commentsTable),
}));

export const shareLinksRelations = relations(shareLinksTable, ({ one }) => ({
  document: one(documentsTable, {
    fields: [shareLinksTable.documentId],
    references: [documentsTable.id],
  }),
  creator: one(usersTable, {
    fields: [shareLinksTable.createdBy],
    references: [usersTable.id],
  }),
}));

export const userSettingsRelations = relations(
  userSettingsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userSettingsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const analyticsRelations = relations(analyticsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [analyticsTable.userId],
    references: [usersTable.id],
  }),
  document: one(documentsTable, {
    fields: [analyticsTable.documentId],
    references: [documentsTable.id],
  }),
}));
