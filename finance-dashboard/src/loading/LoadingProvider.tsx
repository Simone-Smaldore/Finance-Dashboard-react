import { useState } from "react";
import type { ReactNode } from "react";
import { LoadingContext } from "./LoadingContext";
import { setGlobalLoadingHandler } from "../services/api";
import FullscreenSpinner from "../components/FullScreenSpinner";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  // collega il "setLoading" agli interceptors
  setGlobalLoadingHandler(setLoading);

  return (
    <LoadingContext.Provider value={loading}>
      {children}
      {loading && <FullscreenSpinner />}
    </LoadingContext.Provider>
  );
}
