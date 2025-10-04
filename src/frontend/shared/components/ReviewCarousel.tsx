"use client";
import { motion } from "framer-motion";

const reviews = [
  { id: 1, stars: "⭐⭐⭐⭐⭐", text: "Super easy to use!" },
  { id: 2, stars: "⭐⭐⭐⭐", text: "Finally no more wasting time searching for items." },
  { id: 3, stars: "⭐⭐⭐⭐⭐", text: "Always the fastest route – saves me money too." },
  { id: 4, stars: "⭐⭐⭐⭐", text: "Building my store map took just a few minutes." },
  { id: 5, stars: "⭐⭐⭐⭐⭐", text: "Love the clean design and animations." },
  { id: 6, stars: "⭐⭐⭐⭐", text: "My team organizes shelves so much faster now." },
  { id: 7, stars: "⭐⭐⭐⭐⭐", text: "This tool literally saved me hours every week!" },
];

export default function ReviewsCarousel() {
  return (
    <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-36 group">
      <div className="flex gap-8 whitespace-nowrap items-center h-full px-4 animate-marquee group-hover:[animation-play-state:paused]">
        {[...reviews, ...reviews].map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 max-w-xs px-6 py-4 rounded-xl 
                       bg-white/10 backdrop-blur-md border border-white/20 
                       text-white font-mono text-sm shadow-lg overflow-hidden"
          >
            <div className="text-lg mb-2">{r.stars}</div>
            <p className="line-clamp-2">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
