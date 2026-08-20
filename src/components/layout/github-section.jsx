import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useNavbar } from "@/context/navbarContext.jsx";

const RAISED =
  "shadow-[4px_4px_10px_rgba(168,162,158,0.25),-4px_-4px_10px_rgba(255,255,255,0.7)] " +
  "dark:shadow-[4px_4px_12px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.02)]";
const INSET =
  "shadow-[inset_2px_2px_5px_rgba(168,162,158,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] " +
  "dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.02)]";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const calendarTheme = {
  light: ["#ece9e4", "#a7f3d0", "#5eead4", "#2dd4bf", "#059669"],
  dark: ["#26251f", "#065f46", "#0d9488", "#10b981", "#6ee7b7"],
};

const STATS_HOST =
  "https://github-readme-stats-alpha-one-jaez1sfjbr.vercel.app/api/top-langs/";
const STREAK_HOST = "https://github-streak-theta.vercel.app";
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

function CardShell({ children, className = "", centerContent = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`rounded-3xl bg-stone-100 dark:bg-stone-800 p-3 sm:p-4 transition-colors duration-300 ${RAISED} ${className}`}
    >
      <div
        className={`rounded-2xl p-4 sm:p-5 h-full ${INSET} ${
          centerContent ? "flex flex-col justify-center" : ""
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <h3 className="text-xs font-medium tracking-wide text-stone-500 dark:text-stone-400 uppercase mb-4">
      {children}
    </h3>
  );
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
    <div className={centered ? "flex flex-col items-center text-center" : ""}>
      <SectionLabel>{title}</SectionLabel>

      {status === "loading" && (
        <div className="flex items-center gap-2 py-6 text-sm text-stone-400 dark:text-stone-500">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500/30 border-t-emerald-600 dark:border-t-emerald-400 animate-spin" />
          Fetching data…
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-stone-400 dark:text-stone-500 py-2">
          Couldn't load stats.{" "}
          <button
            type="button"
            onClick={handleRetry}
            className="underline underline-offset-2 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Retry
          </button>{" "}
          or{" "}
          <a
            href={fallbackHref}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            open directly
          </a>
        </p>
      )}

      {status !== "error" && (
        <img
          key={`${src}-${attempt}`}
          src={src}
          alt={alt}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`w-full transition-opacity duration-300 ${
            centered ? "mx-auto" : ""
          } ${status === "loaded" ? "opacity-100" : "opacity-0 h-0"}`}
        />
      )}
    </div>
  );
}

export default function GitHubSection({ username }) {
  const { isDarkMode } = useNavbar();
  const calendarScrollRef = useRef(null);
  const [calendarReady, setCalendarReady] = useState(false);

  useLayoutEffect(() => {
    const node = calendarScrollRef.current;
    if (!node) return;

    const scrollToLatest = () => {
      node.scrollLeft = node.scrollWidth;
    };

    scrollToLatest();
    setCalendarReady(true);

    const observer = new ResizeObserver(scrollToLatest);
    observer.observe(node);
    return () => observer.disconnect();
  }, [username]);

  return (
    <section
      id="github"
      className="relative flex flex-col items-center py-20 bg-stone-50 dark:bg-stone-800 transition-colors duration-500"
    >
      <div className="w-full mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Consistency Builds Progress
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            My GitHub Activity
          </h2>
          <div className="mt-4 mx-auto w-10 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
        </motion.div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <CardShell>
            <SectionLabel>Contribution Activity</SectionLabel>
            <div
              ref={calendarScrollRef}
              className={`overflow-x-auto -mx-1 px-1 transition-opacity duration-200 ${
                calendarReady ? "opacity-100" : "opacity-0"
              }`}
            >
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
          </CardShell>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <CardShell>
              <StatImageCard
                title="Top Languages"
                src={buildTopLangsUrl(username, isDarkMode)}
                alt={`${username}'s most used languages`}
                fallbackHref={buildTopLangsUrl(username, isDarkMode)}
              />
            </CardShell>

            <CardShell centerContent>
              <StatImageCard
                title="GitHub Streak"
                src={buildStreakUrl(username, isDarkMode)}
                alt={`${username}'s GitHub streak`}
                fallbackHref="https://git.io/streak-stats"
                centered
              />
            </CardShell>
          </div>
        </div>
      </div>
    </section>
  );
}
