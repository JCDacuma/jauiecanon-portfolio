"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const defaultProjects = [
  {
    image: "/projects/inventory_pos_img/inv_pos_img.svg",
    title: "Point of Sale with Inventory Management System",
    description:
      "Streamlines retail operations by combining sales processing, real-time stock tracking, and actionable analytics into a single, seamless platform.",
    tags: ["React", "TypeScript", "Tailwind", "Laravel", "MySQL", "Redis"],
    liveUrl: "#",
    githubUrl: "",
  },
  {
    image: "/projects/logistics_img/main_logistics.svg",
    title: "Order and Dispatch Management System",
    description:
      "Streamlines logistics operations by combining order management, driver dispatch, and real-time tracking into a single, seamless platform.",
    tags: ["React", "TypeScript", "Tailwind", "Laravel", "MySQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    image: "/projects/pmms_img/main_pmms.svg",
    title: "Preventive Maintenance Management System for IT Equipment",
    description:
      "A web application that streamlines the process of managing preventive maintenance schedules, tasks, and equipment history.",
    tags: ["Css3", "Html5", "JavaScript", "Bootstrap5", "PHP", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    image: "/projects/project-4.jpg",
    title: "Project Four",
    description:
      "A short, clear line about what this project does and the problem it solves.",
    tags: ["React Native", "Expo"],
    liveUrl: "#",
    githubUrl: "#",
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

function ProjectCard({ project, index }) {
  const { image, title, description, tags, liveUrl, githubUrl } = project;
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${(index % 4) * 100}ms` : "0ms" }}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900
        transition-[opacity,transform,border-color,box-shadow,background-color] duration-700 ease-out will-change-transform
        hover:border-emerald-700/50 dark:hover:border-emerald-600/50 hover:shadow-lg hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base  font-semibold text-stone-900 dark:text-stone-50 tracking-tight">
            {title}
          </h3>
          <a
            href={liveUrl}
            aria-label={`Open ${title}`}
            className="shrink-0 rounded-full border border-stone-200 dark:border-stone-700 p-2 text-stone-500 dark:text-stone-400 transition-colors duration-300 hover:border-emerald-700 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-500"
          >
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </a>
        </div>
        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-2.5 py-1 text-xs text-stone-600 dark:text-stone-300"
            >
              {tag}
            </span>
          ))}
        </div>
        {githubUrl && (
          <a
            href={githubUrl}
            className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300 hover:text-emerald-700 dark:hover:text-emerald-500"
          >
            <Github size={15} strokeWidth={1.75} />
            Details
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectShowcase({ projects = defaultProjects }) {
  const [introRef, introInView] = useInView(0.3);
  return (
    <section
      id="projects"
      className="relative flex flex-col items-center pt-15 pb-24 overflow-hidden bg-stone-50 dark:bg-stone-800 transition-colors duration-300"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div
          ref={introRef}
          className={`
            flex flex-col items-center text-center
            transition-[opacity,transform] duration-700 ease-out will-change-transform
            ${introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-emerald-900 dark:text-emerald-400">
            What I&apos;ve built
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Projects
          </h2>
          <p className="mt-4 max-w-md text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed">
            A selection of things I&apos;ve designed and built, from full
            products to small experiments.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
