import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { chapterRouter } from "./chapters";
import { documentRouter } from "./documents";
import { todoRouter } from "./todo";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  documents: documentRouter,
  chapter: chapterRouter,
  todo: todoRouter,
});
export type AppRouter = typeof appRouter;
