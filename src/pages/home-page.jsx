import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import { useNavbar } from "@/context/navbarContext.jsx";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import AboutMeSection from "@/components/layout/abount-me-section.jsx";
import SkillsSection from "@/components/layout/skills-section";
import HeroSection from "@/components/layout/hero-section.jsx";
import ServicesSection from "@/components/layout/services-section.jsx";
import GitHubContributions from "@/components/layout/github-section.jsx";
import ProjectShowcase from "@/components/layout/projectShowcase.jsx";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  const { setIsMenuOpen, isDarkMode } = useNavbar();
  useEffect(() => {
    // Check if particlesJS was loaded from index.html
    if (window.particlesJS) {
      window.particlesJS.load("particles-js", "/particles.json", function () {
        console.log("particles.js config loaded!");
      });
    }
  }, []);
  return (
    <div className="relative bg-stone-50 dark:bg-stone-800  ">
      {/* Mobile Menu */}

      {/* Main Section */}
      <HeroSection isDarkMode={isDarkMode} />

      {/* About Section */}
      <AboutMeSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Skills Section */}
      <SkillsSection isDarkMode={isDarkMode} />

      {/* GitHub Contributions Section */}
      <GitHubContributions username={"JcDacuma"} />

      {/* Works Section */}
      <ProjectShowcase />

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
