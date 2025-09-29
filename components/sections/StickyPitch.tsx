"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/scroll";

export default function StickyPitch() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.8,
      },
    });
    tl.fromTo(el.querySelector(".line1"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(el.querySelector(".line2"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6");
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={ref} className="min-h-[120svh] grid place-items-center">
      <div className="text-center space-y-4">
        <h2 className="line1 text-4xl md:text-6xl font-semibold">Estrategia, diseño y código</h2>
        <p className="line2 text-lg text-muted-foreground">Un proceso claro enfocado a negocio.</p>
      </div>
    </section>
  );
}
