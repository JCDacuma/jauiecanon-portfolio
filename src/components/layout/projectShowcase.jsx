import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const defaultProjects = [
  {
    image: "/projects/inventory_pos_img/inv_pos_img.svg",
    title: "Point of Sale with Inventory Management System",
    description:
      "Streamlines retail operations by combining sales processing, real-time stock tracking, and actionable analytics into a single, seamless platform.",
    tags: ["React", "TypeScript", "Tailwind", "Laravel", "MySQL", "Redis"],
    liveUrl: "/inventorypos-project",
  },
  {
    image: "/projects/logistics_img/main_logistics.svg",
    title: "Order Fulfillment and Delivery Management System",
    description:
      "Streamlines logistics operations by combining order management, driver dispatch, and real-time tracking into a single, seamless platform.",
    tags: ["React", "TypeScript", "Tailwind", "Laravel", "MySQL", "Redis"],
    liveUrl: "/orderfulfillment-project",
  },
  {
    image: "/projects/pmms_img/main_pmms.svg",
    title: "Preventive Maintenance Management System (PMMS)",
    description:
      "A web application that streamlines the process of managing preventive maintenance schedules, tasks, and equipment history.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap5", "Css3", "Html5"],
    liveUrl: "/projects/pmms",
  },
  {
    image: "/projects/project-4.jpg",
    title:
      "DevAidKit (Web-Based All-in-One Developer Toolkit & Productivity Platform)",
    description:
      "a browser-based developer utility suite crafted to simplify everyday coding tasks. Access code formatters, HTTP request builders, database helpers, security tools, and CSS generators instantly without leaving your browser.",
    tags: ["NextJs", "TypeScript", "TailwindCSS"],
    liveUrl: "/projects/project-four",
  },
];

/* ------------------------------------------------------------------ */
/*  Neumorphic shadow tokens (shared design language)                 */
/* ------------------------------------------------------------------ */
const RAISED =
  "shadow-[6px_6px_14px_rgba(168,162,158,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[6px_6px_16px_rgba(0,0,0,0.55),-6px_-6px_16px_rgba(255,255,255,0.025)]";
const RAISED_HOVER =
  "hover:shadow-[3px_3px_8px_rgba(168,162,158,0.35),-3px_-3px_8px_rgba(255,255,255,0.85)] " +
  "dark:hover:shadow-[3px_3px_10px_rgba(0,0,0,0.55),-3px_-3px_10px_rgba(255,255,255,0.025)]";
const RAISED_LOW =
  "shadow-[3px_3px_8px_rgba(168,162,158,0.3),-3px_-3px_8px_rgba(255,255,255,0.8)] " +
  "dark:shadow-[3px_3px_9px_rgba(0,0,0,0.5),-3px_-3px_9px_rgba(255,255,255,0.02)]";
const INSET =
  "shadow-[inset_3px_3px_7px_rgba(168,162,158,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.55),inset_-3px_-3px_7px_rgba(255,255,255,0.025)]";
const INSET_SM =
  "shadow-[inset_2px_2px_5px_rgba(168,162,158,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.55),inset_-2px_-2px_5px_rgba(255,255,255,0.025)]";

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
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    if (!liveUrl) return;
    navigate(liveUrl);
  }, [liveUrl, navigate]);

  const handleCardKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  return (
    <div
      ref={ref}
      role="link"
      tabIndex={0}
      aria-label={`View ${title}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      style={{ transitionDelay: inView ? `${(index % 4) * 90}ms` : "0ms" }}
      className={`
        group relative flex flex-col overflow-hidden rounded-[26px] cursor-pointer
        bg-stone-100 dark:bg-stone-800 p-2.5 sm:p-3
        transition-[opacity,transform,background-color,box-shadow] duration-500 ease-out will-change-transform
        hover:-translate-y-1
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
        focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-stone-800
        ${RAISED} ${RAISED_HOVER}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Image */}
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-200/60 dark:bg-stone-900/60 transition-colors duration-300 ${INSET}`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 tracking-tight leading-snug transition-colors duration-300">
            {title}
          </h3>
          <span
            aria-hidden="true"
            className={`shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 transition-all duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${INSET_SM}`}
          >
            <ArrowUpRight size={14} strokeWidth={2} />
          </span>
        </div>

        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed transition-colors duration-300">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`rounded-lg bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-600 dark:text-stone-300 transition-colors duration-300 ${INSET_SM}`}
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span
              className={`rounded-lg bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-400 dark:text-stone-500 transition-colors duration-300 ${INSET_SM}`}
            >
              +{tags.length - 4}
            </span>
          )}
        </div>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 mt-2 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-stone-400 dark:text-stone-500 transition-colors duration-300 hover:text-emerald-600 dark:hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
          >
            <Github size={14} strokeWidth={1.75} />
            Source
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectShowcase({ projects = defaultProjects }) {
  return (
    <section
      id="works"
      className="relative flex flex-col items-center pt-15 pb-24 overflow-hidden bg-stone-50 dark:bg-stone-800 transition-colors duration-500"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center will-change-transform"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.05,
            }}
            className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400 transition-colors duration-300"
          >
            What I&apos;ve built
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-4 max-w-md text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed transition-colors duration-300"
          >
            A selection of things I&apos;ve designed and built, from full
            products to small experiments.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
