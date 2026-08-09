import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { useNavbar } from "@/context/navbarContext.jsx";

import AboutMeSection from "@/components/layout/abount-me-section.jsx";
import SkillsSection from "@/components/layout/skills-section";
import HeroSection from "@/components/layout/hero-section.jsx";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  const { setIsMenuOpen } = useNavbar();
  useEffect(() => {
    // Check if particlesJS was loaded from index.html
    if (window.particlesJS) {
      window.particlesJS.load("particles-js", "/particles.json", function () {
        console.log("particles.js config loaded!");
      });
    }
  }, []);
  return (
    <div className="relative  bg-linear-to-b from-gray-50 to-white  ">
      {/* Mobile Menu */}

      {/* Main Section */}
      <HeroSection />

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
              Featured <span className="text-blue-600">Projects</span>
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
