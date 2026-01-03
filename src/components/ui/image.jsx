import { motion, useScroll, useTransform } from "framer-motion";
export default function MainImage() {
  return (
    <div className="relative w-64 h-64 sm:w-80 mb-2 sm:h-80 lg:w-90 lg:h-90">
      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 opacity-50 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-100 via-blue-300 to-blue-400 opacity-40 blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [0, Math.cos((i * 120 * Math.PI) / 180) * 180, 0],
            y: [0, Math.sin((i * 120 * Math.PI) / 180) * 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Main image container */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 60px rgba(59, 130, 246, 0.5)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Gradient border effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 opacity-0"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated ring border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, #3b82f6 90deg, transparent 180deg, #8b5cf6 270deg, transparent 360deg)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner container for image */}
        <div className="absolute inset-1 rounded-full overflow-hidden bg-blue-700">
          <motion.img
            src="src/assets/aboutme/main_image.png"
            alt="Profile - Graduate in academic regalia"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          />

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-blue-600/50 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-linear-to-br from-blue-400 to-purple-600 rounded-full shadow-lg"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
