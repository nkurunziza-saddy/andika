import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@tanstack/react-router";
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { DocumentData } from "@/lib/data";

const DocCard = ({ document }: { document: DocumentData }) => {
  return (
    <Card key={document.id} className="group">
      <CardHeader className="pb-0">
        <div>
          <CardTitle className="line-clamp-1 mb-2">
            <Link
              to={`/editor/$id`}
              params={{
                id: document.id,
              }}
              className="hover:text-primary transition-colors"
            >
              {document.title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{document.documentType}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Badge
          variant={"ghost"}
          className="flex items-center text-xs text-muted-foreground"
        >
          Updated{" "}
          {formatDistanceToNow(new Date(document.updatedAt), {
            addSuffix: true,
          })}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default DocCard;
