"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Trash2, LayoutDashboard, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateMap, deleteMap } from "@/features/maps/services/mapService.client";

interface EditMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  map: {
    id: string;
    title: string;
    description: string;
    layout?: any;
  };
}

export default function EditMapModal({ isOpen, onClose, map }: EditMapModalProps) {
  const [title, setTitle] = useState(map.title);
  const [description, setDescription] = useState(map.description);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSave = async () => {
    await updateMap(map.id, { title, description });
    router.refresh();
    onClose();
  };

  const handleDelete = async () => {
    await deleteMap(map.id);
    router.refresh();
    onClose();
  };

  const handleEditLayout = () => {
    onClose();
    router.push(`/maps/${map.id}/edit`);
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

          {/* Modal Card */}
          <motion.div
            className="relative z-10 w-[560px] p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-mono text-white">Edit Map</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-md transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex gap-4 mb-6">
              {/* Image Placeholder */}
              <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-md flex items-center justify-center text-xs text-white/60">
                Img
              </div>

              {/* Title + Description */}
              <div className="flex-1 flex flex-col gap-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Map title"
                  className="w-full font-mono text-base bg-white/10 rounded-md px-3 py-2 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white/40"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Map description..."
                  className="w-full text-sm bg-white/10 rounded-md p-3 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white/40 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleEditLayout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <LayoutDashboard size={18} /> Edit Layout
              </button>

              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/20 transition"
                >
                  <Trash2 size={18} /> Delete
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition text-white font-mono"
                >
                  <Save size={18} /> Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
