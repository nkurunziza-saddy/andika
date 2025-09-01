import z from "zod";
import { router, publicProcedure, protectedProcedure } from "../lib/trpc";
import { chaptersTable } from "../db/schema/chapters.schema";
import { eq } from "drizzle-orm";
import { db } from "../db";

export const chapterRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(chaptersTable)
      .where(eq(chaptersTable.id, ctx.session.user.id));
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).default("Untitled chapter"),
        documentId: z.string().min(1),
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
        orderIndex: z.number().min(0).default(0),
        wordCount: z.number().min(0).default(0),
      })
    )
    .mutation(async ({ input }) => {
      return await db.insert(chaptersTable).values({
        title: input.title,
        content: input.content,
        documentId: input.documentId,
        orderIndex: input.orderIndex,
        wordCount: input.wordCount,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await db
        .delete(chaptersTable)
        .where(eq(chaptersTable.id, input.id));
    }),
});
