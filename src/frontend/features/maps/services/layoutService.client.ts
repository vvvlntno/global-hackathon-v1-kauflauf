import { supabase } from "@/lib/supabaseClient";
import { DroppedItem } from "../components/editor/types";

/**
 * Speichert das aktuelle Layout (Items) in Supabase.
 * Wenn du mehrere Layouts willst, kannst du `name` dynamisch setzen.
 */
export async function saveLayout(items: DroppedItem[], name = "default") {
  const { error } = await supabase
    .from("layouts")
    .upsert([
      {
        name,
        data: items,
        updated_at: new Date().toISOString(),
      },
    ], { onConflict: "name" }); // 👈 sorgt dafür, dass das Layout aktualisiert wird

  if (error) {
    console.error("❌ Fehler beim Speichern des Layouts:", error);
  } else {
    console.log("✅ Layout erfolgreich gespeichert!");
  }
}

/**
 * Lädt ein gespeichertes Layout (Items) aus Supabase.
 */
export async function loadLayout(name = "default"): Promise<DroppedItem[] | null> {
  const { data, error } = await supabase
    .from("layouts")
    .select("data")
    .eq("name", name)
    .single();

  if (error) {
    console.error("❌ Fehler beim Laden des Layouts:", error);
    return null;
  }

  return data?.data || null;
}
