"use client";

import { motion, AnimatePresence } from "framer-motion";
import { glassStyles } from "@/shared/styles/glassStyles";
import { Edit2, DoorOpen, Trash2 } from "lucide-react";
import { DroppedItem } from "./types";

interface ContextMenuProps {
  x: number;
  y: number;
  isVisible: boolean;
  item: DroppedItem | null;
  onEdit: () => void;
  onEnter: () => void;
  onDelete: () => void; // 🔹 NEU
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  isVisible,
  item,
  onEdit,
  onEnter,
  onDelete,
  onClose,
}: ContextMenuProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={`absolute z-50 min-w-[160px] rounded-xl p-2 ${glassStyles}`}
          style={{ top: y, left: x }}
          onMouseLeave={onClose}
        >
          {item.type === "section" ? (
            <>
              <button
                onClick={() => {
                  onEdit();
                  onClose();
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition text-white"
              >
                <Edit2 size={14} /> Edit Section
              </button>

              <button
                onClick={() => {
                  onEnter();
                  onClose();
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition text-white"
              >
                <DoorOpen size={14} /> Enter Section
              </button>

              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-500/40 hover:text-red-100 transition text-red-400"
              >
                <Trash2 size={14} /> Delete Section
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onEdit();
                  onClose();
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition text-white"
              >
                <Edit2 size={14} /> Edit Tray
              </button>

              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-500/40 hover:text-red-100 transition text-red-400"
              >
                <Trash2 size={14} /> Delete Tray
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
