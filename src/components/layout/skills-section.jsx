import React, { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database } from "lucide-react";
import LogoLoop from "@/components/utils/logoLoops.jsx";

/* ------------------------------------------------------------------ */
/*  Neumorphic shadow tokens (shared design language)                 */
/* ------------------------------------------------------------------ */
const RAISED =
  "shadow-[6px_6px_14px_rgba(168,162,158,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[6px_6px_16px_rgba(0,0,0,0.55),-6px_-6px_16px_rgba(255,255,255,0.025)]";
const RAISED_HOVER =
  "hover:shadow-[3px_3px_8px_rgba(168,162,158,0.35),-3px_-3px_8px_rgba(255,255,255,0.85)] " +
  "dark:hover:shadow-[3px_3px_10px_rgba(0,0,0,0.55),-3px_-3px_10px_rgba(255,255,255,0.025)]";
const INSET =
  "shadow-[inset_3px_3px_7px_rgba(168,162,158,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.55),inset_-3px_-3px_7px_rgba(255,255,255,0.025)]";
const INSET_SM =
  "shadow-[inset_2px_2px_5px_rgba(168,162,158,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.55),inset_-2px_-2px_5px_rgba(255,255,255,0.025)]";

const CATEGORY_STYLES = {
  Frontend: {
    icon: Code2,
    chipText: "text-violet-600 dark:text-violet-400",
    tagText: "text-violet-700 dark:text-violet-300",
    dotIdle: "bg-violet-500 dark:bg-violet-400",
  },
  Backend: {
    icon: Server,
    chipText: "text-amber-600 dark:text-amber-400",
    tagText: "text-amber-700 dark:text-amber-300",
    dotIdle: "bg-amber-500 dark:bg-amber-400",
  },
  Database: {
    icon: Database,
    chipText: "text-cyan-600 dark:text-cyan-400",
    tagText: "text-cyan-700 dark:text-cyan-300",
    dotIdle: "bg-cyan-500 dark:bg-cyan-400",
  },
};

const MAX_YEARS = 3;
const TOTAL_SEGMENTS = 10;
const CURRENT_YEAR = new Date().getFullYear();

function getYearsLabel(startYear) {
  const years = Math.max(CURRENT_YEAR - startYear, 0);
  if (years === 0) return "This Year";
  if (years === 1) return "1 yr";
  return `${years} yrs`;
}

function getProficiency(startYear) {
  const years = Math.max(CURRENT_YEAR - startYear, 0.3);
  return Math.min((years / MAX_YEARS) * 100, 100);
}

function getFilledSegments(startYear) {
  return Math.max(
    1,
    Math.round((getProficiency(startYear) / 100) * TOTAL_SEGMENTS),
  );
}

// prettier-ignore
const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", startYear: 2024, status: "in-use" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", startYear: 2024, status: "in-use" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", startYear: 2024, status: "in-use" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", startYear: 2025, status: "in-use" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", startYear: 2024, status: "in-use" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", startYear: 2025, status: "in-use" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", startYear: 2025, status: "in-use" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", startYear: 2026, status: "learning" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", startYear: 2024, status: "in-use" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", startYear: 2024, status: "in-use" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", startYear: 2026, status: "learning" },
      { name: "Django", logo: "/logo/django.svg", startYear: 2026, status: "learning" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", startYear: 2024, status: "in-use" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", startYear: 2026, status: "learning" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", startYear: 2025, status: "in-use" },
    ],
  },
];

const skillsLogos = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    alt: "php",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    alt: "Laravel",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "Typescript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    alt: "MySQL",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "Typescript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    alt: "Redis",
  },
];

const EASE = [0.16, 1, 0.3, 1];

const headerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: EASE,
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const SkillCard = memo(function SkillCard({ category }) {
  const accent = CATEGORY_STYLES[category.title] ?? CATEGORY_STYLES.Frontend;
  const Icon = accent.icon;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -4 }}
      viewport={{ once: false, amount: 0.3 }}
      className={`group/card relative overflow-hidden rounded-[26px] bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 h-full flex flex-col transition-[transform,background-color,box-shadow] duration-500 will-change-transform ${RAISED} ${RAISED_HOVER}`}
    >
      <div
        className={`rounded-2xl bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 flex-1 flex flex-col transition-colors duration-300 ${INSET}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span
              className={`flex items-center justify-center w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 ${accent.chipText} transition-[transform,box-shadow] duration-300 group-hover/card:scale-105 ${INSET_SM}`}
            >
              <Icon size={17} strokeWidth={2} />
            </span>
            <h3 className="text-sm font-semibold tracking-wide text-stone-800 dark:text-stone-100 uppercase transition-colors duration-300">
              {category.title}
            </h3>
          </div>
        </div>

        <ul className="space-y-4">
          {category.skills.map((skill) => (
            <motion.li
              key={skill.name}
              variants={skillItemVariants}
              className="group/skill"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`flex items-center justify-center w-6.5 h-6.5 rounded-md bg-stone-100 dark:bg-stone-800 shrink-0 transition-colors duration-200 ${INSET_SM}`}
                >
                  <img
                    src={skill.logo}
                    alt=""
                    loading="lazy"
                    className="w-3.5 h-3.5 opacity-80 group-hover/skill:opacity-100 group-hover/skill:scale-110 transition-all duration-200"
                  />
                </span>
                <span className="flex-1 text-sm font-medium text-stone-800 dark:text-stone-100 truncate transition-colors duration-300">
                  {skill.name}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ring-2 transition-[background-color,box-shadow] duration-300 ${
                    skill.status === "learning"
                      ? "bg-amber-400 ring-amber-100 dark:ring-amber-400/20"
                      : "bg-emerald-500 dark:bg-emerald-400 ring-emerald-100 dark:ring-emerald-400/20"
                  }`}
                />
                <span className="font-mono text-[11px] font-semibold text-stone-600 dark:text-stone-400 tabular-nums shrink-0 min-w-[3ch] text-right transition-colors duration-300">
                  {getYearsLabel(skill.startYear)}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center mt-5 pb-5 pt-10 overflow-hidden bg-stone-50 dark:bg-stone-900 transition-colors duration-500"
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-12 pt-5 sm:mb-16 will-change-transform"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-800 dark:text-emerald-400 uppercase mb-2 transition-colors duration-300">
            What I bring to the table
          </span>
          <h2 className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
            Skills That{" "}
            <span className="text-emerald-500 dark:text-emerald-400">Fuel</span>{" "}
            My Passion
          </h2>
          <div className="mt-5 hidden lg:flex w-16 h-1.5 mx-auto mr-[47.55%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300" />

          <div className="relative mt-10 py-4 rounded-2xl bg-stone-50 dark:bg-stone-900 overflow-hidden transition-colors duration-300">
            <LogoLoop
              logos={skillsLogos}
              speed={100}
              direction="left"
              logoHeight={40}
              gap={45}
              hoverSpeed={0}
              scaleOnHover
              ariaLabel="Technology partners"
            />
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mb-8 text-xs sm:text-sm text-stone-600 dark:text-stone-300 transition-colors duration-300">
          <span
            className={`flex items-center gap-2 rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1.5 transition-colors duration-300 ${INSET_SM}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 transition-colors duration-300" />
            In Use
          </span>
          <span
            className={`flex items-center gap-2 rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1.5 transition-colors duration-300 ${INSET_SM}`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Learning
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
