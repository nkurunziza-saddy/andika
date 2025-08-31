import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChapterSidebar } from "@/components/chapter-sidebar";
import { VersionHistory } from "@/components/version-history";
import { PanelLeft, History } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { createFileRoute } from "@tanstack/react-router";
import { SimpleEditor } from "@/components/text-editor/tiptap-templates/simple/simple-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Document {
  id: string;
  title: string;
  content: any;
  document_type: "note" | "document" | "template";
  created_at: string;
  updated_at: string;
}

interface Chapter {
  id: string;
  title: string;
  content: any;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const Route = createFileRoute("/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [document, setDocument] = useState<Document | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [title, setTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const showChapters = document?.document_type === "document" || true;
  return (
    <div className="flex gap-1">
      {showChapters && sidebarOpen && (
        <ChapterSidebar
          documentId={"documentId"}
          currentChapterId={currentChapter?.id}
          onChapterSelect={() => {}}
        />
      )}

      <div className="flex-1 flex flex-col">
        <div className="w-full mx-auto">
          <div className="h-10 mb-4 border-b border-sidebar-border">
            <div className="flex h-full my-auto items-center gap-4">
              <div className="flex items-center w-full gap-2">
                {showChapters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="h-8 w-8 p-0"
                  >
                    <PanelLeft className="size-3.5" />
                  </Button>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="xs" variant={"secondary"}>
                      Name
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="mb-2">
                      <DialogTitle>Document name</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="commit-message">Name</Label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Document title..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">Save</Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="w-fit ml-auto">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setVersionHistoryOpen(!versionHistoryOpen)}
                  >
                    History
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <SimpleEditor />

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              Updated {formatDistanceToNow(new Date(), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>

      {versionHistoryOpen && (
        <VersionHistory
          documentId={"documentId"}
          chapterId={currentChapter?.id}
          onRestore={() => {}}
        />
      )}
    </div>
  );
}
