"use client";
import { motion } from "framer-motion";

import GlassHeader from "@/shared/components/GlassHeader";
import GlassButton from "@/shared/components/GlassButton";
import ReviewsCarousel from "@/shared/components/ReviewCarousel";

const reviews = [
  { id: 1, text: "⭐⭐⭐⭐⭐  Super easy to use!" },
  { id: 2, text: "⭐⭐⭐⭐  Finally no more wasting time searching for items." },
  { id: 3, text: "⭐⭐⭐⭐⭐  Always the fastest route – saves me money too." },
  { id: 4, text: "⭐⭐⭐⭐  Building my store map took just a few minutes." },
  { id: 5, text: "⭐⭐⭐⭐⭐  Love the clean design and animations." },
  { id: 6, text: "⭐⭐⭐⭐  My team organizes shelves so much faster now." },
  { id: 7, text: "⭐⭐⭐⭐⭐  This tool literally saved me hours every week!" },
];

export default function LandingPage() {
  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-black">
      {/* Linke Seite */}
      <motion.div
        className="absolute inset-0 flex items-start justify-start pl-16 pt-16 bg-[url('/store.jpg')] bg-cover bg-center text-white"
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
        <GlassButton href="/maps">Start →</GlassButton>
      </motion.div>
    </main>
  );
}
