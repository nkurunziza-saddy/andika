import { drizzleEnumToObject } from "@andika/shared";
import * as schema from "../db/schema";

export const documentType = drizzleEnumToObject(
  schema.enumDefinitions.documentType
);
export const collaboratorRole = drizzleEnumToObject(
  schema.enumDefinitions.collaboratorRole
);
export const versionType = drizzleEnumToObject(
  schema.enumDefinitions.versionType
);
