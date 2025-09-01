import { ChevronLeftIcon, SettingsIcon, SlashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "./user-menu";
import { Link } from "@tanstack/react-router";

export default function PageHeader() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Button
            className="size-8"
            variant="ghost"
            size="icon"
            aria-label="Go back"
            asChild
          >
            <Link to="/">
              <SlashIcon />
            </Link>
          </Button>
          <h1 className="text-sm font-medium">Current page</h1>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant={"outline"} size={"xs"} asChild>
            <Link to={"/new"} search={{ type: "document" }}>
              Document
            </Link>
          </Button>
          <Button variant={"outline"} size={"xs"} asChild>
            <Link to={"/new"} search={{ type: "template" }}>
              Template
            </Link>
          </Button>
          <Button variant={"outline"} size={"xs"} asChild>
            <Link to={"/new"} search={{ type: "note" }}>
              Note
            </Link>
          </Button>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
