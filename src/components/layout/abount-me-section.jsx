import { motion } from "framer-motion";
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
      className="min-h-screen flex items-center xl:pb-10 pt-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-800 overflow-hidden transition-colors duration-300"
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
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 transition-colors duration-300">
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
            <div className="relative w-full sm:max-w-[280px] max-w-[240px] sm:max-w-sm md:max-w-md">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative w-[78%] aspect-4/5 overflow-hidden rounded-2xl ring-1 ring-stone-200 dark:ring-stone-700 shadow-lg shadow-stone-200/60 dark:shadow-stone-950/40 z-10 transition-[box-shadow] duration-300"
              >
                <img
                  src="/aboutme/aboutme.png"
                  alt="Jauie working"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className="absolute bottom-[-8%] right-[-6%] w-[46%] aspect-square overflow-hidden rounded-xl ring-4 ring-stone-50 dark:ring-stone-800 shadow-lg shadow-stone-300/50 dark:shadow-stone-950/40 z-20 transition-[box-shadow] duration-300"
              >
                <img
                  src="/aboutme/me.png"
                  alt="Jauie at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent" />
              </motion.div>
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
                I am a {age}-year-old Full Stack Web Developer holding a
                Bachelor of Science in Information Technology from Baliwag
                Polytechnic College. Operating as an independent freelance
                developer since 2024, I specialize in building practical,
                high-performance business applications.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base sm:text-lg transition-colors duration-300">
                My work focuses on engineering tailor-made digital systems
                including custom Point of Sale (POS) tools, inventory tracking
                systems, e-commerce platforms, logistics management software,
                and enterprise solutions designed to solve real-world
                operational challenges.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
