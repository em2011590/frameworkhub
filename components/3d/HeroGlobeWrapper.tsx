"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("./HeroGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-card/50 rounded-3xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Loading 3D Globe...</span>
    </div>
  ),
});

export function HeroGlobeWrapper() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-surface-card/50 rounded-3xl animate-pulse" />}>
      <HeroGlobe />
    </Suspense>
  );
}
