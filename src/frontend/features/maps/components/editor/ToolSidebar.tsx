"use client";

import { useDrag } from "react-dnd";

function ToolItem({ type, label }: { type: string; label: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tool",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className={`px-4 py-2 rounded-lg cursor-move mb-2 font-mono 
        ${isDragging ? "bg-green-600/60" : "bg-white/10 hover:bg-white/20"} 
        text-white transition`}
    >
      {label}
    </div>
  );
}

export default function ToolSidebar({ tools = ["section"] }: { tools?: string[] }) {
  const labelMap: Record<string, string> = {
    section: "+ Section",
    tray: "+ Tray",
  };

  return (
    <div className="w-48 p-4 border-l border-white/10 bg-black/40 text-white font-mono h-full">
      <h2 className="font-bold mb-4">Tools</h2>
      {(tools || []).map((t) => (
        <ToolItem key={t} type={t} label={labelMap[t] || t} />
      ))}
    </div>
  );
}
