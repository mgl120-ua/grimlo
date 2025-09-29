"use client";
import { motion } from "framer-motion";

const SHOW_SHARDS = true;

export default function GrimloHeroHeader() {
  return (
    <header
      id="home"
      className="relative isolate min-h-[92svh] w-full overflow-hidden bg-[#0c0e10] text-white"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 35%, rgba(132,118,255,0.14), transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(12,16,40,0.9), #0c0e10 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/noise.png')] opacity-25 mix-blend-overlay"
      />

      {/* SMALL TAG TOP-RIGHT */}
      <div className="absolute right-8 top-8 hidden md:block">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          Grimlo — Studio
        </span>
      </div>

      {/* INTRO COPY TOP-LEFT (como la referencia) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="absolute left-8 top-20 max-w-xs text-sm text-white/75 sm:left-14 md:top-28 md:text-base"
      >
        Creamos webs visuales que <span className="text-white/95">ganan</span> clientes para tu negocio.
      </motion.div>

      {/* STAR PARTICLES */}
      <Star x="22%" y="28%" size={18} delay={0.1} />
      <Star x="76%" y="40%" size={14} delay={0.6} />
      <Star x="36%" y="62%" size={12} delay={0.35} />

      {/* OPTIONAL SHARDS (muy sutiles) */}
      {SHOW_SHARDS && (
        <>
          <Shard x="31%" y="34%" r={18} />
          <Shard x="47%" y="46%" r={26} rotate={-18} />
          <Shard x="62%" y="38%" r={22} rotate={14} />
          <Shard x="54%" y="58%" r={18} rotate={8} />
        </>
      )}

      {/* CENTER WORDMARK - protagonista */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/grimlo-wordmark.svg"
          alt="grimlo"
          className="h-[110px] sm:h-[140px] md:h-[180px] lg:h-[210px] w-auto drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* SUBCOPY bajo el título (alineado derecha) */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        className="absolute right-8 top-[46%] max-w-xl text-right text-[15px] leading-relaxed text-white/75 sm:right-14 md:top-[44%] md:text-base"
      >
        Diseñamos webs que <span className="rounded bg-white/10 px-1">convierten</span> visitas en clientes.
      </motion.p>

      {/* CTA abajo-derecha con glow */}
      <motion.a
        href="https://calendar.app.google/H98RSgYA51uLaCiEA"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
        className="group absolute bottom-10 right-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 text-[15px] font-medium text-white backdrop-blur-md sm:right-14"
        style={{ boxShadow: "0 0 0 0 rgba(175,255,140,0.0)" }}
      >
        <span>Reserva una llamada</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="opacity-90 transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M13.5 4.5h5.25v5.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M19 5 9.75 14.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M6 6.75h7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        {/* Glow tipo “neón” */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-80 blur-[18px] transition group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(55% 70% at 50% 50%, rgba(186,255,130,0.35), rgba(115,255,188,0.24) 50%, transparent 75%)",
          }}
        />
      </motion.a>

      {/* FOOTNOTE abajo-izquierda */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
        className="absolute bottom-10 left-8 max-w-xl pr-10 text-[15px] text-white/80 sm:left-14"
      >
        Hagamos que tu audiencia <span className="rounded bg-white/10 px-1">se enganche</span>. <br />
        Conócenos mejor — agenda una sesión gratuita.
      </motion.div>
    </header>
  );
}

/* ---------- detalles visuales ---------- */

function Star({ x, y, size = 16, delay = 0 }: { x: string; y: string; size?: number; delay?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="absolute opacity-70"
      style={{
        left: x,
        top: y,
        animation: `starFloat 5.5s ease-in-out ${delay}s infinite`,
        filter: "drop-shadow(0 6px 18px rgba(255,255,255,0.12))",
      }}
    >
      <defs>
        <linearGradient id={`g-${x}-${y}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="#ededed" />
          <stop offset="100%" stopColor="#cfcfcf" />
        </linearGradient>
      </defs>
      <path
        d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
        fill={`url(#g-${x}-${y})`}
      />
      <style jsx>{`
        @keyframes starFloat {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.85;
          }
          50% {
            transform: translateY(-8px) rotate(6deg) scale(1.03);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.85;
          }
        }
      `}</style>
    </svg>
  );
}

function Shard({
  x,
  y,
  r = 22,
  rotate = 0,
}: {
  x: string;
  y: string;
  r?: number;
  rotate?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 60"
      className="absolute opacity-[0.22]"
      style={{
        left: x,
        top: y,
        width: r * 3,
        height: r * 1.8,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.45))",
      }}
    >
      <defs>
        <linearGradient id={`m-${x}-${y}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#bfc2c7" />
          <stop offset="80%" stopColor="#8d8f94" />
          <stop offset="100%" stopColor="#2b2d33" />
        </linearGradient>
        <mask id={`mask-${x}-${y}`}>
          <rect x="0" y="0" width="100" height="60" fill="white" />
          <circle cx="12" cy="8" r="7" fill="black" />
        </mask>
      </defs>
      <path
        d="M6 6 L74 4 Q92 8 96 20 L94 44 Q84 56 66 58 L10 54 Q2 44 4 22 Z"
        fill={`url(#m-${x}-${y})`}
        mask={`url(#mask-${x}-${y})`}
      />
      <rect x="10" y="10" width="80" height="40" fill="url(#m)" opacity="0" />
    </svg>
  );
}
