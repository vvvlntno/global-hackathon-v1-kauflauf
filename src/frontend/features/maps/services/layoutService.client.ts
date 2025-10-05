import { supabase } from "@/lib/supabaseClient";
import { DroppedItem } from "../components/editor/types";

 
export async function saveLayout(items: DroppedItem[], name = "default") {
  const { error } = await supabase
    .from("layouts")
    .upsert([
      {
        name,
        data: items,
        updated_at: new Date().toISOString(),
      },
  ], { onConflict: "name" });

  if (error) {
  } else {
  }
}

 
export async function loadLayout(name = "default"): Promise<DroppedItem[] | null> {
  const { data, error } = await supabase
    .from("layouts")
    .select("data")
    .eq("name", name)
    .single();

  if (error) {
    return null;
  }

  return data?.data || null;
}
