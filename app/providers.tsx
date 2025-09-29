"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis"; // "lenis" export por defecto; algunos builds usan @studio-freight
// Si instalaste "lenis" del paquete oficial:
import LenisOfficial from "lenis";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new LenisOfficial({ lerp: 0.1, wheelMultiplier: 1.0 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
