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
      className="group bg-white border border-blue-100 py-4 px-6 sm:p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="text-2xl sm:text-2xl font-bold text-blue-600 mb-1.5 transition-all duration-300 group-hover:text-blue-700">
        {count}
        {suffix}
      </div>
      <div className="text-sm  text-gray-600 font-bold">{label}</div>
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
    <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2  gap-3 sm:gap-5">
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
