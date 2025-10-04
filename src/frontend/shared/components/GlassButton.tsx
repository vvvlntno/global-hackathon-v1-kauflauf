import Link from "next/link";
import { ReactNode } from "react";

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function GlassButton({ href, onClick, children, className = "" }: GlassButtonProps) {
  const baseStyle = `inline-block font-mono px-6 py-3 rounded-xl 
                     bg-white/10 backdrop-blur-md drop-shadow-lg border border-white/20 
                     text-white hover:bg-white/20 transition transform hover:scale-105 ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle}>
      {children}
    </button>
  );
}
