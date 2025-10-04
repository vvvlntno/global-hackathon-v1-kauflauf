"use client";

import { useState, useRef } from "react";
import { useDrop } from "react-dnd";

interface DroppedItem {
  id: string;
  type: string;
  x: number;
  y: number;
}

export default function WorkArea() {
  const [items, setItems] = useState<DroppedItem[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: (item: { id: string; type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const newItem: DroppedItem = {
        id: `${item.id}-${Date.now()}`,
        type: item.type,
        x: offset.x,
        y: offset.y,
      };

      setItems((prev) => [...prev, newItem]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref); // drop() verbindet sich mit DOM-Ref

  return (
    <div
      ref={ref}
      className="relative w-full h-full bg-black/30 border border-white/20 rounded-lg"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Items im Arbeitsbereich */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute w-16 h-16 bg-blue-400/60 rounded border border-white/30"
          style={{ top: item.y, left: item.x }}
        />
      ))}

      {/* Overlay beim Hover */}
      {isOver && (
        <div className="absolute inset-0 bg-green-500/10 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}
