import { motion } from "framer-motion";
import React from "react";
import StatsOverView from "@/components/ui/stats.jsx";
export default function AboutMeSection() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <section
      id="about"
      className="min-h-screen flex  items-center sm:py-20 px-2 sm:px-6 lg:px-8 bg-white/50"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            About <span className="text-blue-600">Me</span>
          </h2>
        </motion.div>

        <div className="grid  md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-md hidden md:inline"
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <img
                  src="/aboutme/aboutme.png"
                  alt="Team collaboration"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                {/* Animated overlay gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full transition-all duration-1000 ${
                      isHovered ? "animate-ping" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute top-1/3 right-1/3 w-3 h-3 bg-blue-300/40 rounded-full transition-all duration-1000 delay-150 ${
                      isHovered ? "animate-ping" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-300/50 rounded-full transition-all duration-1000 delay-300 ${
                      isHovered ? "animate-ping" : ""
                    }`}
                  ></div>
                </div>
              </div>

              {/* Shimmer effect on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none`}
              ></div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-30 blur-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
            >
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl sm:text-2xl text-center font-bold mb-6 text-gray-800"
              >
                Professional Journey
              </motion.h3>

              <motion.div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-gray-600 text-center leading-relaxed"
                >
                  As a passionate Full Stack Web Developer, I specialize in
                  creating modern, responsive, and user-friendly web
                  applications. With a strong foundation in both front-end and
                  back-end technologies, I bring ideas to life through clean
                  code and innovative solutions.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-gray-600 text-center leading-relaxed"
                >
                  My journey in technology is driven by curiosity and a
                  commitment to continuous learning. I thrive on challenges and
                  enjoy collaborating with teams to build impactful digital
                  experiences.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              <StatsOverView />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
