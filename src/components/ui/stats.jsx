import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

// Custom hook for intersection observer
const useInView = (options) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime = null;
      const startValue = 1;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(
          easeOutQuart * (end - startValue) + startValue
        );

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, end, duration]);

  return (
    <div
      ref={ref}
      className="group bg-linear-to-br from-blue-500 to-indigo-600 py-3 items-center px-5 sm:p-6 rounded-xl text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
    >
      <div className="text-xl sm:text-3xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110">
        {count}
        {suffix}
      </div>
      <div className="text-sm opacity-90 transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </div>
    </div>
  );
};
export default function StatsOverView() {
  const stats = [
    { label: "Projects", value: 10, suffix: "+" },
    { label: "Hands-on Experience", value: 1, suffix: " Year" },
    { label: "Technologies", value: 20, suffix: "+" },
    { label: "Certifications", value: 2, suffix: "" },
  ];

  return (
    <div className="grid grid-cols-2 gap-1 sm:gap-6">
      {stats.map((stat, index) => (
        <AnimatedCounter
          key={index}
          end={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          duration={2000 + index * 200}
        />
      ))}
    </div>
  );
}
