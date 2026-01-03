import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Download,
  Briefcase,
} from "lucide-react";

import MainImage from "@/components/ui/image.jsx";
import AboutMeSection from "@/components/layout/aboutMeSection.jsx";
import SkillsSection from "@/components/layout/skillSection";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "works"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative  bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      {/* Mobile Menu */}
      <AnimatePresence>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-1 sm:py-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl sm:text-2xl font-bold"
              >
                Jauie <span className="text-blue-600">Cañon</span>
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {["Home", "About", "Skills", "Works"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-base font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
              <div className="relative md:hidden rounded-lg hover:bg-gray-100">
                <Hamburger
                  toggled={isMenuOpen}
                  toggle={setIsMenuOpen}
                  size={23}
                />
              </div>
            </div>

            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden pb-4 overflow-hidden"
              >
                {["Home", "About", "Skills", "Works"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left py-2 px-4 rounded-lg ${
                      activeSection === item.toLowerCase()
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.nav>
      </AnimatePresence>
      {/* Main Section */}
      <section
        id="home"
        className="min-h-170 md:min-h-150 sm:min-h-200 h-screen  2xl:min-h-210 flex items-center pt-20  px-4   sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto  w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center md:text-left order-2 md:order-1"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  Hi, I am <span className="text-blue-600">Jauie Cañon</span>
                </h1>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                  Full Stack Web Developer
                </h2>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 mb-8 text-sm sm:text-base"
              >
                Bachelor of Science and Information and
                <br />
                Technology Graduate | Freelancer
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex cursor-pointer items-center gap-2 shadow-lg"
                >
                  <Download size={18} />
                  Resume
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 cursor-pointer rounded-lg font-medium flex items-center gap-2"
                >
                  <Briefcase size={18} />
                  Project
                </motion.button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex gap-6 justify-center md:justify-start"
              >
                {[
                  { icon: Github, href: "https://github.com/JCDacuma" },
                  { icon: Linkedin, href: "www.linkedin.com/in/jauie-cañon" },
                  { icon: Mail, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <social.icon size={24} className="text-gray-700" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                {/* ---- Image UI ---- */}
                <MainImage />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutMeSection />
      {/* Skills Section */}
      <SkillsSection />

      {/* Works Section */}
      <section
        id="works"
        className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-white/50"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              My <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Portfolio projects coming soon...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Jauie Cañon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
