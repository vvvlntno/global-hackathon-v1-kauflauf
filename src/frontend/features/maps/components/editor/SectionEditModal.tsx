"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
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
  const [availableSections, setAvailableSections] = useState<string[]>([]);

  // 🔸 Lade eindeutige Sections aus der "articles"-Tabelle
  useEffect(() => {
    const loadSections = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("section")
        .not("section", "is", null);

      if (error) {
        console.error("❌ Fehler beim Laden der Sections:", error);
        return;
      }

      const uniqueSections = Array.from(new Set(data.map((a) => a.section)));
      setAvailableSections(uniqueSections);
    };

    loadSections();
  }, []);

  // 🔸 Aktualisiere lokale States bei neuem "section"-Prop
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
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          className="relative z-10 w-[420px] p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-mono text-white">Edit Section</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-md transition"
            >
              <X size={18} />
            </button>
          </div>

          <label className="block mb-2 text-sm font-mono text-white/80">
            Select section:
          </label>
          <div className="relative mb-6">
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full font-mono text-base bg-gray-900 text-white border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white/40 appearance-none"
            >
              <option value="">-- No Section --</option>
              {availableSections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

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
