import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/rich-text-editor";
import { RotateCcw, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Version {
  id: string;
  version_number: number;
  title: string;
  content: any;
  commit_message: string | null;
  is_auto_save: boolean;
  created_at: string;
  chapters?: { title: string } | null;
}

interface VersionHistoryProps {
  documentId: string;
  chapterId?: string;
  onRestore?: () => void;
  className?: string;
}

export function VersionHistory({
  documentId,
  chapterId,
  onRestore,
  className,
}: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [showCommitDialog, setShowCommitDialog] = useState(false);

  return (
    <div
      className={cn(
        "w-80 border-l bg-sidebar text-sidebar-foreground border-sidebar-border flex flex-col",
        className
      )}
    >
      <div className="border-b border-sidebar-border">
        <div className="px-2 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">Version History</h3>
          </div>
          <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
            <DialogTrigger asChild>
              <Button size="xs" variant={"secondary"}>
                Commit changes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="mb-2">
                <DialogTitle>Save Version</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commit-message">Commit Message</Label>
                  <Textarea
                    id="commit-message"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Describe the changes you made..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => createVersion(commitMessage)}
                    disabled={!commitMessage.trim()}
                  >
                    Save Version
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCommitDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {versions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm">No versions yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {versions.map((version, index) => (
                <div key={version.id} className="p-3 border rounded-md">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        v{version.version_number}
                      </span>
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                      {version.is_auto_save && (
                        <Badge variant="outline" className="text-xs">
                          Auto
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm line-clamp-2">
                      {version.commit_message || "No message"}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(version.created_at), {
                        addSuffix: true,
                      })}
                    </div>

                    {version.chapters && (
                      <div className="text-xs text-muted-foreground">
                        Chapter: {version.chapters.title}
                      </div>
                    )}

                    <div className="flex gap-1 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => setSelectedVersion(version)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>
                              Version {version.version_number} - {version.title}
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-[60vh]">
                            <RichTextEditor
                              content={version.content}
                              onChange={() => {}}
                              editable={false}
                              className="border-0"
                            />
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>

                      {index !== 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => restoreVersion(version.id)}
                          disabled={isRestoring}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
