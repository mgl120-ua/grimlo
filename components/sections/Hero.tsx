"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[90svh] grid place-items-center px-6">
      <div className="max-w-5xl text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-semibold tracking-tight"
        >
          Sitios web con <span className="italic">impacto</span> y resultados.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-lg text-muted-foreground"
        >
          Diseño, desarrollo y motion cuidadosamente orquestado.
        </motion.p>
        <motion.a
          href="/contact"
          className="inline-block rounded-full border px-6 py-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Hablemos →
        </motion.a>
      </div>
    </section>
  );
}
