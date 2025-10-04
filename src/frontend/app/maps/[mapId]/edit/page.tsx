"use client";

import ToolSidebar from "@/features/maps/components/edit/ToolSidebar";
import WorkArea from "@/features/maps/components/edit/WorkArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function EditPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen flex bg-gradient-to-br from-gray-900 to-black text-white font-mono">
        {/* Arbeitsbereich */}
        <div className="flex-1 p-4">
          <WorkArea />
        </div>

        {/* Tool-Bereich */}
        <div className="w-64 border-l border-white/20 p-4">
          <ToolSidebar />
        </div>
      </main>
    </DndProvider>
  );
}
