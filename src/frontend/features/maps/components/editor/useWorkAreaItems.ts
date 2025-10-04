"use client";

import { useState } from "react";
import { DroppedItem } from "./types";

export function useWorkAreaItems() {
  const [items, setItems] = useState<DroppedItem[]>([]);

  const updateItem = (id: string, updates: Partial<DroppedItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...updates } : it)));

  const addItem = (newItem: DroppedItem) => setItems((prev) => [...prev, newItem]);

  return { items, setItems, updateItem, addItem };
}
