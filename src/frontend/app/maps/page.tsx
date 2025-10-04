import MapCard from "@/features/maps/components/MapCard";
import { getMapOverviews } from "@/features/maps/services/mapService";
import { glassStyles } from "@/shared/styles/glassStyles";
import Link from "next/link";

export default function MapsPage() {
  const maps = getMapOverviews();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      {/* Avatar oben rechts */}
      <div
        className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm ${glassStyles}`}
      >
        Org
      </div>

      {/* Karten links */}
      <div className="flex flex-col gap-4 items-start">
        {maps.map((map) => (
          <MapCard
            key={map.id}
            id={map.id}
            title={map.title}
            description={map.description}
          />
        ))}
      </div>

      {/* Plus Button unten rechts */}
      <div className="absolute bottom-6 right-6">
        <Link
          href="/maps/new"
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl shadow-lg hover:bg-white/20 transition ${glassStyles}`}
        >
          +
        </Link>
      </div>
    </main>
  );
}
