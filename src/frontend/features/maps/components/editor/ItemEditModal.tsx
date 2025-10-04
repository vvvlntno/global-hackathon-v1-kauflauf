"use client";

import { useState, useEffect } from "react";
import { DroppedItem } from "./types";
import { glassStyles } from "@/shared/styles/glassStyles";

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
  const [name, setName] = useState("");

  useEffect(() => {
    if (item) setName(item.name || "");
  }, [item]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div
        className={`p-6 rounded-2xl min-w-[300px] ${glassStyles} border border-white/20`}
      >
        <h2 className="text-lg font-mono mb-4 text-white">Edit Item Name</h2>
        <input
          className="w-full px-3 py-2 rounded-md bg-black/40 text-white border border-white/20 outline-none focus:ring-1 focus:ring-white/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-mono"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-emerald-600/80 hover:bg-emerald-600 text-white font-mono"
            onClick={() => {
              onSave({ ...item, name });
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
