"use client";
import { useEffect, useRef, useState } from "react";
import { Code2, PenTool, Server, Wrench, ArrowUpRight } from "lucide-react";
const defaultServices = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "End-to-end websites and web apps built with React and Next.js - fast, responsive, and easy to maintain.",
  },
  {
    icon: PenTool,
    title: "UI/UX Implementation",
    description:
      "Turning designs into pixel-accurate, accessible interfaces with thoughtful motion and interaction detail.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Databases, REST/GraphQL APIs, and server logic built to be reliable, secure, and simple to scale.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Optimization",
    description:
      "Performance audits, refactors, and ongoing support to keep an existing site fast and healthy.",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}
function ServiceRow({ service, index }) {
  const { icon: Icon, title, description } = service;
  const [ref, inView] = useInView(0.25);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
      className={`
        relative flex items-start gap-5 py-7 sm:py-8
        border-t border-stone-200 dark:border-stone-700
        transition-[opacity,transform,color,background-color,border-color] duration-700 ease-out will-change-transform
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 transition-colors duration-300">
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 tracking-tight transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="mt-2 text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-md transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
export default function ServicesSection({ services = defaultServices }) {
  const [introRef, introInView] = useInView(0.3);
  return (
    <section
      id={"services"}
      className="relative w-full text-stone-900 dark:text-stone-50 bg-stone-50 dark:bg-stone-800 font-sans transition-colors duration-300"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-10 lg:gap-16">
          <div
            ref={introRef}
            className={`
              lg:sticky lg:top-25 xl:top-42 lg:self-start
              transition-[opacity,transform] duration-700 ease-out will-change-transform
              ${
                introInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
            `}
          >
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-emerald-900 dark:text-emerald-400 transition-colors duration-300">
              What I do
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
              Services
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs transition-colors duration-300">
              A focused set of skills I bring to every project, from the first
              line of code to the site staying fast in production.
            </p>
          </div>
          <div className="border-b border-stone-200 dark:border-stone-700 overflow-hidden transition-colors duration-300">
            {services.map((service, index) => (
              <ServiceRow key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
