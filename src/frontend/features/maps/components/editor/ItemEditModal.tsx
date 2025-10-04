"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";
import { DroppedItem } from "./types";

interface ItemEditModalProps {
  isOpen: boolean;
  item: DroppedItem | null;
  onClose: () => void;
  onSave: (updated: DroppedItem) => void;
}

export default function ItemEditModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ItemEditModalProps) {
  const [name, setName] = useState(item?.name ?? "");

  useEffect(() => {
    if (item) {
      setName(item.name || "");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSave = () => {
    onSave({
      ...item,
      name: name.trim(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-[420px] p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-mono text-white">Edit Tray</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-md transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tray name"
            className="w-full font-mono text-base bg-white/10 rounded-md px-3 py-2 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white/40 mb-6"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-mono text-sm hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition text-white font-mono"
            >
              <Save size={18} /> Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
