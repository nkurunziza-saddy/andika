import { pgEnum } from "drizzle-orm/pg-core";

export const enumDefinitions = {
  documentType: ["NOTE", "DOCUMENT", "TEMPLATE"],
  collaboratorRole: ["OWNER", "EDITOR", "COMMENTER", "VIEWER"],
  versionType: ["AUTO_SAVE", "MANUAL_COMMIT", "BRANCH"],
} as const;

export const documentTypeEnum = pgEnum(
  "document_type",
  enumDefinitions.documentType
);
export const collaboratorRoleEnum = pgEnum(
  "collaborator_role",
  enumDefinitions.collaboratorRole
);
export const versionTypeEnum = pgEnum(
  "version_type",
  enumDefinitions.versionType
);
