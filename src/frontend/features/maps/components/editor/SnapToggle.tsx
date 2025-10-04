"use client";

import { glassStyles } from "@/shared/styles/glassStyles";
import { useSnap } from "./snapContext";


export default function SnapToggle() {
  const { snapEnabled, toggleSnap } = useSnap();

  return (
    <div className="absolute bottom-6 right-6">
      <button
        onClick={toggleSnap}
        className={`px-4 py-2 rounded-lg ${glassStyles}`}
      >
        {snapEnabled ? "Snapping: ON" : "Snapping: OFF"}
      </button>
    </div>
  );
}
