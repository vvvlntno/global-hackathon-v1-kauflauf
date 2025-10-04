"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createMap } from "@/features/maps/services/mapService.client";

export default function NewMapPage() {
  const router = useRouter();
  const createdRef = useRef(false);

  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;

    const create = async () => {
      const map = await createMap("Untitled Map", "New map description...");
      if (map) {
        router.replace(`/maps/${map.id}/edit`);
      }
    };

    create();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white font-mono">
      <p>Creating new map...</p>
    </main>
  );
}
