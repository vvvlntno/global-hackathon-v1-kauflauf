import { createServerClient } from "@/lib/supabaseServer";
import { MapOverview, StoreMap } from "../types/maps";

// Overview laden (für MapsPage)
export async function getMapOverviews(): Promise<MapOverview[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("maps")
    .select("id, title, description, image")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

// Vollständige Map laden (für Edit/View Pages)
export async function getMapById(id: string): Promise<StoreMap | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("maps")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as StoreMap;
}

// Optional: Map updaten
export async function updateMap(id: string, updates: Partial<StoreMap>): Promise<StoreMap | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("maps")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data as StoreMap;
}
