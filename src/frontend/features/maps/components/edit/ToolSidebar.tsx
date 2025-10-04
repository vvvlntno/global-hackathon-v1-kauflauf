"use client";

import { useDrag } from "react-dnd";
import { useRef } from "react";

export default function ToolSidebar() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { id: "box1", type: "box" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref); // drag() verbindet sich mit dem DOM-Ref

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className={`w-16 h-16 bg-blue-500/60 rounded cursor-move flex items-center justify-center border border-white/30 ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        Box
      </div>
    </div>
  );
}
