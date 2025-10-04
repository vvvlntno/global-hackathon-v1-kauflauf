import { ReactNode } from "react";
import { glassStyles } from "../styles/glassStyles";

interface GlassHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function GlassHeader({ children, className = "" }: GlassHeaderProps) {
  return (
    <h1
      className={`z-10 text-2xl font-bold font-mono px-6 py-3 rounded-xl ${glassStyles} ${className}`}
    >
      {children}
    </h1>
  );
}
