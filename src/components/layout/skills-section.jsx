import React from "react";
import { motion } from "framer-motion";
import LogoLoop from "@/components/utils/logoLoops.jsx";

/**
 * Each skill takes a `startYear` instead of a manual "level" —
 * years of experience are derived automatically from it.
 * `status`: "in-use" | "learning"
 */
const CURRENT_YEAR = new Date().getFullYear();

function getYearsLabel(startYear) {
  const years = Math.max(CURRENT_YEAR - startYear, 0);
  if (years === 0) return "New";
  if (years === 1) return "1 yr";
  return `${years} yrs`;
}

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        {
          name: "JavaScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "HTML5",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          startYear: 2025,
          status: "in-use",
        },
        {
          name: "CSS3",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
          startYear: 2025,
          status: "in-use",
        },
        {
          name: "Bootstrap",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "Material UI",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
          startYear: 2025,
          status: "in-use",
        },
        {
          name: "TypeScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          startYear: 2025,
          status: "in-use",
        },
        {
          name: "Next.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
          startYear: 2026,
          status: "learning",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "PHP",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "Laravel",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "Python",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          startYear: 2026,
          status: "learning",
        },
        {
          name: "Django",
          logo: "/logo/django.svg",
          startYear: 2026,
          status: "learning",
        },
        {
          name: "REST API",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "JWT",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg",
          startYear: 2026,
          status: "learning",
        },
      ],
    },
    {
      title: "Database",
      skills: [
        {
          name: "MySQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
          startYear: 2024,
          status: "in-use",
        },
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          startYear: 2026,
          status: "learning",
        },
      ],
    },
  ];

  const skillsLogos = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      alt: "Tailwind CSS",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      alt: "Laravel",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      alt: "Docker",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      alt: "MySQL",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center mt-15 pt-10 overflow-hidden bg-stone-700"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-emerald-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-teal-400/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-emerald-700/30 rounded-full blur-[110px]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-emerald-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/60" />
      </div>

      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-5 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-400 uppercase mb-2">
            What I bring to the table
          </span>
          <h2 className="text-3xl font-bold text-white">
            Skills That <span className="text-emerald-400">Fuel</span> My
            Passion
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-emerald-400" />

          <div className="relative mt-10 py-3 bg-stone-700 overflow-auto fade-x">
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

        {/* Status legend */}
        <div className="flex items-center justify-center gap-6 mb-8 text-xs sm:text-sm text-stone-200">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            In Use
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Learning
          </span>
        </div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-16"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  {category.title}
                </h3>
                <span className="text-[11px] text-stone-400">
                  {category.skills.length} skill
                  {category.skills.length !== 1 ? "s" : ""}
                </span>
              </div>

              <ul className="divide-y divide-white/5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 py-2.5 group"
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-4 h-4 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="flex-1 text-sm text-stone-100 truncate">
                      {skill.name}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        skill.status === "learning"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                    />
                    <span className="text-[11px] text-stone-200 tabular-nums shrink-0 min-w-[3ch] text-right">
                      {getYearsLabel(skill.startYear)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
