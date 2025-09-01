import PageHeader from "@/components/header";
import Loading from "@/components/loading";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    try {
      const session = await authClient.getSession();

      if (!session.data) {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.href,
          },
        });
      }

      return {
        session: session.data,
      };
    } catch (error) {
      if (typeof error === "object" && error !== null && "redirect" in error)
        throw error;

      console.error("Auth check failed:", error);
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  pendingComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <PageHeader />
      <div className="flex flex-1 flex-col gap- relative w-full">
        <Outlet />
      </div>
    </div>
  );
}
