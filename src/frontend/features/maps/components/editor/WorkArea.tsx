"use client";

import { useDrop } from "react-dnd";
import { useState, useRef, useEffect } from "react";
import RndBox from "./RndBox";
import { DroppedItem } from "./types";
import { glassStyles } from "@/shared/styles/glassStyles";
import SectionEditModal from "./SectionEditModal";

export default function WorkArea() {
  const [items, setItems] = useState<DroppedItem[]>([]);
  const [snapping, setSnapping] = useState(true);

  const [editingSection, setEditingSection] = useState<DroppedItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const dropRef = useRef<HTMLDivElement>(null);
  const WORKAREA_SIZE = 5000;
  const GRID_SIZE = 20;

  // 🟦 Drop Target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tool",
    drop: (item: { type: string }, monitor) => {
      const client = monitor.getClientOffset();
      const container = dropRef.current?.getBoundingClientRect();
      if (!client || !container) return;

      let x = client.x - container.left - 50 - offset.x;
      let y = client.y - container.top - 50 - offset.y;

      if (snapping) {
        x = Math.round(x / GRID_SIZE) * GRID_SIZE;
        y = Math.round(y / GRID_SIZE) * GRID_SIZE;
      }

      const newItem: DroppedItem = {
        id: Date.now().toString(),
        type: item.type,
        x,
        y,
        width: 120,
        height: 120,
        name: "New Section",
        colorIndex: 0, // Default rot
      };
      setItems((prev) => [...prev, newItem]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (dropRef.current) drop(dropRef.current);
  }, [drop]);

  const handleUpdate = (id: string, updates: Partial<DroppedItem>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...updates } : it))
    );
  };

  // ✋ Panning
  const clampOffset = (x: number, y: number) => {
    if (typeof window === "undefined") return { x, y };

    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;

    const minX = -(WORKAREA_SIZE - viewWidth);
    const minY = -(WORKAREA_SIZE - viewHeight);
    const maxX = 0;
    const maxY = 0;

    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2 || e.shiftKey) {
      isPanning.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning.current && lastPos.current) {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const newOffset = clampOffset(offset.x + dx, offset.y + dy);
      setOffset(newOffset);
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isPanning.current = false;
    lastPos.current = null;
  };

  // 📍 Start in der Mitte
  useEffect(() => {
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2 - WORKAREA_SIZE / 2;
      const centerY = window.innerHeight / 2 - WORKAREA_SIZE / 2;
      setOffset(clampOffset(centerX, centerY));
    }
  }, []);

  return (
    <div
      className="flex-1 relative overflow-hidden bg-gray-900 select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* GRID */}
      <div
        ref={dropRef}
        className="absolute"
        style={{
          width: `${WORKAREA_SIZE}px`,
          height: `${WORKAREA_SIZE}px`,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          cursor: isPanning.current ? "grabbing" : "grab",
        }}
      >
        {items.map((item) => (
          <RndBox
            key={item.id}
            item={item}
            snapping={snapping}
            onUpdate={handleUpdate}
            onDoubleClick={() => {
              if (item.type === "section") {
                setEditingSection(item);
                setIsModalOpen(true);
              }
            }}
          />
        ))}
      </div>

      {/* Snapping Toggle */}
      <button
        onClick={() => setSnapping((s) => !s)}
        className={`absolute bottom-6 right-6 px-4 py-2 rounded-xl font-mono text-sm hover:bg-white/20 transition ${glassStyles}`}
      >
        {snapping ? "Snapping: On" : "Snapping: Off"}
      </button>

      {/* Section Edit Modal */}
      <SectionEditModal
        isOpen={isModalOpen}
        section={editingSection}
        onClose={() => setIsModalOpen(false)}
        onSave={(updated) => {
          setItems((prev) =>
            prev.map((it) => (it.id === updated.id ? updated : it))
          );
        }}
      />
    </div>
  );
}
