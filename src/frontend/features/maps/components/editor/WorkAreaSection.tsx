"use client";

import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import RndBox from "./RndBox";
import { DroppedItem } from "./types";
import { glassStyles } from "@/shared/styles/glassStyles";

interface WorkAreaSectionProps {
  parent: DroppedItem;
  items: DroppedItem[];
  snapping: boolean;
  GRID_SIZE: number;
  onDrop: (item: { type: string }, x: number, y: number, parentId: string) => void;
  onUpdate: (id: string, updates: Partial<DroppedItem>) => void;
  onContextMenu: (e: React.MouseEvent, item: DroppedItem) => void;
  onItemDoubleClick: (item: DroppedItem) => void; // 🟢 neu
}

export default function WorkAreaSection({
  parent,
  items,
  snapping,
  GRID_SIZE,
  onDrop,
  onUpdate,
  onContextMenu,
  onItemDoubleClick, // 🟢 neu
}: WorkAreaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tool",
    drop: (item: { type: string }, monitor) => {
      const client = monitor.getClientOffset();
      const container = containerRef.current?.getBoundingClientRect();
      if (!client || !container) return;

      let x = client.x - container.left - 50;
      let y = client.y - container.top - 50;

      if (snapping) {
        x = Math.round(x / GRID_SIZE) * GRID_SIZE;
        y = Math.round(y / GRID_SIZE) * GRID_SIZE;
      }

      onDrop(item, x, y, parent.id);
    },
    collect: (m) => ({ isOver: !!m.isOver() }),
  }));

  const setRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (node) drop(node);
  };

  return (
    <div
      id="work-area-section"
      ref={setRefs}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 overflow-hidden ${glassStyles}`}
      style={{
        width: parent.width,
        height: parent.height,
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        zIndex: 20,
      }}
    >
      {items.map((item) => (
        <RndBox
          key={item.id}
          item={item}
          snapping={snapping}
          onUpdate={onUpdate}
          onDoubleClick={() => {
            if (item.type === "tray") {
              onItemDoubleClick(item); // 🟢 öffnet ItemEditModal
            }
          }}
          onContextMenu={(e) => onContextMenu(e, item)}
        />
      ))}
    </div>
  );
}
