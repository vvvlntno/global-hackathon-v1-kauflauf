"use client";

import { Rnd } from "react-rnd";
import { DroppedItem } from "./types";
import { useState } from "react";

const baseGlassStyle = `
  backdrop-blur-md border border-white/20 drop-shadow-lg
  transition transform hover:scale-[1.02]
`;

interface RndBoxProps {
  item: DroppedItem;
  snapping: boolean;
  onUpdate: (id: string, updates: Partial<DroppedItem>) => void;
  onDoubleClick?: (item: DroppedItem) => void;
  onContextMenu?: (e: React.MouseEvent, item: DroppedItem) => void;
}

export default function RndBox({
  item,
  snapping,
  onUpdate,
  onDoubleClick,
  onContextMenu,
}: RndBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const GRID_SIZE = 20;

  const colors = [
    "bg-red-500/20 border-red-500/30",
    "bg-blue-500/20 border-blue-500/30",
    "bg-emerald-500/20 border-emerald-500/30",
    "bg-purple-500/20 border-purple-500/30",
    "bg-pink-500/20 border-pink-500/30",
    "bg-yellow-500/20 border-yellow-500/30",
    "bg-cyan-500/20 border-cyan-500/30",
    "bg-orange-500/20 border-orange-500/30",
  ];

  const colorClass =
    colors[item.colorIndex ?? 0] ?? "bg-white/10 border-white/20";

  if (item.type === "tray") {
  }

  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      bounds="parent"
      dragGrid={snapping ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
      resizeGrid={snapping ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
      onDragStart={() => setIsDragging(true)}
      onDragStop={(_, data) => {
        setIsDragging(false);
        onUpdate(item.id, { x: data.x, y: data.y });
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        onUpdate(item.id, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: position.x,
          y: position.y,
        });
      }}
      enableResizing={
        item.type === "tray"
          ? false
          : {
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }
      }
      className="rounded-xl overflow-hidden cursor-move select-none"
    >
      <div
        onDoubleClick={() => onDoubleClick?.(item)}
        onContextMenu={(e) => onContextMenu?.(e, item)}
        className={`w-full h-full flex items-center justify-center text-center font-mono text-sm text-white rounded-xl ${baseGlassStyle} ${colorClass}`}
      >
        
        {item.type === "tray" && item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-contain w-full h-full rounded-lg pointer-events-none select-none"
          />
        ) : (
          
          <span className="text-white text-xs font-mono">
            {item.name || "Section"}
          </span>
        )}
      </div>
    </Rnd>
  );
}
