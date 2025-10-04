import { ReactNode } from "react";

interface GlassHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function GlassHeader({ children, className = "" }: GlassHeaderProps) {
  return (
    <h1
      className={`z-10 text-2xl font-bold font-mono px-6 py-3 rounded-xl 
                  bg-white/10 backdrop-blur-md drop-shadow-lg border border-white/20 ${className}`}
    >
      {children}
    </h1>
  );
}