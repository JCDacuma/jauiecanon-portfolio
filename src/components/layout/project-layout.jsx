import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const RAISED =
  "shadow-[6px_6px_14px_rgba(168,162,158,0.55),-6px_-6px_14px_rgba(255,255,255,0.85)] " +
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

export function SectionEyebrow({ children, className = "" }) {
  return (
    <span
      className={`text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400 transition-colors duration-300 ${className}`}
    >
      {children}
    </span>
  );
}

export function NeumorphicFrame({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] bg-stone-100 dark:bg-stone-800 p-2.5 sm:p-3 transition-[background-color,box-shadow] duration-500 ${RAISED} ${className}`}
    >
      {children}
    </div>
  );
}

export function StackPreviewChip({ icon: Icon, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-stone-100 dark:bg-stone-800 pl-1.5 pr-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 transition-[background-color,box-shadow] duration-300 ${RAISED}`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 transition-colors duration-300 ${INSET_SM}`}
      >
        <Icon size={11} strokeWidth={2.25} />
      </span>
      {label}
    </span>
  );
}
export function TechGroup({ icon: Icon, label, items, className = "" }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl p-4 sm:p-5 transition-[background-color,box-shadow] duration-500 ${INSET} ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-3.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 transition-colors duration-300 ${RAISED}`}
        >
          <Icon size={15} strokeWidth={2} />
        </span>
        <h3 className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-stone-700 dark:text-stone-300 transition-colors duration-300">
          {label}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2 content-start">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg bg-stone-100 dark:bg-stone-800 px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 transition-colors duration-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeatureCard({ feature, index }) {
  const { image, title, description } = feature;
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-6 sm:gap-8 lg:gap-14 items-center ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:w-1/2 shrink-0"
      >
        <div
          className={`group rounded-[24px] bg-stone-100 dark:bg-stone-800 p-2.5 sm:p-3 transition-[background-color,box-shadow] duration-500 ${RAISED}`}
        >
          <div
            className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-200/60 dark:bg-stone-900/60 transition-colors duration-300 ${INSET}`}
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
        className="w-full lg:w-1/2 text-center lg:text-left"
      >
        <div className="mx-auto lg:mx-0 mb-3 h-1 w-10 rounded-full bg-emerald-600 dark:bg-emerald-500 transition-colors duration-300" />
        <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 tracking-tight transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-md mx-auto lg:mx-0 transition-colors duration-300">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectLayout({ project }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const stackGroups = Object.values(project.techStack);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <section
      id={project.sectionId}
      className="relative min-h-screen w-full overflow-x-hidden bg-stone-100 dark:bg-stone-900 pt-28 pb-24 px-5.5 sm:px-6 lg:px-10 xl:px-16 transition-colors duration-500"
    >
      <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
        <motion.button
          type="button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{ x: -3 }}
          className={`inline-flex items-center gap-2 rounded-full bg-stone-100 dark:bg-stone-800 px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300 transition-[background-color,box-shadow,color] duration-300 mb-10 sm:mb-14 ${RAISED} ${RAISED_HOVER} hover:text-emerald-700 dark:hover:text-emerald-400`}
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Back to Projects
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1"
          >
            <NeumorphicFrame>
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-3xl bg-stone-200/60 dark:bg-stone-900/60">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </NeumorphicFrame>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="order-2 flex flex-col"
          >
            <div className="flex items-center gap-2">
              <SectionEyebrow>{project.eyebrow}</SectionEyebrow>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-snug transition-colors duration-300">
              {project.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full bg-stone-100 dark:bg-stone-800 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-[background-color,box-shadow] duration-300 ${RAISED} ${RAISED_HOVER}`}
              >
                <ExternalLink size={15} strokeWidth={2} />
                Live Demo
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full bg-stone-100 dark:bg-stone-800 px-4 py-2.5 text-sm font-semibold text-stone-600 dark:text-stone-300 transition-[background-color,box-shadow] duration-300 ${RAISED} ${RAISED_HOVER}`}
                >
                  <Github size={15} strokeWidth={2} />
                  Source
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-7 sm:mb-9"
          >
            <SectionEyebrow>Built with</SectionEyebrow>
            <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
              Tech Stack
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className={`rounded-3xl bg-stone-100 dark:bg-stone-800 p-3 sm:p-4 transition-[background-color,box-shadow] duration-500 ${!isMobile && RAISED}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3  gap-2.5 sm:gap-3 auto-rows-fr">
              {stackGroups.map((group) => (
                <TechGroup
                  key={group.label}
                  icon={group.icon}
                  label={group.label}
                  items={group.items}
                  className={
                    group.label === "Frontend"
                      ? "col-span-1 sm:col-span-1 lg:col-span-2"
                      : ""
                  }
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-24 sm:mt-28 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-7xl mx-auto mb-10 sm:mb-14"
          >
            <SectionEyebrow>How it&apos;s built</SectionEyebrow>
            <h2 className="mt-2 text-2xl sm:text-3xl mb-10 lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
              System Architecture
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <NeumorphicFrame className="max-w-5xl mx-auto">
                <div className="relative w-full overflow-hidden rounded-3xl bg-stone-200/60 dark:bg-stone-900/60">
                  <img
                    src={project.architecture.image}
                    alt="System architecture diagram"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </NeumorphicFrame>
            </motion.div>
            <p className="mt-8 text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed transition-colors duration-300">
              {project.architecture.description}
            </p>
          </motion.div>
        </div>

        <div className="mt-24 sm:mt-28 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
          >
            <SectionEyebrow>Under the hood</SectionEyebrow>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
              Key Features
            </h2>
          </motion.div>
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
            {project.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
