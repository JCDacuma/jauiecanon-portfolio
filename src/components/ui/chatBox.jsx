import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "@/context/chatbotContext.jsx";
import ReactMarkdown from "react-markdown";

const CHAT_AVATAR_SRC = "/aboutme/barong_tagalog_light.svg";
const AVATAR_INITIALS = "JC";
const PERSON_NAME = "Jauie Cañon";

const CARD =
  "border border-stone-200 bg-white shadow-md " +
  "dark:border-stone-700 dark:bg-stone-800 dark:shadow-[2px_2px_5px_rgba(0,0,0,0.4),-2px_-2px_5px_rgba(87,83,78,0.25)]";
const PANEL =
  "border border-stone-200 bg-white " +
  "dark:border-stone-800 dark:bg-stone-900 dark:shadow-[6px_6px_14px_rgba(0,0,0,0.45),-6px_-6px_14px_rgba(68,64,60,0.2)]";
const FIELD =
  "border border-stone-200 bg-stone-50 shadow-[inset_2px_2px_4px_rgba(168,162,158,0.25),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] " +
  "dark:border-stone-700 dark:bg-stone-900 dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-2px_-2px_4px_rgba(68,64,60,0.2)]";

const markdownComponents = {
  p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({ ...props }) => (
    <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0" {...props} />
  ),
  li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
  strong: ({ ...props }) => (
    <strong
      className="font-semibold text-emerald-700 dark:text-emerald-400"
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a
      className="text-emerald-600 underline underline-offset-2 hover:text-emerald-500 dark:text-emerald-400"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ inline, ...props }) =>
    inline ? (
      <code
        className="rounded bg-stone-100 px-1 py-0.5 text-[0.85em] dark:bg-stone-700"
        {...props}
      />
    ) : (
      <code
        className="block overflow-x-auto rounded-lg bg-stone-100 p-2 text-[0.85em] dark:bg-stone-700"
        {...props}
      />
    ),
};

function Avatar({ src, size = "h-7 w-7" }) {
  const [broken, setBroken] = useState(false);
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-500 pt-0.5 dark:bg-gray-100`}
    >
      {!broken ? (
        <img
          src={src}
          alt={PERSON_NAME}
          className="h-full w-full object-contain"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          {AVATAR_INITIALS}
        </span>
      )}
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useViewportHeight() {
  const getHeight = () =>
    typeof window === "undefined"
      ? 0
      : (window.visualViewport?.height ?? window.innerHeight);

  const [height, setHeight] = useState(getHeight);

  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => setHeight(getHeight());
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return height;
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

function useTypewriter(text, { active, onTick, onDone }) {
  const [displayed, setDisplayed] = useState(active ? "" : text);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!active || reducedMotion) {
      setDisplayed(text);
      onDone?.();
      return;
    }
    let i = 0;
    const chunk = Math.max(1, Math.round(text.length / 140));
    const id = setInterval(() => {
      i += chunk;
      if (i >= text.length) {
        setDisplayed(text);
        onTick?.();
        onDone?.();
        clearInterval(id);
      } else {
        setDisplayed(text.slice(0, i));
        onTick?.();
      }
    }, 16);
    return () => clearInterval(id);
  }, [text, active, reducedMotion]);
  return {
    displayed,
    isTyping: active && !reducedMotion && displayed.length < text.length,
  };
}

function AssistantBubble({ text, animate, onTick, onDone }) {
  const { displayed } = useTypewriter(text, {
    active: animate,
    onTick,
    onDone,
  });
  return (
    <div
      className={`max-w-[80%] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm ${CARD}`}
    >
      <ReactMarkdown components={markdownComponents}>{displayed}</ReactMarkdown>
    </div>
  );
}

function WaitingIndicator() {
  return (
    <div className="flex items-end justify-start gap-2">
      <Avatar src={CHAT_AVATAR_SRC} />
      <div
        className={`flex items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3 ${CARD}`}
        aria-live="polite"
        aria-label={`${PERSON_NAME} is typing`}
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}

export default function Chatbot() {
  const { isOpenChatBox, toggleChatbox, messages, sendMessage, loading } =
    useChatbot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typedRef = useRef(new Set());
  const isMobile = useIsMobile();
  const viewportHeight = useViewportHeight();

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpenChatBox) scrollToBottom();
  }, [messages, isOpenChatBox, loading]);

  useEffect(() => {
    if (!isOpenChatBox) return;
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(timeout);
  }, [isOpenChatBox]);

  useEffect(() => {
    if (isOpenChatBox && isMobile) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpenChatBox, isMobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 h-14 w-14 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-16 sm:w-16">
      <AnimatePresence>
        {!isOpenChatBox && (
          <motion.button
            key="bubble"
            onClick={toggleChatbox}
            aria-label={`Chat with ${PERSON_NAME}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group absolute bottom-0 right-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_8px_28px_rgba(16,185,129,0.4)] sm:h-16 sm:w-16"
          >
            <span className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="relative h-6 w-6 text-white sm:h-7 sm:w-7"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenChatBox && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 30,
              mass: 0.9,
            }}
            style={isMobile ? { height: viewportHeight } : undefined}
            className={`flex flex-col overflow-hidden
              fixed inset-0 rounded-none
              sm:absolute sm:inset-auto sm:bottom-0 sm:right-0 sm:h-[480px] sm:w-[22rem] sm:rounded-3xl
              md:h-[520px] md:w-[24rem]
              lg:h-[540px] lg:w-[25rem]
              xl:h-[560px] xl:w-[26rem]
              2xl:h-[600px] 2xl:w-[28rem]
              ${PANEL}`}
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))] dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Avatar src={CHAT_AVATAR_SRC} size="h-9 w-9" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-stone-900" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    {PERSON_NAME}
                  </p>
                  <p className="text-xs leading-tight text-emerald-600 dark:text-emerald-400">
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChatbox}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600 active:scale-95 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
              aria-live="polite"
            >
              {messages.map((msg, index) => {
                if (msg.role === "user") {
                  return (
                    <div key={index} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm leading-relaxed text-white">
                        {msg.text}
                      </div>
                    </div>
                  );
                }
                const isLatest = index === messages.length - 1;
                const shouldAnimate = isLatest && !typedRef.current.has(index);
                return (
                  <div
                    key={index}
                    className="flex items-end justify-start gap-2"
                  >
                    <Avatar src={CHAT_AVATAR_SRC} />
                    <AssistantBubble
                      text={msg.text}
                      animate={shouldAnimate}
                      onTick={() => scrollToBottom("auto")}
                      onDone={() => typedRef.current.add(index)}
                    />
                  </div>
                );
              })}
              {loading && <WaitingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-stone-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-stone-800"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${PERSON_NAME.split(" ")[0]}...`}
                disabled={loading}
                className={`flex-1 rounded-2xl px-4 py-2.5 text-base text-stone-700 placeholder-stone-400 outline-none transition-colors focus:border-emerald-400 disabled:opacity-60 dark:text-stone-200 dark:placeholder-stone-500 sm:text-sm ${FIELD}`}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[2px_2px_6px_rgba(6,95,70,0.3)] transition-transform hover:from-emerald-400 hover:to-emerald-500 active:scale-95 disabled:opacity-40"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19V5M5 12l7-7 7 7"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
