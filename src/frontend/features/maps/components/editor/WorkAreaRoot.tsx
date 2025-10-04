"use client";

import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import RndBox from "./RndBox";
import { DroppedItem } from "./types";
import { glassStyles } from "@/shared/styles/glassStyles";

interface WorkAreaRootProps {
  items: DroppedItem[];
  snapping: boolean;
  offset: { x: number; y: number };
  GRID_SIZE: number;
  WORKAREA_SIZE: number;
  onDrop: (item: { type: string }, x: number, y: number) => void;
  onUpdate: (id: string, updates: Partial<DroppedItem>) => void;
  onEnterSection: (item: DroppedItem) => void;
  onContextMenu: (e: React.MouseEvent, item: DroppedItem) => void;
}

export default function WorkAreaRoot({
  items,
  snapping,
  offset,
  GRID_SIZE,
  WORKAREA_SIZE,
  onDrop,
  onUpdate,
  onEnterSection,
  onContextMenu,
}: WorkAreaRootProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tool",
    drop: (item: { type: string }, monitor) => {
      console.log("Drop detected:", item);
      const client = monitor.getClientOffset();
      const container = containerRef.current?.getBoundingClientRect();
      if (!client || !container) return;
      let x = client.x - container.left - 50;
      let y = client.y - container.top - 50;
      if (snapping) {
        x = Math.round(x / GRID_SIZE) * GRID_SIZE;
        y = Math.round(y / GRID_SIZE) * GRID_SIZE;
      }
      onDrop(item, x, y);
    },
    collect: (m) => ({ isOver: !!m.isOver() }),
  }));

  const setRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (node) drop(node);
  };

  return (
    <div
      ref={setRefs}
      className="absolute transition-transform duration-100 ease-out"
      style={{
        width: `${WORKAREA_SIZE}px`,
        height: `${WORKAREA_SIZE}px`,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        cursor: "grab",
      }}
    >
      {items.map((item) => (
        <RndBox
          key={item.id}
          item={item}
          snapping={snapping}
          onUpdate={onUpdate}
          onDoubleClick={() => onEnterSection(item)}
          onContextMenu={(e) => onContextMenu(e, item)}
        />
      ))}
    </div>
  );
}
