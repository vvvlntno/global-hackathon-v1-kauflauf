"use client";

import { useEffect, useState } from "react";
import { glassStyles } from "@/shared/styles/glassStyles";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface BreadcrumbHeaderProps {
  sectionName?: string;
}

export default function BreadcrumbHeader({ sectionName }: BreadcrumbHeaderProps) {
  const [mapName, setMapName] = useState<string>("...");
  const params = useParams();
  const mapId = params?.mapId as string;

  useEffect(() => {
    const fetchMapName = async () => {
      if (!mapId) return;
      const { data, error } = await supabase
        .from("maps")
        .select("title")
        .eq("id", mapId)
        .single();

      if (!error && data?.title) setMapName(data.title);
      else setMapName("Unknown Map");
    };
    fetchMapName();
  }, [mapId]);

  return (
    <div
      className={`
        px-6 py-3 rounded-xl font-mono text-white text-base
        flex items-center gap-3 ${glassStyles}
        backdrop-blur-md drop-shadow-lg border border-white/20
        transition-transform hover:scale-[1.02]
      `}
    >
      <span className="text-white/90">{mapName}</span>
      {sectionName && (
        <>
          <ChevronRight size={16} className="text-white/40" />
          <span className="text-white font-medium">{sectionName}</span>
        </>
      )}
    </div>
  );
}
