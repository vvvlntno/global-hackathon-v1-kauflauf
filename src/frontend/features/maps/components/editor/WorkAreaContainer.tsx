"use client";

import { useState, useEffect } from "react";
import { useWorkAreaItems } from "./useWorkAreaItems";
import { DroppedItem } from "./types";
import WorkAreaRoot from "./WorkAreaRoot";
import WorkAreaSection from "./WorkAreaSection";
import SectionEditModal from "./SectionEditModal";
import ItemEditModal from "./ItemEditModal";
import ContextMenu from "./ContextMenu";
import { glassStyles } from "@/shared/styles/glassStyles";
import { saveLayout, loadLayout } from "@/features/maps/services/layoutService.client"; // 🔹 NEU

interface WorkAreaContainerProps {
  onToolsChange?: (tools: string[]) => void;
  onBreadcrumbChange?: (path: string) => void;
  onSectionChange?: (sectionName: string | null) => void;
}

export default function WorkAreaContainer({
  onToolsChange,
  onBreadcrumbChange,
  onSectionChange,
}: WorkAreaContainerProps) {
  const { items, updateItem, addItem, setItems } = useWorkAreaItems(); // 👈 wichtig: setItems muss verfügbar sein
  const [snapping, setSnapping] = useState(true);
  const [activeSection, setActiveSection] = useState<DroppedItem | null>(null);
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    item: null as DroppedItem | null,
    visible: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<DroppedItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DroppedItem | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const WORKAREA_SIZE = 5000;
  const GRID_SIZE = 20;

  // 🔹 initiales Zentrieren
  useEffect(() => {
    const centerX = window.innerWidth / 2 - WORKAREA_SIZE / 2;
    const centerY = window.innerHeight / 2 - WORKAREA_SIZE / 2;
    setOffset({ x: centerX, y: centerY });
  }, []);

  // 🔹 Layout beim Start aus Supabase laden
  useEffect(() => {
    const init = async () => {
      const saved = await loadLayout();
      if (saved) {
        console.log("📦 Gespeichertes Layout geladen:", saved);
        if (setItems) setItems(saved); // ⚠️ wichtig: dein Hook muss das erlauben
      }
    };
    init();
  }, []);

  // 🔹 Layout nach jeder Änderung speichern
  useEffect(() => {
    if (items && items.length > 0) {
      saveLayout(items);
    }
  }, [items]);

  const handleDropRoot = (item: { type: string }, x: number, y: number) => {
    addItem({
      id: Date.now().toString(),
      type: item.type,
      x,
      y,
      width: 120,
      height: 120,
      name: "New Section",
      colorIndex: Math.floor(Math.random() * 8),
      parentId: undefined,
    });
  };

  const handleDropSection = (
    item: { type: string },
    x: number,
    y: number,
    parentId: string
  ) => {
    addItem({
      id: Date.now().toString(),
      type: item.type,
      x,
      y,
      width: GRID_SIZE * 3,
      height: GRID_SIZE * 3,
      name: "New Tray",
      colorIndex: Math.floor(Math.random() * 8),
      parentId,
    });
  };

  const handleEnterSection = (section: DroppedItem) => {
    setActiveSection(section);
    onBreadcrumbChange?.(`Root > ${section.name}`);
    onSectionChange?.(section.name);
  };

  const handleExitSection = () => {
    setActiveSection(null);
    onBreadcrumbChange?.("Root");
    onSectionChange?.(null);
  };

  const visibleItems = items.filter((i) =>
    activeSection ? i.parentId === activeSection.id : !i.parentId
  );

  const currentTools = activeSection === null ? ["section"] : ["tray"];
  useEffect(() => {
    onToolsChange?.(currentTools);
  }, [activeSection]);

  return (
    <div
      className="flex-1 relative overflow-hidden bg-gray-900 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {!activeSection ? (
        <WorkAreaRoot
          items={visibleItems}
          snapping={snapping}
          offset={offset}
          GRID_SIZE={GRID_SIZE}
          WORKAREA_SIZE={WORKAREA_SIZE}
          onDrop={handleDropRoot}
          onUpdate={updateItem}
          onEnterSection={handleEnterSection}
          onContextMenu={(e, it) =>
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              item: it,
              visible: true,
            })
          }
        />
      ) : (
        <>
          {/* Overlay für Klick außerhalb der Section */}
          <div
            className="absolute inset-0"
            style={{
              background: "transparent",
              pointerEvents: "auto",
              zIndex: 10,
            }}
            onPointerDown={(e) => {
              const section = document.getElementById("work-area-section");
              if (section) {
                const rect = section.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                if (
                  x < rect.left ||
                  x > rect.right ||
                  y < rect.top ||
                  y > rect.bottom
                ) {
                  handleExitSection();
                }
              }
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <WorkAreaSection
              parent={activeSection}
              items={visibleItems}
              snapping={snapping}
              GRID_SIZE={GRID_SIZE}
              onDrop={handleDropSection}
              onUpdate={updateItem}
              onContextMenu={(e, it) =>
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  item: it,
                  visible: true,
                })
              }
              onItemDoubleClick={(item) => {
                setEditingItem(item);
                setIsItemModalOpen(true);
              }}
            />

            {/* Backup Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "transparent",
                pointerEvents: "auto",
                zIndex: 5,
              }}
              onPointerDown={(e) => {
                const section = document.getElementById("work-area-section");
                if (section) {
                  const rect = section.getBoundingClientRect();
                  const x = e.clientX;
                  const y = e.clientY;
                  if (
                    x < rect.left ||
                    x > rect.right ||
                    y < rect.top ||
                    y > rect.bottom
                  ) {
                    handleExitSection();
                  }
                }
              }}
            />
          </div>
        </>
      )}

      {/* Snapping Toggle */}
      <button
        onClick={() => setSnapping((s) => !s)}
        className={`absolute bottom-6 right-6 px-4 py-2 rounded-xl font-mono text-sm hover:bg-white/20 transition ${glassStyles}`}
      >
        {snapping ? "Snapping: On" : "Snapping: Off"}
      </button>

      {/* Modals */}
      <SectionEditModal
        isOpen={isModalOpen}
        section={editingSection}
        onClose={() => setIsModalOpen(false)}
        onSave={(updated) => updateItem(updated.id, updated)}
      />
      <ItemEditModal
        isOpen={isItemModalOpen}
        item={editingItem}
        activeSectionName={activeSection?.name || null}
        onClose={() => setIsItemModalOpen(false)}
        onSave={(updated) => updateItem(updated.id, updated)}
      />

      {/* ContextMenu */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isVisible={contextMenu.visible}
        item={contextMenu.item}
        onClose={() => setContextMenu((p) => ({ ...p, visible: false }))}
        onEdit={() => {
          if (contextMenu.item?.type === "tray") {
            setEditingItem(contextMenu.item);
            setIsItemModalOpen(true);
          } else if (contextMenu.item) {
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
