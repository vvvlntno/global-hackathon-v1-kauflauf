"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WorkArea from "./WorkArea";
import ToolSidebar from "./ToolSidebar";


export default function EditorCore() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <WorkArea />
        <ToolSidebar />
      </div>
    </DndProvider>
  );
}
