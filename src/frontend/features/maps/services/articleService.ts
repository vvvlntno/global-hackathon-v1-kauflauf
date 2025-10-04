import { supabase } from "@/lib/supabaseClient";
import { Article } from "../components/editor/types";

export async function fetchArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .is("section", null);
  if (error) throw error;
  return data || [];
}

export async function updateArticleSection(articleId: string, section: string) {
  const { error } = await supabase
    .from("articles")
    .update({ section })
    .eq("id", articleId);
  if (error) throw error;
}
