import { motion } from "framer-motion";

const RAISED_MD =
  "shadow-[6px_6px_14px_rgba(168,162,158,0.4)] " +
  "dark:shadow-[6px_6px_16px_rgba(0,0,0,0.5)]";
const RAISED_MD_HOVER =
  "hover:shadow-[3px_3px_8px_rgba(168,162,158,0.3)] " +
  "dark:hover:shadow-[3px_3px_10px_rgba(0,0,0,0.5)]";
const RAISED_SM =
  "shadow-[4px_4px_10px_rgba(168,162,158,0.4)] " +
  "dark:shadow-[4px_4px_12px_rgba(0,0,0,0.5)]";
const RAISED_SM_HOVER =
  "hover:shadow-[2px_2px_6px_rgba(168,162,158,0.3)] " +
  "dark:hover:shadow-[2px_2px_7px_rgba(0,0,0,0.5)]";
const INSET_XS =
  "shadow-[inset_2px_2px_5px_rgba(168,162,158,0.35)] " +
  "dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]";

export default function AboutMeSection() {
  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const age = calculateAge("2002-09-29");

  return (
    <section
      id="about"
      className="min-h-screen flex items-center xl:pb-10 pt-20 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-800 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-800 dark:text-emerald-400 uppercase mb-2 transition-colors duration-300">
            Get to know me
          </span>
          <h2 className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
            About{" "}
            <span className="text-emerald-800 dark:text-emerald-400 transition-colors duration-300">
              Me
            </span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-emerald-600 dark:bg-emerald-500 transition-colors duration-300" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center order-1"
          >
            <div className="relative w-full sm:max-w-[280px] max-w-[260px] sm:max-w-sm md:max-w-md">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`
                  relative w-[78%] aspect-4/5 rounded-[22px] p-2
                  bg-stone-50 dark:bg-stone-800 z-10
                  transition-[box-shadow,background-color] duration-300
                  ${RAISED_MD} ${RAISED_MD_HOVER}
                `}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img
                    src="/aboutme/aboutme.png"
                    alt="Jauie working"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className={`
                  absolute bottom-[-8%] right-[-6%] w-[46%] aspect-square rounded-[18px] p-1.5
                  bg-stone-50 dark:bg-stone-800 z-20
                  transition-[box-shadow,background-color] duration-300
                  ${RAISED_SM} ${RAISED_SM_HOVER}
                `}
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="/aboutme/me.png"
                    alt="Jauie at work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent" />
                </div>
              </motion.div>

              <div
                className={`
                  hidden sm:flex absolute -bottom-3 -left-3 z-30
                  h-9 w-9 items-center justify-center rounded-full
                  bg-stone-50 dark:bg-stone-800 transition-[box-shadow,background-color] duration-300
                  ${INSET_XS}
                `}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500 transition-colors duration-300" />
              </div>

              <div className="hidden sm:block absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full blur-2xl transition-colors duration-300" />
              <div className="hidden sm:block absolute -z-10 -top-6 -right-6 w-24 h-24 bg-emerald-300/20 dark:bg-emerald-300/10 rounded-full blur-2xl transition-colors duration-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 text-center md:text-left order-2"
          >
            <div className="space-y-4">
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base sm:text-lg transition-colors duration-300">
                I am a {age}-year-old Full Stack Web Developer and a graduate of
                Bachelor of Science in Information Technology from Baliwag
                Polytechnic College. I began my journey in web development
                before 2024 and have continued to build my knowledge through
                freelance projects, independent learning, and hands-on
                experience.
              </p>

              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base sm:text-lg transition-colors duration-300">
                I am passionate about creating practical, reliable, and
                user-focused digital solutions that address real-world needs. I
                am committed to continuous learning, exploring new technologies,
                and expanding my capabilities in web and application development
                while delivering meaningful solutions through technology.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
