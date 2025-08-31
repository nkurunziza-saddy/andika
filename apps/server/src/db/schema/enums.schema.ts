import { pgEnum } from "drizzle-orm/pg-core";

export const documentTypeEnum = pgEnum("document_type", [
  "note",
  "document",
  "template",
]);
export const collaboratorRoleEnum = pgEnum("collaborator_role", [
  "owner",
  "editor",
  "commenter",
  "viewer",
]);
export const versionTypeEnum = pgEnum("version_type", [
  "auto_save",
  "manual_commit",
  "branch",
]);
