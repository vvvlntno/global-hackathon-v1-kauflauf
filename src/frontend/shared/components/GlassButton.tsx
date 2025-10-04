import Link from "next/link";
import { ReactNode } from "react";
import { glassStyles } from "../styles/glassStyles";

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function GlassButton({ href, onClick, children, className = "" }: GlassButtonProps) {
  const baseStyle = `
    inline-flex items-center gap-2 font-mono px-6 py-3 rounded-xl text-white 
    hover:bg-white/20 transition transform hover:scale-105
    ${glassStyles} ${className}
  `;


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
