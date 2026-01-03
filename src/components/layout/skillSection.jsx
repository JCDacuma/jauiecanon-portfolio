import React from "react";
import { motion } from "framer-motion";

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
          level: 65,
        },
        {
          name: "JavaScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          level: 80,
        },
        {
          name: "HTML5",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          level: 95,
        },
        {
          name: "CSS3",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
          level: 90,
        },
        {
          name: "Redux",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
          level: 80,
        },
        {
          name: "Chart.js",
          logo: "https://www.chartjs.org/img/chartjs-logo.svg",
          level: 75,
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
          level: 90,
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
          level: 85,
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
          level: 85,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            My <span className="text-blue-600 bg-clip-text">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Technologies I use to build modern web applications
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-100"
              >
                {category.title}
              </motion.h3>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className="w-10 h-10 flex-shrink-0 bg-blue-50 rounded-lg p-1.5 group-hover:bg-blue-100 transition-colors duration-300"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/40/3B82F6/FFFFFF?text=" +
                              skill.name.charAt(0);
                          }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                            {skill.name}
                          </span>
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 + skillIndex * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="text-sm sm:text-base font-bold text-blue-600 ml-2"
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              delay: 0.2 + skillIndex * 0.1,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full relative overflow-hidden"
                          >
                            <motion.div
                              animate={{
                                x: ["-100%", "100%"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
