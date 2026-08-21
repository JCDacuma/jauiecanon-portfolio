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

const RAISED_SM =
  "shadow-[3px_3px_8px_rgba(168,162,158,0.35),-3px_-3px_8px_rgba(255,255,255,0.75)] " +
  "dark:shadow-[3px_3px_10px_rgba(0,0,0,0.45),-3px_-3px_10px_rgba(255,255,255,0.02)]";
const RAISED_SM_HOVER =
  "group-hover:shadow-[1.5px_1.5px_4px_rgba(168,162,158,0.3),-1.5px_-1.5px_4px_rgba(255,255,255,0.75)] " +
  "dark:group-hover:shadow-[1.5px_1.5px_5px_rgba(0,0,0,0.45),-1.5px_-1.5px_5px_rgba(255,255,255,0.02)]";
const INSET_XS =
  "shadow-[inset_1.5px_1.5px_4px_rgba(168,162,158,0.3),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.75)] " +
  "dark:shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.45),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.02)]";

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
        group relative flex items-start gap-5 py-7 sm:py-8 px-2 -mx-2 rounded-2xl
        border-t border-stone-200 dark:border-stone-700
        transition-[opacity,transform,color,background-color,border-color] duration-700 ease-out will-change-transform
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div
        className={`
          flex h-11 w-11 shrink-0 items-center justify-center rounded-full
          bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300
          transition-[box-shadow,color] duration-300
          ${RAISED_SM} ${RAISED_SM_HOVER}
          group-hover:text-emerald-700 dark:group-hover:text-emerald-400
        `}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 tracking-tight transition-colors duration-300">
            {title}
          </h3>

          <span
            className={`
              hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full
              bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-500
              opacity-0 group-hover:opacity-100
              transition-[opacity,box-shadow,color] duration-300
              ${INSET_XS} group-hover:text-emerald-700 dark:group-hover:text-emerald-400
            `}
          >
            <ArrowUpRight size={14} strokeWidth={2} />
          </span>
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
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-800 dark:text-emerald-400 uppercase mb-2 transition-colors duration-300">
              What I do
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
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
