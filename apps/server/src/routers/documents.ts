import z from "zod";
import { router, publicProcedure, protectedProcedure } from "../lib/trpc";
import { documentsTable } from "../db/schema/documents.schema";
import { eq } from "drizzle-orm";
import { db } from "../db";

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
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await db.insert(documentsTable).values({
        userId: ctx.session?.user.id!,
        title: input.title,
        content: input.content,
        documentType: input.documentType,
        isAnonymous: input.isAnonymous,
        isPublic: input.isPublic,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await db
        .update(documentsTable)
        .set({
          title: input.title,
          content: input.content,
          documentType: input.documentType,
          isAnonymous: input.isAnonymous,
          isPublic: input.isPublic,
        })
        .where(eq(documentsTable.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await db
        .delete(documentsTable)
        .where(eq(documentsTable.id, input.id));
    }),
});
