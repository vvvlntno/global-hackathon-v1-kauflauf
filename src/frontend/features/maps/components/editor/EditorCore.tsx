"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToolSidebar from "./ToolSidebar";
import { useState } from "react";
import WorkAreaContainer from "./WorkAreaContainer";

interface EditorCoreProps {
  onBreadcrumbUpdate?: (path: string) => void;
}

export default function EditorCore({ onBreadcrumbUpdate }: EditorCoreProps) {
  const [currentTools, setCurrentTools] = useState<string[]>(["section"]);
  const [activeSectionName, setActiveSectionName] = useState<string | null>(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <WorkAreaContainer
          onToolsChange={setCurrentTools}
          onBreadcrumbChange={onBreadcrumbUpdate}
          onSectionChange={setActiveSectionName}
        />
        <ToolSidebar tools={currentTools} activeSection={activeSectionName} />
      </div>
    </DndProvider>
  );
}
