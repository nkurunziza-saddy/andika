import DocCard from "@/components/doc-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { documentsData } from "@/lib/data";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: AppPage,
});
async function AppPage() {
  console.log(documentsData);
  return (
    <div className="p-2">
      <Tabs defaultValue="viewed">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="viewed">Recently viewed</TabsTrigger>
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
            {documentsData.map((document) => (
              <DocCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
