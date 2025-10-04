"use client";

import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { glassStyles } from "@/shared/styles/glassStyles";

interface MapCardProps {
  id: string;
  title: string;
  description: string;
}

export default function MapCard({ id, title, description }: MapCardProps) {
  return (
    <div
      className={`w-full max-w-2xl flex items-center gap-4 p-4 rounded-xl 
                  text-white font-mono transition transform hover:scale-105 hover:bg-white/20 
                  ${glassStyles}`}
    >
      <div className="w-20 h-20 rounded-lg bg-white/20 flex items-center justify-center">
        <span className="text-sm text-gray-300">Img</span>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/maps/${id}/view`}
          className={`p-2 rounded-lg flex items-center justify-center hover:bg-white/20 transition ${glassStyles}`}
          title="View Map"
        >
          <Eye size={18} />
        </Link>
        <Link
          href={`/maps/${id}/edit`}
          className={`p-2 rounded-lg flex items-center justify-center hover:bg-white/20 transition ${glassStyles}`}
          title="Edit Map"
        >
          <Pencil size={18} />
        </Link>
      </div>
    </div>
  );
}
