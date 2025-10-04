"use client";

import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";
import { Article } from "./types";
import { supabase } from "@/lib/supabaseClient";

/* 🔹 Draggable Tool Button (Section / Tray) */
function ToolItem({ type, label }: { type: string; label: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    // ✅ Klare Typentrennung: Sections = "tool", Trays = "tool-tray"
    type: type === "tray" ? "tool-tray" : "tool",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className={`px-4 py-2 rounded-lg cursor-move mb-2 font-mono 
        ${isDragging ? "bg-green-600/60" : "bg-white/10 hover:bg-white/20"} 
        text-white transition`}
    >
      {label}
    </div>
  );
}

/* 🔹 Artikelanzeige (kein Drag aktuell, nur visuell) */
function ArticleItem({ article }: { article: Article }) {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg mb-2 
        bg-white/10 hover:bg-white/20 text-white transition`}
    >
      {article.image_url && (
        <Image
          src={article.image_url}
          alt={article.name}
          width={32}
          height={32}
          className="rounded"
        />
      )}
      <span className="font-mono truncate">{article.name}</span>
    </div>
  );
}

/* 🔹 Main Sidebar */
export default function ToolSidebar({
  tools = ["section", "tray"],
  activeSection,
}: {
  tools?: string[];
  activeSection: string | null;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const labelMap: Record<string, string> = {
    section: "+ Section",
    tray: "+ Tray",
  };

  useEffect(() => {
    const load = async () => {
      if (!activeSection) {
        setArticles([]);
        return;
      }

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("section", activeSection);

      console.log("📦 Lade Artikel für Section:", activeSection);
      console.log("📦 Gefundene Artikel:", data);

      if (error) console.error(error);
      else setArticles(data || []);
    };

    load();
  }, [activeSection]);

  return (
    <div className="w-56 p-4 border-l border-white/10 bg-black/40 text-white font-mono h-full overflow-y-auto">
      {/* 🧰 Tools */}
      <h2 className="font-bold mb-4">Tools</h2>
      {tools.map((t) => (
        <ToolItem key={t} type={t} label={labelMap[t] || t} />
      ))}

      {/* ───────────── Divider ───────────── */}
      <div className="my-6 border-t border-white/20"></div>

      {/* 🧾 Artikel */}
      {activeSection ? (
        <>
          <h2 className="font-bold mb-3 text-emerald-300">
            Artikel in {activeSection}
          </h2>

          {articles.length === 0 && (
            <p className="text-sm text-white/50 italic mb-2">
              Keine Artikel gefunden.
            </p>
          )}

          {articles.map((a) => (
            <ArticleItem key={a.id} article={a} />
          ))}
        </>
      ) : (
        <p className="text-sm text-white/50 italic">Keine Section aktiv.</p>
      )}
    </div>
  );
}
