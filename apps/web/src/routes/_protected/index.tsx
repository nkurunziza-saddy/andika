import DocCard from "@/components/doc-card";
import Loading from "@/components/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, InfoIcon, PlusCircle } from "lucide-react";

export const Route = createFileRoute("/_protected/")({
  component: AppPage,
});
function AppPage() {
  const {
    data: docs,
    isLoading,
    error,
  } = useQuery(trpc.documents.getAll.queryOptions());

  if (isLoading)
    return (
      <div className="m-4">
        <Loading />
      </div>
    );
  if (error) {
    return (
      <div className="m-4 mb-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }
  if (docs?.length === 0)
    return (
      <div className="m-4 mb-6">
        <Alert>
          <InfoIcon className="size-4" />
          <AlertDescription>No documents found</AlertDescription>
        </Alert>
        <div className="flex flex-col mt-6">
          <h3 className="text-sm mb-3 underline text-foreground/85 underline-offset-4">
            Get started
          </h3>
          <div className="flex gap-3">
            <Button variant="secondary" className="" size={"sm"} asChild>
              <Link
                to="/new"
                className="flex items-center gap-2"
                search={{ type: "document" }}
              >
                <PlusCircle className="size-4" />
                Create Document
              </Link>
            </Button>
            <Button variant="secondary" className="" size={"sm"} asChild>
              <Link
                to="/new"
                className="flex items-center gap-2"
                search={{ type: "note" }}
              >
                <PlusCircle className="size-4" />
                Create Note
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="p-6">
      <Tabs defaultValue="viewed" className="space-y-3">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="viewed">Recently viewed</TabsTrigger>
            <TabsTrigger value="shared">Shared recently</TabsTrigger>
          </TabsList>
          <div className="w-fit ml-auto gap-1 flex">
            <Button size={"xs"} variant={"outline"}>
              Sort by
            </Button>
            <Button size={"xs"} variant={"outline"}>
              Type
            </Button>
          </div>
        </div>
        <TabsContent value="viewed">
          <div className="grid grid-cols-4 gap-4">
            {docs &&
              docs.map((item) => <DocCard key={item.id} document={item} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
