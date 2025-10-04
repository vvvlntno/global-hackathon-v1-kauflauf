"use client";

import { glassStyles } from "@/shared/styles/glassStyles";
import { Trash2, Save, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { updateMap, deleteMap } from "@/features/maps/services/mapService.client";
import { useRouter } from "next/navigation";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Hintergrund Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative z-10 w-[600px] rounded-xl p-6 ${glassStyles}`}
      >
        <div className="flex gap-4 mb-6">
          {/* Image Placeholder */}
          <div className="w-24 h-24 bg-white/20 rounded-md flex items-center justify-center text-xs">
            Img
          </div>

          {/* Title + Description */}
          <div className="flex-1 flex flex-col gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full font-mono text-lg bg-white/10 rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/40"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm bg-white/10 rounded-md p-3 border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/40 resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Buttons Reihe */}
        <div className="flex justify-between items-center">
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
      </div>
    </div>
  );
}
