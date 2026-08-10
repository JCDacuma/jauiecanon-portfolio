import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * GitHub Contributions Section
 * Usage: <GitHubSection username="yourusername" />
 *
 * Data source: github-contributions-api.jogruber.de (free, no auth required)
 * Styled to match the Skills section's dark stone/emerald glassmorphic theme.
 */

const LEVEL_COLORS = [
  "bg-white/[0.06]", // level 0 - no contributions
  "bg-emerald-900/70", // level 1
  "bg-emerald-700/80", // level 2
  "bg-emerald-500", // level 3
  "bg-emerald-400", // level 4
];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function GitHubCalendar({ username }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [hovered, setHovered] = useState(null); // {date, count, x, y}

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        );
        if (!res.ok) throw new Error("Failed to fetch contributions");
        const data = await res.json();
        if (cancelled) return;

        const contributions = data.contributions || [];
        setTotal(contributions.reduce((sum, d) => sum + d.count, 0));
        setWeeks(groupByWeek(contributions));
        setStatus("ready");
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (status === "loading") {
    return (
      <div className="animate-pulse">
        <div className="h-40 rounded-xl bg-white/[0.05]" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-sm text-stone-400">
        Couldn't load GitHub contributions right now.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
          {total.toLocaleString()} contributions
          <span className="text-stone-400 normal-case font-normal">
            {" "}
            in the last year
          </span>
        </h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-400 hover:text-emerald-400 transition-colors"
        >
          @{username}
        </a>
      </div>

      <div className="overflow-x-auto pb-2 flex justify-center">
        <div className="inline-flex gap-2 min-w-max">
          {/* Day-of-week labels */}
          <div className="flex flex-col gap-[3px] pr-1 pt-[18px]">
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="h-[11px] text-[10px] leading-[11px] text-stone-500"
              >
                {label}
              </div>
            ))}
          </div>

          <div>
            {/* Month labels */}
            <div className="flex gap-[3px] mb-1 text-[10px] text-stone-500">
              {weeks.map((week, i) => {
                const firstDay = week.find(Boolean);
                const showLabel =
                  firstDay &&
                  (i === 0 || new Date(firstDay.date).getDate() <= 7) &&
                  (i === 0 ||
                    new Date(weeks[i - 1].find(Boolean)?.date).getMonth() !==
                      new Date(firstDay.date).getMonth());
                return (
                  <div key={i} className="w-[11px]">
                    {showLabel
                      ? MONTH_LABELS[new Date(firstDay.date).getMonth()]
                      : ""}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) =>
                    day ? (
                      <div
                        key={di}
                        className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[day.level]} cursor-pointer transition-transform hover:scale-125`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHovered({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHovered(null)}
                      />
                    ) : (
                      <div key={di} className="w-[11px] h-[11px]" />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-1 mt-3 text-[11px] text-stone-400">
        <span>Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
        ))}
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="fixed z-50 px-2 py-1 text-xs text-white bg-stone-900 border border-white/10 rounded shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full -mt-2"
          style={{ left: hovered.x, top: hovered.y }}
        >
          {hovered.count} contribution{hovered.count !== 1 ? "s" : ""} on{" "}
          {new Date(hovered.date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
}

function TopLanguages({ username }) {
  const [loaded, setLoaded] = useState(false);

  const src = `https://github-readme-stats-alpha-one-jaez1sfjbr.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&bg_color=00000000&title_color=34d399&text_color=d6d3d1&count_private=true&langs_count=8`;

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold tracking-wide text-white uppercase mb-5">
        Most Used Languages
      </h3>
      <div className="relative flex-1 flex items-center justify-center min-h-[220px]">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse rounded-xl bg-white/[0.05]" />
        )}
        <img
          src={src}
          alt={`${username}'s most used languages on GitHub`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

export default function GitHubSection({ username }) {
  return (
    <section
      id="github"
      className="relative  flex flex-col items-center pt-15 overflow-hidden bg-stone-900"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-emerald-500/25 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-teal-400/15 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-emerald-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/60" />
      </div>

      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-6 pt-5 sm:mb-8"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-400 uppercase mb-2">
            Consistency Builds Progress
          </span>

          <h2 className="text-2xl font-bold text-white">
            My <span className="text-emerald-400">GitHub</span> Activity
          </h2>

          <div className="mt-4 mx-auto mr-[50%] w-16 h-1 rounded-full bg-emerald-400" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 flex flex-col justify-center will-change-transform"
          >
            <GitHubCalendar username={username} />
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 will-change-transform"
          >
            <TopLanguages username={username} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Groups a flat array of {date, count, level} into weeks (columns) starting on Sunday */
function groupByWeek(contributions) {
  if (!contributions.length) return [];

  const byDate = new Map(contributions.map((d) => [d.date, d]));
  const start = new Date(contributions[0].date);
  const end = new Date(contributions[contributions.length - 1].date);

  const alignedStart = new Date(start);
  alignedStart.setDate(alignedStart.getDate() - alignedStart.getDay());

  const weeks = [];
  let current = [];
  let cursor = new Date(alignedStart);

  while (cursor <= end) {
    const iso = cursor.toISOString().slice(0, 10);
    current.push(byDate.get(iso) || null);

    if (cursor.getDay() === 6) {
      weeks.push(current);
      current = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (current.length) weeks.push(current);

  return weeks;
}
