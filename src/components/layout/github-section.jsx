import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useNavbar } from "@/context/navbarContext.jsx";

/* ------------------------------------------------------------------ */
/*  Neumorphic shadow tokens (shared design language)                 */
/* ------------------------------------------------------------------ */
const RAISED =
  "shadow-[6px_6px_14px_rgba(168,162,158,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[6px_6px_16px_rgba(0,0,0,0.55),-6px_-6px_16px_rgba(255,255,255,0.025)]";
const INSET =
  "shadow-[inset_3px_3px_7px_rgba(168,162,158,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.55),inset_-3px_-3px_7px_rgba(255,255,255,0.025)]";
const INSET_SM =
  "shadow-[inset_2px_2px_5px_rgba(168,162,158,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.55),inset_-2px_-2px_5px_rgba(255,255,255,0.025)]";

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
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

const calendarTheme = {
  light: ["#e7e5e0", "#a7f3d0", "#5eead4", "#2dd4bf", "#059669"],
  dark: ["#292825", "#065f46", "#0d9488", "#10b981", "#6ee7b7"],
};

const STATS_HOST =
  "https://github-readme-stats-alpha-one-jaez1sfjbr.vercel.app/api/top-langs/";
const STREAK_HOST = "https://github-streak-theta.vercel.app";

// External stat services (esp. free-tier vercel deploys) can take a while
// to cold-start, so give them a generous window before treating it as an error.
const LOAD_TIMEOUT_MS = 20000;

function buildTopLangsUrl(username, isDarkMode) {
  const params = new URLSearchParams({
    username,
    layout: "compact",
    hide_title: "true",
    hide_border: "true",
    bg_color: "00000000",
    count_private: "true",
    langs_count: "8",
    text_color: isDarkMode ? "e5e7eb" : "44403c",
    title_color: isDarkMode ? "34d399" : "059669",
    icon_color: isDarkMode ? "34d399" : "059669",
  });
  return `${STATS_HOST}?${params.toString()}`;
}

function buildStreakUrl(username, isDarkMode) {
  const accent = isDarkMode ? "34d399" : "059669";
  const muted = isDarkMode ? "9ca3af" : "78716c";
  const text = isDarkMode ? "e5e7eb" : "44403c";
  const params = new URLSearchParams({
    user: username,
    theme: "rising-sun",
    hide_border: "true",
    background: "00000000",
    date_format: "j M[ Y]",
    card_width: "475",
    card_height: "155",
    border_radius: "8",
    stroke: accent,
    ring: accent,
    fire: accent,
    currStreakNum: text,
    sideNums: muted,
    currStreakLabel: accent,
    sideLabels: muted,
    dates: muted,
  });
  return `${STREAK_HOST}?${params.toString()}`;
}

function StatImageCard({ title, src, alt, fallbackHref, centered = false }) {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStatus("loading");
    const timeout = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current));
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [src, attempt]);

  const handleRetry = () => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  };

  return (
    <div
      className={`rounded-2xl w-full bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 transition-colors duration-300 min-h-[120px] max-h-120 ${INSET} ${
        centered ? "flex flex-col items-center text-center" : ""
      }`}
    >
      <h3 className="text-sm font-semibold tracking-wide text-stone-700 dark:text-stone-300 uppercase mb-4 transition-colors duration-300">
        {title}
      </h3>

      {status === "loading" && (
        <div className="flex items-center w-full gap-2.5 py-6 text-sm text-stone-500 dark:text-stone-400">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500/30 dark:border-emerald-400/30 border-t-emerald-600 dark:border-t-emerald-400 animate-spin" />
          Fetching data...
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-stone-500 dark:text-stone-400 py-2">
          Couldn't load stats.{" "}
          <button
            type="button"
            onClick={handleRetry}
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Retry
          </button>{" "}
          or{" "}
          <a
            href={fallbackHref}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            open directly
          </a>
          .
        </p>
      )}

      <img
        key={`${src}-${attempt}`}
        src={src}
        alt={alt}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={`w-full h-40 transition-opacity duration-300 ${
          centered ? "mx-auto" : ""
        } ${
          status === "loaded"
            ? "opacity-100"
            : "opacity-0 absolute pointer-events-none -z-10"
        }`}
      />
    </div>
  );
}

export default function GitHubSection({ username }) {
  const { isDarkMode } = useNavbar();

  return (
    <section
      id="github"
      className="relative flex flex-col items-center pt-15 pb-16 overflow-hidden bg-stone-50 dark:bg-stone-900 transition-colors duration-500"
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-10 pt-5 sm:mb-12 will-change-transform"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase mb-4 transition-colors duration-300">
            Consistency Builds Progress
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
            My{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              GitHub
            </span>{" "}
            Activity
          </h2>
          <div className="mt-5 mx-auto mr-[50%] w-16 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300" />
        </motion.div>

        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Contribution Activity */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className={`rounded-[26px] bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 transition-[background-color,box-shadow] duration-500 will-change-transform ${RAISED}`}
          >
            <div
              className={`rounded-2xl bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 transition-colors duration-300 ${INSET}`}
            >
              <h3 className="text-sm font-semibold tracking-wide text-stone-700 dark:text-stone-300 uppercase mb-4 transition-colors duration-300">
                Contribution Activity
              </h3>
              <div className="overflow-x-auto -mx-1 px-1">
                <div className="min-w-[640px]">
                  <GitHubCalendar
                    username={username}
                    colorScheme={isDarkMode ? "dark" : "light"}
                    theme={calendarTheme}
                    blockSize={11}
                    blockMargin={4}
                    fontSize={12}
                    showTotalCount
                    showWeekdayLabels
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Languages + GitHub Streak, side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className={`rounded-[26px] bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 transition-[background-color,box-shadow] duration-500 relative will-change-transform ${RAISED}`}
            >
              <StatImageCard
                title="Top Languages"
                src={buildTopLangsUrl(username, isDarkMode)}
                alt={`${username}'s most used languages`}
                fallbackHref={buildTopLangsUrl(username, isDarkMode)}
              />
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.18 }}
              className={`rounded-[26px] items-center flex bg-stone-100 dark:bg-stone-800 p-4 sm:p-5 transition-[background-color,box-shadow] duration-500 relative will-change-transform ${RAISED}`}
            >
              <StatImageCard
                title="GitHub Streak"
                src={buildStreakUrl(username, isDarkMode)}
                alt={`${username}'s GitHub streak`}
                fallbackHref="https://git.io/streak-stats"
                centered
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
