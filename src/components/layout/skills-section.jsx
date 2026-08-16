import React, { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database } from "lucide-react";
import LogoLoop from "@/components/utils/logoLoops.jsx";

const CATEGORY_STYLES = {
  Frontend: {
    icon: Code2,
    chipBg: "bg-violet-500/10 dark:bg-violet-400/10",
    chipText: "text-violet-600 dark:text-violet-400",
    topBar: "from-violet-500 to-violet-400",
    segmentActive: "bg-violet-500 dark:bg-violet-400",
    tagBg: "bg-violet-50 dark:bg-violet-400/10",
    tagText: "text-violet-700 dark:text-violet-300",
    ring: "hover:ring-violet-500/20",
  },
  Backend: {
    icon: Server,
    chipBg: "bg-amber-500/10 dark:bg-amber-400/10",
    chipText: "text-amber-600 dark:text-amber-400",
    topBar: "from-amber-500 to-amber-400",
    segmentActive: "bg-amber-500 dark:bg-amber-400",
    tagBg: "bg-amber-50 dark:bg-amber-400/10",
    tagText: "text-amber-700 dark:text-amber-300",
    ring: "hover:ring-amber-500/20",
  },
  Database: {
    icon: Database,
    chipBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
    chipText: "text-cyan-600 dark:text-cyan-400",
    topBar: "from-cyan-500 to-cyan-400",
    segmentActive: "bg-cyan-500 dark:bg-cyan-400",
    tagBg: "bg-cyan-50 dark:bg-cyan-400/10",
    tagText: "text-cyan-700 dark:text-cyan-300",
    ring: "hover:ring-cyan-500/20",
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

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
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
      className={`group/card relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] p-5 sm:p-7.5 shadow-[0_1px_3px_rgba(20,18,15,0.06)] dark:shadow-none ring-1 ring-stone-900/[0.06] dark:ring-white/[0.06] ${accent.ring} hover:shadow-xl hover:shadow-stone-900/[0.08] dark:hover:bg-white/[0.05] transition-[transform,box-shadow,background-color] duration-300 will-change-transform`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center justify-center w-9 h-9 rounded-xl ${accent.chipBg} ${accent.chipText} transition-transform duration-300 group-hover/card:scale-105`}
          >
            <Icon size={17} strokeWidth={2} />
          </span>
          <h3 className="text-sm font-semibold tracking-wide text-stone-900 dark:text-white uppercase">
            {category.title}
          </h3>
        </div>
        <span
          className={`font-mono text-[10px] font-semibold tracking-wider ${accent.tagBg} ${accent.tagText} px-2 py-1 rounded-md tabular-nums`}
        >
          {String(category.skills.length).padStart(2, "0")} SKILLS
        </span>
      </div>

      <ul className="space-y-4">
        {category.skills.map((skill) => {
          const filled = getFilledSegments(skill.startYear);
          return (
            <motion.li
              key={skill.name}
              variants={skillItemVariants}
              className="group/skill"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-6.5 h-6.5 rounded-md bg-stone-100 dark:bg-white/5 shrink-0 group-hover/skill:bg-stone-100 dark:group-hover/skill:bg-white/10 transition-colors duration-200">
                  <img
                    src={skill.logo}
                    alt=""
                    loading="lazy"
                    className="w-3.5 h-3.5 opacity-80 group-hover/skill:opacity-100 group-hover/skill:scale-110 transition-all duration-200"
                  />
                </span>
                <span className="flex-1 text-sm font-medium text-stone-800 dark:text-stone-100 truncate">
                  {skill.name}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ring-2 ${
                    skill.status === "learning"
                      ? "bg-amber-400 ring-amber-100 dark:ring-amber-400/20"
                      : "bg-emerald-500 dark:bg-emerald-400 ring-emerald-100 dark:ring-emerald-400/20"
                  }`}
                />
                <span className="font-mono text-[11px] font-semibold text-stone-700 dark:text-stone-400 tabular-nums shrink-0 min-w-[3ch] text-right">
                  {getYearsLabel(skill.startYear)}
                </span>
              </div>

              <div className="border-[0.05px] border-dashed" />
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
});

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center mt-15 pb-5 pt-10 overflow-hidden bg-stone-50 dark:bg-stone-800 transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-violet-400/10 dark:bg-emerald-500/25 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-cyan-300/10 dark:bg-teal-400/15 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 dark:from-emerald-950 dark:via-transparent dark:to-emerald-950/60" />
      </div>
      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-12 pt-5 sm:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-4">
            What I bring to the table
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            Skills That <span className="text-emerald-400 ">Fuel</span> My
            Passion
          </h2>
          <div className="mt-5 hidden lg:flex w-16 h-1 mx-auto mr-[47.55%] rounded-full bg-emerald-400" />
          <div className="relative mt-10 py-4 bg-stone-50 dark:bg-stone-800 overflow-hidden fade-x transition-colors duration-300">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-stone-100 dark:from-stone-900 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-stone-100 dark:from-stone-900 to-transparent z-10" />
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

        <div className="flex items-center justify-center gap-3 mb-8 text-xs sm:text-sm text-stone-600 dark:text-stone-200">
          <span className="flex items-center gap-2 rounded-full border border-stone-900/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            In Use
          </span>
          <span className="flex items-center gap-2 rounded-full border border-stone-900/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Learning
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
