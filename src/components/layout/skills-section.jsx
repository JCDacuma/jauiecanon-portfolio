import React from "react";
import { motion } from "framer-motion";
import LogoLoop from "@/components/utils/logoLoops.jsx";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          level: 70,
        },
        {
          name: "TypeScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          level: 55,
        },
        {
          name: "JavaScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          level: 80,
        },
        {
          name: "HTML5",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          level: 98,
        },
        {
          name: "CSS3",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
          level: 70,
        },
        {
          name: "Redux",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
          level: 50,
        },
        {
          name: "Chart.js",
          logo: "https://www.chartjs.org/img/chartjs-logo.svg",
          level: 75,
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
          level: 80,
        },
        {
          name: "Bootstrap",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          level: 70,
        },
        {
          name: "Material UI",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
          level: 70,
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "Laravel",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
          level: 80,
        },
        {
          name: "PHP",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
          level: 80,
        },
        {
          name: "REST API",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
          level: 80,
        },
        {
          name: "JWT",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg",
          level: 55,
        },
        {
          name: "Laravel Sanctum",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
          level: 90,
        },
        {
          name: "MySQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
          level: 65,
        },
      ],
    },
    {
      title: "Tools & Version Control",
      skills: [
        {
          name: "Docker",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
          level: 55,
        },
        {
          name: "Git",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
          level: 70,
        },
        {
          name: "GitHub",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          level: 80,
        },
        {
          name: "Postman",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
          level: 75,
        },
      ],
    },
  ];

  const skillsLogos = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      alt: "Tailwind CSS",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      alt: "Laravel",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      alt: "Docker",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      alt: "MySQL",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center mt-10 pt-10  overflow-hidden bg-stone-700"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-emerald-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-teal-400/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-emerald-700/30 rounded-full blur-[110px]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-emerald-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/60" />
      </div>

      <div className="w-full mx-auto w-full ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-5 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-emerald-400 uppercase mb-2">
            What I bring to the table
          </span>
          <h2 className="text-3xl  font-bold text-white">
            Skills That <span className="text-emerald-400">Fuel</span> My
            Passion
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-emerald-400" />

          <div className="relative mt-10 py-3 bg-stone-700 overflow-auto fade-x">
            <LogoLoop
              logos={skillsLogos}
              speed={100}
              direction="left"
              logoHeight={40}
              gap={45}
              hoverSpeed={0}
              scaleOnHover
              ariaLabel="Technology partners"
            />
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        ></motion.div>
      </div>
    </section>
  );
}
