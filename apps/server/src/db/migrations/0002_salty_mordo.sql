ALTER TABLE "collaborators" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "collaborators" ALTER COLUMN "role" SET DEFAULT 'VIEWER'::text;--> statement-breakpoint
ALTER TABLE "share_links" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "share_links" ALTER COLUMN "role" SET DEFAULT 'VIEWER'::text;--> statement-breakpoint
DROP TYPE "public"."collaborator_role";--> statement-breakpoint
CREATE TYPE "public"."collaborator_role" AS ENUM('OWNER', 'EDITOR', 'COMMENTER', 'VIEWER');--> statement-breakpoint
ALTER TABLE "collaborators" ALTER COLUMN "role" SET DEFAULT 'VIEWER'::"public"."collaborator_role";--> statement-breakpoint
ALTER TABLE "collaborators" ALTER COLUMN "role" SET DATA TYPE "public"."collaborator_role" USING "role"::"public"."collaborator_role";--> statement-breakpoint
ALTER TABLE "share_links" ALTER COLUMN "role" SET DEFAULT 'VIEWER'::"public"."collaborator_role";--> statement-breakpoint
ALTER TABLE "share_links" ALTER COLUMN "role" SET DATA TYPE "public"."collaborator_role" USING "role"::"public"."collaborator_role";--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "document_type" SET DEFAULT 'DOCUMENT'::text;--> statement-breakpoint
DROP TYPE "public"."document_type";--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('NOTE', 'DOCUMENT', 'TEMPLATE');--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "document_type" SET DEFAULT 'DOCUMENT'::"public"."document_type";--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE "public"."document_type" USING "document_type"::"public"."document_type";--> statement-breakpoint
ALTER TABLE "document_versions" ALTER COLUMN "version_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "document_versions" ALTER COLUMN "version_type" SET DEFAULT 'AUTO_SAVE'::text;--> statement-breakpoint
DROP TYPE "public"."version_type";--> statement-breakpoint
CREATE TYPE "public"."version_type" AS ENUM('AUTO_SAVE', 'MANUAL_COMMIT', 'BRANCH');--> statement-breakpoint
ALTER TABLE "document_versions" ALTER COLUMN "version_type" SET DEFAULT 'AUTO_SAVE'::"public"."version_type";--> statement-breakpoint
ALTER TABLE "document_versions" ALTER COLUMN "version_type" SET DATA TYPE "public"."version_type" USING "version_type"::"public"."version_type";--> statement-breakpoint
ALTER TABLE "chapters" ALTER COLUMN "content" SET DEFAULT '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Start writing here..."}]}]}'::jsonb;