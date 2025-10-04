"use client";

import { supabase } from "@/lib/supabaseClient";
import { StoreMap } from "../types/maps";

export async function createMap(
  title: string,
  description: string
): Promise<StoreMap | null> {
  const { data, error } = await supabase
    .from("maps")
    .insert([
      {
        title,
        description,
        layout: { sections: [] },
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating map:", error);
    return null;
  }
  return data as StoreMap;
}

export async function getMapOverviews(): Promise<StoreMap[]> {
  const { data, error } = await supabase
    .from("maps")
    .select("id, title, description, image");

  if (error) {
    console.error("Error fetching maps:", error);
    return [];
  }
  return data as StoreMap[];
}

export async function getMapById(id: string): Promise<StoreMap | null> {
  const { data, error } = await supabase
    .from("maps")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching map:", error);
    return null;
  }
  return data as StoreMap;
}

export async function updateMap(
  id: string,
  updates: Partial<StoreMap>
): Promise<StoreMap | null> {
  const { data, error } = await supabase
    .from("maps")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating map:", error);
    return null;
  }
  return data as StoreMap;
}

export async function deleteMap(id: string): Promise<boolean> {
  const { error } = await supabase.from("maps").delete().eq("id", id);
  if (error) {
    console.error("Error deleting map:", error);
    return false;
  }
  return true;
}
