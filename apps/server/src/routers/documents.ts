import z from "zod";
import { router, publicProcedure, protectedProcedure } from "../lib/trpc";
import { documentsTable } from "../db/schema/documents.schema";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { chaptersTable, documentVersionsTable } from "@/db/schema";

export const documentRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(documentsTable)
      .where(eq(documentsTable.id, ctx.session.user.id));
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await db
        .select()
        .from(documentsTable)
        .where(eq(documentsTable.id, input));
    }),

  // documents create route - add chapters input and fix return
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).default("Untitled Document"),
        content: z.any().default({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Start writing here...",
                },
              ],
            },
          ],
        }),
        documentType: z.enum(["DOCUMENT", "TEMPLATE"]).default("DOCUMENT"),
        isAnonymous: z.boolean().default(false),
        isPublic: z.boolean().default(false),
        chapters: z
          .array(
            z.object({
              title: z.string().default("Chapter 1"),
              content: z.any(),
            })
          )
          .default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [document] = await db
        .insert(documentsTable)
        .values({
          userId: ctx.session?.user.id!,
          title: input.title,
          content: input.content,
          documentType: input.documentType,
          isAnonymous: input.isAnonymous,
          isPublic: input.isPublic,
        })
        .returning();

      // Create chapters if provided
      const chapters = [];
      for (let i = 0; i < input.chapters.length; i++) {
        const ch = input.chapters[i];
        const [chapter] = await db
          .insert(chaptersTable)
          .values({
            title: ch.title,
            content: ch.content,
            documentId: document.id,
            orderIndex: i,
          })
          .returning();
        chapters.push(chapter);
      }

      // Create initial version
      await db.insert(documentVersionsTable).values({
        documentId: document.id,
        authorId: ctx.session?.user.id!,
        versionNumber: 1,
        title: document.title,
        content: document.content,
        versionType: "MANUAL_COMMIT",
        commitMessage: "Initial version",
      });

      return { document, chapters };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.any().optional(),
        chapterId: z.string().optional(),
        commitMessage: z.string().optional(),
        versionType: z
          .enum(["AUTO_SAVE", "MANUAL_COMMIT"])
          .default("MANUAL_COMMIT"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, chapterId, title, content, commitMessage, versionType } =
        input;

      if (chapterId) {
        const [chapter] = await db
          .update(chaptersTable)
          .set({
            content,
            ...(title && { title }),
            updatedAt: new Date(),
          })
          .where(eq(chaptersTable.id, chapterId))
          .returning();

        const latestVersion = await db
          .select()
          .from(documentVersionsTable)
          .where(eq(documentVersionsTable.chapterId, chapterId))
          .orderBy(desc(documentVersionsTable.versionNumber))
          .limit(1);

        await db.insert(documentVersionsTable).values({
          documentId: id,
          chapterId,
          authorId: ctx.session?.user.id!,
          versionNumber: (latestVersion[0]?.versionNumber || 0) + 1,
          title: chapter.title,
          content: chapter.content,
          versionType,
          commitMessage,
        });

        return chapter;
      } else {
        const [document] = await db
          .update(documentsTable)
          .set({
            content,
            ...(title && { title }),
            lastEditedBy: ctx.session?.user.id!,
            updatedAt: new Date(),
          })
          .where(eq(documentsTable.id, id))
          .returning();

        // Create version for document
        const latestVersion = await db
          .select()
          .from(documentVersionsTable)
          .where(
            and(
              eq(documentVersionsTable.documentId, id),
              isNull(documentVersionsTable.chapterId)
            )
          )
          .orderBy(desc(documentVersionsTable.versionNumber))
          .limit(1);

        await db.insert(documentVersionsTable).values({
          documentId: id,
          authorId: ctx.session?.user.id!,
          versionNumber: (latestVersion[0]?.versionNumber || 0) + 1,
          title: document.title,
          content: document.content,
          versionType,
          commitMessage,
        });

        return document;
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await db
        .delete(documentsTable)
        .where(eq(documentsTable.id, input.id));
    }),
});
