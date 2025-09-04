import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChapterSidebar } from "@/components/chapter-sidebar";
import { VersionHistory } from "@/components/version-history";
import { Edit2, Ellipsis, List, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { SimpleEditor } from "@/components/text-editor/tiptap-templates/simple/simple-editor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ApiSelectTypes, DocumentContentInterface } from "@andika/shared";
import { RenameDialog } from "@/components/action-dialogs/rename-dialog";
import { DeleteDialog } from "@/components/action-dialogs/delete-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

type NewSearchParams = {
  type: string;
};

export const Route = createFileRoute("/_protected/new")({
  validateSearch: (search: Record<string, unknown>): NewSearchParams => {
    return {
      type: (search.type as string) || "",
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { type } = Route.useSearch();
  const [currentChapter, setCurrentChapter] = useState<
    ApiSelectTypes["Chapters"] | null
  >(null);
  const [title, setTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const showChapters = type === "document" || type === "";
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [editorContent, setEditorContent] =
    useState<DocumentContentInterface>("");
  console.log({ editorContent });
  const handleRenameClick = () => {
    setIsDropdownOpen(false);
    setIsRenameDialogOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const documentQuery = useQuery({
    ...trpc.documents.getById.queryOptions(documentId || ""),
    enabled: !!documentId,
  });

  useEffect(() => {
    if (documentQuery.data?.[0]?.content) {
      setEditorContent(documentQuery.data[0].content);
    }
  }, [documentQuery.data]);

  const createMutation = useMutation({
    ...trpc.documents.create.mutationOptions(),
    onSuccess: (data) => {
      setDocumentId(data.document.id);
      window.history.replaceState(null, "", `/editor/${data.document.id}`);
    },
  });

  const updateMutation = useMutation({
    ...trpc.documents.update.mutationOptions(),
    onSuccess: () => {
      documentQuery.refetch();
    },
  });

  const handleSaveDocument = () => {
    if (documentId) {
      updateMutation.mutate({
        id: documentId,
        title: title || "Untitled Document",
        content: editorContent,
        chapterId: currentChapter?.id,
        commitMessage: "Manual save",
        versionType: "MANUAL_COMMIT",
      });
    } else {
      createMutation.mutate({
        title: title || "Untitled Document",
        content: editorContent,
        chapters: showChapters
          ? [
              {
                title: "Chapter 1",
                content: editorContent,
              },
            ]
          : [],
      });
    }
  };

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
              <div className="flex items-center px-1 w-full gap-2">
                {showChapters && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-0"
                  >
                    <List className="size-3.5" />
                  </Button>
                )}

                <div className="w-fit flex items-center ml-auto">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={handleSaveDocument}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  >
                    {createMutation.isPending || updateMutation.isPending
                      ? "Saving..."
                      : "Save"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setVersionHistoryOpen(!versionHistoryOpen)}
                  >
                    History
                  </Button>
                  <DropdownMenu
                    open={isDropdownOpen}
                    onOpenChange={setIsDropdownOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-fit w-fit p-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Ellipsis className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleRenameClick}>
                        <Edit2 className="size-3 mr-2" />
                        <span className="text-sm">Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleDeleteClick}
                        variant="destructive"
                      >
                        <Trash2 className="size-3.5 mr-1" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <RenameDialog
                    isDialogOpen={isRenameDialogOpen}
                    setIsDialogOpen={setIsRenameDialogOpen}
                    title={title}
                    setTitle={setTitle}
                  />
                  <DeleteDialog
                    isDialogOpen={isDeleteDialogOpen}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[calc(100vh-8rem)] overflow-auto">
            <SimpleEditor
              content={editorContent}
              onChange={(content) => setEditorContent(content)}
            />
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex px-1 items-center gap-1">
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
