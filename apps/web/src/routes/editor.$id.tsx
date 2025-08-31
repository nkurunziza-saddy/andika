import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/rich-text-editor";
import { ChapterSidebar } from "@/components/chapter-sidebar";
import { VersionHistory } from "@/components/version-history";
import {
  ArrowLeft,
  FileText,
  StickyNote,
  Layout,
  Clock,
  User,
  PanelLeftClose,
  PanelLeft,
  History,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SimpleEditor } from "@/components/text-editor/tiptap-templates/simple/simple-editor";

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

export const Route = createFileRoute("/editor/$id")({
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useParams();
  const documentId = id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const showChapters = document?.document_type === "document" || true;
  return (
    <div className="flex gap-1">
      {showChapters && sidebarOpen && (
        <ChapterSidebar
          documentId={documentId}
          currentChapterId={currentChapter?.id}
          onChapterSelect={() => {}}
        />
      )}

      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {showChapters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="h-8 w-8 p-0"
                  >
                    <PanelLeft className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setVersionHistoryOpen(!versionHistoryOpen)}
                  className="h-8 w-8 p-0"
                >
                  <History className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title..."
            />
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
          documentId={documentId}
          chapterId={currentChapter?.id}
          onRestore={() => {}}
        />
      )}
    </div>
  );
}
