"use client";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import ParticlesBackground from "@/components/ui/particlesBackground";

const accountLinks = [
  { name: "Github", url: "https://github.com/jauiecanon", icon: Github },
  {
    name: "Linkedin",
    url: "https://linkedin.com/in/jauiecanon",
    icon: Linkedin,
  },
  { name: "Mail", url: "mailto:your-email@example.com", icon: Mail },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [skipTransition, setSkipTransition] = useState(true);
  const hasLeftRef = useRef(false);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setSkipTransition(false);
      setIsVisible(true);
    }, 100);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasLeftRef.current) {
            setSkipTransition(true);
            setIsVisible(false);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setSkipTransition(false);
                setIsVisible(true);
              });
            });
          }
          hasLeftRef.current = false;
        } else {
          hasLeftRef.current = true;
        }
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      clearTimeout(initialTimer);
      observer.disconnect();
    };
  }, []);

  const transitionClass = skipTransition
    ? ""
    : "transition-all duration-1000 ease-out";

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[calc(100vh-2rem)] sm:h-screen overflow-hidden text-white font-sans bg-stone-900"
    >
      {/* 1. PARTICLES BACKGROUND LAYER */}
      <ParticlesBackground />
      {/* 2. IMAGE LAYER */}
      <div className="absolute inset-0 pt-5 lg:pt-0 flex justify-center items-end pointer-events-none">
        <div className="relative w-full h-full flex justify-center lg:justify-center items-end lg:absolute lg:right-0 lg:bottom-0 lg:w-[55%] lg:h-[80%]">
          <img
            src="/aboutme/barongtagalog_myimage_transparent.png"
            alt="Hero"
            className={`
              h-[86%] sm:h-[90%] lg:h-full w-auto max-w-none object-contain object-bottom mx-s lg:mx-0
              ${transitionClass}
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 lg:translate-x-40"}
            `}
          />
        </div>
      </div>
      {/* 3. CONTENT & OVERLAY LAYER */}
      <div
        className={`
          absolute inset-x-0 bottom-0 lg:inset-0
          z-10 flex items-end lg:items-center justify-start
          p-6 pb-8 lg:p-12
          bg-gradient-to-t from-black/90 via-emerald-950/70 to-transparent
          lg:bg-emerald-900/90
          lg:[clip-path:polygon(0_0,58%_0,42%_100%,0_100%)]
          ${transitionClass}
          ${isVisible ? "opacity-100 translate-y-0 lg:translate-x-0" : "opacity-0 translate-y-8 lg:translate-y-0 lg:-translate-x-24"}
        `}
      >
        <div className="max-w-xs lg:max-w-sm 2xl:max-w-lg lg:ml-5 2xl:ml-15">
          <h1 className="text-xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2">
            Hi, I'm Jauie Cañon
          </h1>
          <p className="text-indigo-100 text-sm 2xl:text-base mb-1.5">
            I'm a full stack web developer based in the Philippines.
          </p>
          <div className="flex gap-4 mt-4.5 items-center">
            {accountLinks.map((accountLink) => (
              <a
                key={accountLink.name}
                href={accountLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                <accountLink.icon />
              </a>
            ))}
            <span>|</span>
            <button className="flex text-sm items-center gap-2 border border-solid border-white rounded-full px-3 py-1 hover:bg-white/10 transition-colors">
              <Download size={14} />
              Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
