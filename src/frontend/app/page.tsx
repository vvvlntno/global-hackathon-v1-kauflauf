"use client";
import { motion } from "framer-motion";

import GlassHeader from "@/shared/components/GlassHeader";
import GlassButton from "@/shared/components/GlassButton";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-black">
      {/* Linke Seite */}
      <motion.div
          className="absolute inset-0 flex items-start justify-start pl-16 pt-16 bg-[url('https://kwgiklgjqpkkpitzappr.supabase.co/storage/v1/object/public/background-image/bg_cropped2.png')] bg-cover bg-center text-white"
        style={{
          clipPath: "polygon(0 0, 25% 0, 95% 100%, 0% 100%)",
        }}
        whileHover={{
          clipPath: "polygon(0 0, 30% 0, 100% 100%, 0% 100%)",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <GlassHeader>Kauflauf</GlassHeader>

        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </motion.div>

      {/* Rechte Seite */}
      <motion.div
        className="absolute inset-0 flex justify-end items-start pr-16 pt-16 bg-gradient-to-br from-gray-900 to-black"
        style={{
          clipPath: "polygon(25% 0, 100% 0, 100% 100%, 95% 100%)",
        }}
        whileHover={{
          clipPath: "polygon(20% 0, 100% 0, 100% 100%, 85% 100%)",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <GlassButton href="/maps">Start <ArrowRight size={16} /></GlassButton>
      </motion.div>
    </main>
  );
}
