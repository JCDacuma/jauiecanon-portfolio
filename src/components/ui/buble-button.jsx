import React from "react";

export default function ChatBubbleButton({
  children = "Chat",
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center
                  w-40 h-20 bg-transparent border-none p-0 cursor-pointer
                  focus:outline-none ${className}`}
    >
      {/* Bubble shape */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full drop-shadow-sm
                   transition-transform duration-150 ease-out
                   group-active:scale-95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M108,88
             C64,92 42,128 40,178
             C38,228 60,262 104,270
             C132,275 152,264 168,268
             C176,272 182,286 190,286
             C198,286 202,272 210,267
             C226,262 252,272 288,268
             C336,262 360,224 358,158
             C356,96 316,58 252,50
             C192,43 142,52 108,88 Z"
          className="fill-white stroke-neutral-900
                     transition-colors duration-150
                     group-hover:fill-neutral-50
                     group-active:fill-neutral-100"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Label */}
      <span className="relative z-10 px-10 pb-4 text-neutral-900 font-medium text-base select-none">
        {children}
      </span>
    </button>
  );
}
