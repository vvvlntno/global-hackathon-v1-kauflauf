"use client";

import { useDrop } from "react-dnd";
import { useState, useRef, useEffect } from "react";
import RndBox from "./RndBox";
import { DroppedItem } from "./types";
import { glassStyles } from "@/shared/styles/glassStyles";
import SectionEditModal from "./SectionEditModal";
import ContextMenu from "./ContextMenu";

interface WorkAreaProps {
  onToolsChange?: (tools: string[]) => void;
  onBreadcrumbChange?: (path: string) => void;
}

export default function WorkArea({ onToolsChange, onBreadcrumbChange }: WorkAreaProps) {
  const [items, setItems] = useState<DroppedItem[]>([]);
  const [snapping, setSnapping] = useState(true);
  const [editingSection, setEditingSection] = useState<DroppedItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    item: null as DroppedItem | null,
    visible: false,
  });

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const subDropRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<DroppedItem | null>(null);

  const WORKAREA_SIZE = 5000;
  const GRID_SIZE = 20;

  /** === Root Drop === */
  const [{ isOver: isOverRoot }, dropRoot] = useDrop(() => ({
    accept: "tool",
    drop: (item: { type: string }, monitor) => handleDrop(item, monitor, null),
    collect: (m) => ({ isOver: !!m.isOver() }),
  }));

  /** === Section Drop === */
  const [{ isOver: isOverSub }, dropSub] = useDrop(() => ({
    accept: "tool",
    drop: (item: { type: string }, monitor) => handleDrop(item, monitor, activeSection?.id || null),
    collect: (m) => ({ isOver: !!m.isOver() }),
  }));

  useEffect(() => {
    if (dropRef.current) dropRoot(dropRef.current);
    if (activeSection && subDropRef.current) dropSub(subDropRef.current);
  }, [dropRoot, dropSub, activeSection]);

  /** 🔽 universelle Drop-Logik */
  const handleDrop = (
    item: { type: string },
    monitor: any,
    parentId: string | null
  ) => {
    console.log("Dropping into:", parentId ? "SECTION" : "ROOT");
    console.log("Active section:", activeSection?.name);
    const client = monitor.getClientOffset();
    const container = parentId
      ? subDropRef.current?.getBoundingClientRect()
      : dropRef.current?.getBoundingClientRect();
    if (!client || !container) return;

    let x = client.x - container.left - offset.x - 50;
    let y = client.y - container.top - offset.y - 50;
    if (snapping) {
      x = Math.round(x / GRID_SIZE) * GRID_SIZE;
      y = Math.round(y / GRID_SIZE) * GRID_SIZE;
    }

    let width = 120;
    let height = 120;
    if (parentId && (item.type === "tray" || item.type === "shelf")) {
      width = GRID_SIZE * 3;
      height = GRID_SIZE * 3;
    }

    const newItem: DroppedItem = {
      id: Date.now().toString(),
      type: item.type,
      x,
      y,
      width,
      height,
      name:
        item.type === "section"
          ? "New Section"
          : item.type === "tray"
          ? "New Tray"
          : "New Shelf",
      colorIndex: Math.floor(Math.random() * 8),
      parentId: parentId ?? undefined,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<DroppedItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...updates } : it)));

  /** ✋ Panning */
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
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };
  const handleMouseUp = () => {
    isPanning.current = false;
    lastPos.current = null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2 - WORKAREA_SIZE / 2;
      const centerY = window.innerHeight / 2 - WORKAREA_SIZE / 2;
      setOffset({ x: centerX, y: centerY });
    }
  }, []);

  /** 🔍 Navigation */
  const handleEnterSection = (item: DroppedItem) => {
    setActiveSection(item);
    onBreadcrumbChange?.(`Root > ${item.name}`);
  };
  const handleExitSection = () => {
    setActiveSection(null);
    onBreadcrumbChange?.("Root");
  };

  const visibleItems = items.filter((it) =>
    activeSection ? it.parentId === activeSection.id : !it.parentId
  );
  const currentTools = activeSection === null ? ["section"] : ["tray", "shelf"];
  useEffect(() => {
    onToolsChange?.(currentTools);
  }, [activeSection]);

  return (
    <div
      className="flex-1 relative overflow-hidden bg-gray-900 select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Root WorkArea */}
      <div
        ref={dropRef}
        className="absolute transition-transform duration-200 ease-linear"
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
        {!activeSection &&
          items
            .filter((it) => !it.parentId)
            .map((item) => (
              <RndBox
                key={item.id}
                item={item}
                snapping={snapping}
                onUpdate={handleUpdate}
                onDoubleClick={() => handleEnterSection(item)}
                onContextMenu={(e, it) => {
                  e.preventDefault();
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    item: it,
                    visible: true,
                  });
                }}
              />
            ))}
      </div>

      {/* Sub-WorkArea when inside Section */}
      {activeSection && (
        <>
          {/* Transparenter Overlay zum Rausklicken */}
          <div
            className="absolute inset-0 z-40"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.id === "overlay-exit") handleExitSection();
            }}
          >
            <div id="overlay-exit" className="w-full h-full"></div>
          </div>

          <div
            ref={subDropRef}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 overflow-hidden z-50 ${glassStyles}`}
            style={{
              width: activeSection.width,
              height: activeSection.height,
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            }}
          >
            {visibleItems.map((item) => (
              <RndBox
                key={item.id}
                item={item}
                snapping={snapping}
                onUpdate={handleUpdate}
                onDoubleClick={() => {}}
                onContextMenu={(e, it) => {
                  e.preventDefault();
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    item: it,
                    visible: true,
                  });
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Controls + Modals */}
      <button
        onClick={() => setSnapping((s) => !s)}
        className={`absolute bottom-6 right-6 px-4 py-2 rounded-xl font-mono text-sm hover:bg-white/20 transition ${glassStyles}`}
      >
        {snapping ? "Snapping: On" : "Snapping: Off"}
      </button>

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

      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isVisible={contextMenu.visible}
        onClose={() => setContextMenu((p) => ({ ...p, visible: false }))}
        onEdit={() => {
          if (contextMenu.item) {
            setEditingSection(contextMenu.item);
            setIsModalOpen(true);
          }
        }}
        onEnter={() =>
          contextMenu.item && handleEnterSection(contextMenu.item)
        }
      />
    </div>
  );
}
