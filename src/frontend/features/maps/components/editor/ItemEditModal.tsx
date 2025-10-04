"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { DroppedItem } from "./types";

interface ItemEditModalProps {
  isOpen: boolean;
  item: DroppedItem | null;
  activeSectionName: string | null;
  onClose: () => void;
  onSave: (updated: DroppedItem) => void;
}

interface Article {
  id: string;
  name: string;
  image_url: string;
  section: string;
}

export default function ItemEditModal({
  isOpen,
  item,
  activeSectionName,
  onClose,
  onSave,
}: ItemEditModalProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      if (!activeSectionName) return;
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("section", activeSectionName);

      if (error) console.error("❌ Fehler beim Laden der Artikel:", error);
      else setArticles(data || []);
    };
    loadArticles();
  }, [activeSectionName]);

  useEffect(() => {
    if (!item) return;
    setSelectedArticle(null);
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSave = () => {
    if (selectedArticle) {
      onSave({
        ...item,
        name: selectedArticle.name,
        imageUrl: selectedArticle.image_url,
      });
    } else {
      onSave(item);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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

            {/* Artikel-Auswahl */}
            <label className="block mb-2 text-sm font-mono text-white/80">
              Artikel auswählen:
            </label>
            <div className="relative mb-6">
              <select
                value={selectedArticle?.id || ""}
                onChange={(e) =>
                  setSelectedArticle(
                    articles.find((a) => a.id === e.target.value) || null
                  )
                }
                className="w-full font-mono text-base bg-gray-900 text-white border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white/40 appearance-none"
              >
                <option value="">-- Kein Artikel --</option>
                {articles.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>

              {/* kleines Caret Icon */}
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
      )}
    </AnimatePresence>
  );
}
