"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";
import { DroppedItem } from "./types";

interface SectionEditModalProps {
  isOpen: boolean;
  section: DroppedItem | null;
  onClose: () => void;
  onSave: (updated: DroppedItem) => void;
}

const tailwindColors = [
  "bg-red-500/30",
  "bg-blue-500/30",
  "bg-emerald-500/30",
  "bg-purple-500/30",
  "bg-pink-500/30",
  "bg-yellow-500/30",
  "bg-cyan-500/30",
  "bg-orange-500/30",
];

export default function SectionEditModal({
  isOpen,
  section,
  onClose,
  onSave,
}: SectionEditModalProps) {
  const [name, setName] = useState(section?.name ?? "");
  const [colorIndex, setColorIndex] = useState(section?.colorIndex ?? 0);

  useEffect(() => {
    if (section) {
      setName(section.name || "");
      setColorIndex(section.colorIndex ?? 0);
    }
  }, [section]);

  if (!isOpen || !section) return null;

  const handleSave = () => {
    onSave({
      ...section,
      name: name.trim(),
      colorIndex,
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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-mono text-white">Edit Section</h2>
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
            placeholder="Section name"
            className="w-full font-mono text-base bg-white/10 rounded-md px-3 py-2 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white/40 mb-6"
          />

          {/* Color Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {tailwindColors.map((cls, idx) => (
              <button
                key={idx}
                onClick={() => setColorIndex(idx)}
                className={`w-10 h-10 rounded-full border-2 transition ${
                  idx === colorIndex ? "border-white scale-110" : "border-transparent"
                } ${cls}`}
              />
            ))}
          </div>

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
