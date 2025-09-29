export default function Process() {
  const steps = [
    { w: "Semana 1", t: "Discovery", d: "Kickoff, objetivos, arquitectura." },
    { w: "Semana 2", t: "UX", d: "Wireframes y flujo." },
    { w: "Semana 3", t: "UI", d: "Moodboard, tipografía, componentes." },
    { w: "Semana 4", t: "Build", d: "Next.js, CMS, integraciones." },
    { w: "Semana 5", t: "Motion", d: "GSAP/Framer, pulido micro-UX." },
    { w: "Semana 6", t: "Launch", d: "QA, analítica, SEO, despliegue." },
  ];
  return (
    <section className="px-6 py-20">
      <ol className="grid md:grid-cols-3 gap-6">
        {steps.map(s => (
          <li key={s.t} className="rounded-2xl border p-6">
            <div className="text-sm text-muted-foreground">{s.w}</div>
            <div className="text-xl font-semibold">{s.t}</div>
            <p className="mt-2 text-sm">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
