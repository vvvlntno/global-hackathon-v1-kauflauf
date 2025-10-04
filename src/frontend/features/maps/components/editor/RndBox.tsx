"use client";

import { Rnd } from "react-rnd";
import { DroppedItem } from "./types";
import { useState } from "react";

interface RndBoxProps {
  item: DroppedItem;
  snapping: boolean;
  onUpdate: (id: string, updates: Partial<DroppedItem>) => void;
  onDoubleClick?: () => void;
  style?: React.CSSProperties;
}

const tailwindColors = [
  "bg-red-500/20 hover:bg-red-500/30",
  "bg-blue-500/20 hover:bg-blue-500/30",
  "bg-emerald-500/20 hover:bg-emerald-500/30",
  "bg-purple-500/20 hover:bg-purple-500/30",
  "bg-pink-500/20 hover:bg-pink-500/30",
  "bg-yellow-500/20 hover:bg-yellow-500/30",
  "bg-cyan-500/20 hover:bg-cyan-500/30",
  "bg-orange-500/20 hover:bg-orange-500/30",
];

export default function RndBox({
  item,
  snapping,
  onUpdate,
  onDoubleClick,
  style,
}: RndBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const GRID_SIZE = 20;

  const colorIndex = item.colorIndex ?? 0;
  const colorClass = tailwindColors[colorIndex % tailwindColors.length];

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
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      className="rounded-xl overflow-hidden cursor-move select-none"
    >
      <div className="w-full h-full relative group">
        {/* Hintergrund-Layer → Visual, keine Events */}
        <div
          className={`
            absolute inset-0 rounded-xl transition-all duration-300 
            ${colorClass} backdrop-blur-md border border-white/20 drop-shadow-lg
            group-hover:scale-[1.02]
          `}
          style={{
            pointerEvents: "none",
          }}
        />

        {/* Interaktions-Layer → Text & DoubleClick */}
        <div
          onDoubleClick={onDoubleClick}
          className="relative w-full h-full flex items-center justify-center text-center 
                     font-mono text-sm text-white select-none"
          style={style}
        >
          {item.name || "Section"}
        </div>
      </div>
    </Rnd>
  );
}
