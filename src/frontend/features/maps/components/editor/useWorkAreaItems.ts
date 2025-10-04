"use client";

import { useState } from "react";
import { DroppedItem } from "./types";

export function useWorkAreaItems() {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const updateItem = (id: string, updates: Partial<DroppedItem>) =>
    setItems((prev) => prev.map((it) => {
      if (it.id === id) {
        console.log("Updating tray:", id, updates);
        return { ...it, ...updates };
      }
      return it;
    }));

  const addItem = (newItem: DroppedItem) => setItems((prev) => [...prev, newItem]);

  return { items, setItems, updateItem, addItem };
}
