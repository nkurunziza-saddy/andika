import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  GripVertical,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Loader from "./loader";

interface Chapter {
  id: string;
  title: string;
  order_index: number;
  content: any;
  created_at: string;
  updated_at: string;
}

interface ChapterSidebarProps {
  documentId: string;
  currentChapterId?: string;
  onChapterSelect: (chapterId: string) => void;
  className?: string;
}

export function ChapterSidebar({
  documentId,
  currentChapterId,
  onChapterSelect,
  className,
}: ChapterSidebarProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchChapters = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}/chapters`);
      const data = await response.json();
      if (data.chapters) {
        setChapters(data.chapters);
      }
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createChapter = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Chapter ${chapters.length + 1}`,
        }),
      });

      const data = await response.json();
      if (data.chapter) {
        setChapters((prev) => [...prev, data.chapter]);
        onChapterSelect(data.chapter.id);
      }
    } catch (error) {
      console.error("Failed to create chapter:", error);
    }
  };

  const updateChapterTitle = async (chapterId: string, title: string) => {
    try {
      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();
      if (data.chapter) {
        setChapters((prev) =>
          prev.map((ch) => (ch.id === chapterId ? { ...ch, title } : ch))
        );
      }
    } catch (error) {
      console.error("Failed to update chapter:", error);
    }
  };

  const deleteChapter = async (chapterId: string) => {
    if (chapters.length <= 1) {
      alert("Cannot delete the last chapter");
      return;
    }

    try {
      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setChapters((prev) => prev.filter((ch) => ch.id !== chapterId));
        // Select first remaining chapter if current was deleted
        if (currentChapterId === chapterId && chapters.length > 1) {
          const remainingChapters = chapters.filter(
            (ch) => ch.id !== chapterId
          );
          onChapterSelect(remainingChapters[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  const handleEditStart = (chapter: Chapter) => {
    setEditingId(chapter.id);
    setEditingTitle(chapter.title);
  };

  const handleEditSave = async () => {
    if (editingId && editingTitle.trim()) {
      await updateChapterTitle(editingId, editingTitle.trim());
    }
    setEditingId(null);
    setEditingTitle("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  useEffect(() => {
    fetchChapters();
  }, [documentId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={cn(
        "w-80 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col",
        className
      )}
    >
      <div className="border-b h-10 border-sidebar-border">
        <div className="px-2 flex items-center justify-between my-auto h-full">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium">Chapters</h2>
          </div>
          <Button variant={"secondary"} size="xs" onClick={createChapter}>
            <Plus className="size-4" /> Add chapter
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {chapters.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm">No chapters yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className={cn(
                    "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                    currentChapterId === chapter.id
                      ? "bg-primary/10 text-primary"
                      : ""
                  )}
                  onClick={() => onChapterSelect(chapter.id)}
                >
                  <GripVertical className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex-1 min-w-0">
                    {editingId === chapter.id ? (
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={handleEditSave}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEditSave();
                          if (e.key === "Escape") handleEditCancel();
                        }}
                        className="h-6 text-sm border-none shadow-none px-0 bg-transparent"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <div className="text-sm font-medium truncate">
                        {chapter.title}
                      </div>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditStart(chapter)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteChapter(chapter.id)}
                        className="text-destructive/40 bg-destructive"
                        disabled={chapters.length <= 1}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
