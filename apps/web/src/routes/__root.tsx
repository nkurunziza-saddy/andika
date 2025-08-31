import { Toaster } from "@/components/ui/sonner";
import type { trpc } from "@/utils/trpc";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../styles/index.css";
import { ThemeProvider } from "next-themes";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "andika",
      },
      {
        name: "description",
        content: "andika is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="andika-ui-theme"
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <h4 className="text-sm font-medium">Recents</h4>
              <div className="ml-auto flex items-center space-x-2">
                <Button variant={"outline"} size={"xs"}>
                  Document
                </Button>
                <Button variant={"outline"} size={"xs"}>
                  Template
                </Button>
                <Button variant={"outline"} size={"xs"}>
                  Note
                </Button>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4">
              {isFetching ? <Loading /> : <Outlet />}
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </>
  );
}
