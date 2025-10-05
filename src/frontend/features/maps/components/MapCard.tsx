"use client";

import { MapOverview } from "@/features/maps/types/maps";
import { glassStyles } from "@/shared/styles/glassStyles";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import EditMapModal from "./EditMapModal";

interface MapCardProps {
  map: MapOverview;
}

export default function MapCard({ map }: MapCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <div
        className={`relative flex items-center justify-between 
                    w-[60%] min-h-[120px] p-4 rounded-xl border ${glassStyles}
                    hover:scale-[1.02] transition mx-auto`}
      >
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center text-xs text-gray-200">
            Img
          </div>
          <div>
            <h2 className="font-mono font-bold">{map.title}</h2>
            <p className="text-sm text-gray-300 line-clamp-2">
              {map.description || "No description"}
            </p>
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {}}
            className="p-2 rounded-lg hover:bg-white/20 transition"
            title="View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-white/20 transition"
            title="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
      </div>

      
      <EditMapModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        map={{
          id: map.id,
          title: map.title,
          description: map.description || "",
          layout: (map as any).layout ?? {},
        }}
      />
    </>
  );
}
