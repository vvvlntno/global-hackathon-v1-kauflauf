"use client";

import { createContext, useContext, useState } from "react";

const SnapContext = createContext<{
  snapEnabled: boolean;
  toggleSnap: () => void;
}>({ snapEnabled: true, toggleSnap: () => {} });

export function SnapProvider({ children }: { children: React.ReactNode }) {
  const [snapEnabled, setSnapEnabled] = useState(true);
  const toggleSnap = () => setSnapEnabled((s) => !s);

  return (
    <SnapContext.Provider value={{ snapEnabled, toggleSnap }}>
      {children}
    </SnapContext.Provider>
  );
}

export function useSnap() {
  return useContext(SnapContext);
}
