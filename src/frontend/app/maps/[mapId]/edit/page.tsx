import { getMapById } from "@/features/maps/services/mapService.server";
import { glassStyles } from "@/shared/styles/glassStyles";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditPageProps {
  params: { mapId: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const map = await getMapById(params.mapId);

  if (!map) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
        Map with ID {params.mapId} not found.
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white font-mono">
      {/* Back Button oben links */}
      <div className="absolute top-6 left-6">
        <Link
          href="/maps"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${glassStyles} hover:bg-white/20 transition`}
        >
          <ArrowLeft size={16} /> Map overview
        </Link>
      </div>

      {/* Content */}
      <h1 className="text-2xl font-bold mb-4">Editing: {map.title}</h1>
      <p className="mb-4 text-gray-300">{map.description}</p>
      <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm">
        {JSON.stringify(map.layout, null, 2)}
      </pre>
    </main>
  );
}
