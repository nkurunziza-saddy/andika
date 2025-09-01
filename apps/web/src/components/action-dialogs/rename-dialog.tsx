import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const RenameDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  title,
  setTitle,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Document name</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsDialogOpen(false);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="document-name">Name</Label>
            <Input
              id="document-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title..."
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
