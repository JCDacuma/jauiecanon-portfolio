import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useNavbar } from "@/context/navbarContext.jsx";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const calendarTheme = {
  light: ["#e9ecef", "#a7f3d0", "#5eead4", "#2dd4bf", "#059669"],
  dark: ["#12241c", "#065f46", "#0d9488", "#10b981", "#6ee7b7"],
};

const STATS_HOST =
  "https://github-readme-stats-alpha-one-jaez1sfjbr.vercel.app/api/top-langs/";

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

export default function GitHubSection({ username }) {
  const { isDarkMode } = useNavbar();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
    const timeout = setTimeout(() => {
      setImgLoaded((loaded) => {
        if (!loaded) setImgError(true);
        return loaded;
      });
    }, 12000);
    return () => clearTimeout(timeout);
  }, [isDarkMode, username]);

  return (
    <section
      id="github"
      className="relative flex flex-col items-center pt-15 pb-16 overflow-hidden bg-stone-50 dark:bg-stone-800 transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-emerald-400/15 dark:bg-emerald-500/25 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-teal-300/10 dark:bg-teal-400/15 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 dark:from-emerald-950 dark:via-transparent dark:to-emerald-950/60" />
      </div>

      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-10 pt-5 sm:mb-12"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-4">
            Consistency Builds Progress
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            My{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              GitHub
            </span>{" "}
            Activity
          </h2>
          <div className="mt-5 mx-auto mr-[50%] w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-2 rounded-2xl border border-stone-900/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-5 sm:p-6 shadow-sm"
          >
            <h3 className="text-sm font-semibold tracking-wide text-stone-900 dark:text-white uppercase mb-4">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="rounded-2xl border border-stone-900/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-5 sm:p-6 shadow-sm relative"
          >
            <h3 className="text-sm font-semibold tracking-wide text-stone-900 dark:text-white uppercase mb-4">
              Top Languages
            </h3>

            {!imgLoaded && !imgError && (
              <div className="flex items-center gap-2.5 py-6 text-sm text-stone-500 dark:text-stone-400">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500/30 dark:border-emerald-400/30 border-t-emerald-500 dark:border-t-emerald-400 animate-spin" />
                Fetching languages...
              </div>
            )}

            {imgError && (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Couldn't load language stats.{" "}
                <a
                  href={buildTopLangsUrl(username, isDarkMode)}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Open directly
                </a>
              </p>
            )}

            <img
              key={isDarkMode ? "dark" : "light"}
              src={buildTopLangsUrl(username, isDarkMode)}
              alt={`${username}'s most used languages`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-auto transition-opacity duration-300 ${
                imgLoaded
                  ? "opacity-100"
                  : "opacity-0 absolute pointer-events-none -z-10"
              }`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
