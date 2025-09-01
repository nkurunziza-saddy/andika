import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-md" />
        <div className="bg-muted/50 aspect-video rounded-md" />
        <div className="bg-muted/50 aspect-video rounded-md" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-md md:min-h-min" />
    </div>
  );
};

export default Loading;
