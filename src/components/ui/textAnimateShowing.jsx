"use client";

import { TypeAnimation } from "react-type-animation";

export default function TextAnimateShowing({
  text = [],
  isDarkMode = false,
  speed = 50,
  repeat = Infinity,
  className = "",
  as = "span",
  cursorClassName = "",
}) {
  const defaultSequence = [
    "Full stack web developer.",
    1800,
    "I build fast, accessible interfaces.",
    1800,
    "I love turning ideas into products.",
    1800,
    "Clean code. Thoughtful UX. Real impact.",
    1800,
    "Always learning, always building.",
    1800,
  ];

  const sequence = text.length > 0 ? text : defaultSequence;

  return (
    <TypeAnimation
      sequence={sequence}
      speed={speed}
      repeat={repeat}
      wrapper={as}
      cursor={true}
      className={`inline-block  ${className}`}
      style={{ whiteSpace: "pre-line" }}
      {...(cursorClassName ? { cursorClassName } : {})}
    />
  );
}
