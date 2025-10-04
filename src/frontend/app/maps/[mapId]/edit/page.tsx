"use client";

import EditorCore from "@/features/maps/components/editor/EditorCore";
import { ArrowLeft } from "lucide-react";
import GlassButton from "@/shared/components/GlassButton";
import BreadcrumbHeader from "@/features/maps/components/editor/BreadCrumbHeader";
import { useState } from "react";

interface EditPageProps {
  params: { mapId: string };
}

export default function EditPage({ params }: EditPageProps) {
  const [breadcrumb, setBreadcrumb] = useState("Root");

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-mono">
      {/* 🔙 Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <GlassButton href="/maps">
          <ArrowLeft size={16} /> Map overview
        </GlassButton>
      </div>

      {/* 🧭 Breadcrumb Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
        <BreadcrumbHeader path={breadcrumb} />
      </div>

      {/* 🧠 Editor Core (sendet Breadcrumb-Updates) */}
      <EditorCore onBreadcrumbUpdate={setBreadcrumb} />
    </main>
  );
}
