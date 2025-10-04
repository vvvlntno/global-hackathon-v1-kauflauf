import MapCard from "@/features/maps/components/MapCard";
import { getMapOverviews } from "@/features/maps/services/mapService.server";
import { glassStyles } from "@/shared/styles/glassStyles";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function MapsPage() {
  const maps = await getMapOverviews();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      {/* Branding Back Button oben links */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm ${glassStyles} hover:bg-white/20 transition`}
        >
          <ArrowLeft size={16} /> Kauflauf
        </Link>
      </div>

      {/* Avatar oben rechts */}
      <div
        className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm ${glassStyles}`}
      >
        Org
      </div>

      {/* Karten */}
      <div className="flex flex-col gap-4 items-start mt-16">
        {maps.length > 0 ? (
          maps.map((map) => (
            <MapCard key={map.id} map={map} />
          ))
        ) : (
          <p className="text-gray-400 font-mono">No maps found.</p>
        )}
      </div>

      {/* Plus Button */}
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
