"use client";

import { ReactNode } from "react";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function GlassModal({ isOpen, onClose, children }: GlassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Hintergrund mit Blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal-Content */}
      <div
        className="relative z-10 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg w-[500px] max-w-[90%]"
      >
        {children}
      </div>
    </div>
  );
}
