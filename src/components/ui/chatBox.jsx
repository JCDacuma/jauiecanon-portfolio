import React, { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/context/chatbotContext.jsx";
import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "react-responsive";

const FAB_AVATAR_SRC = "/fab-avatar.png";
const CHAT_AVATAR_SRC = "/aboutme/barong_tagalog_light.svg";
const AVATAR_INITIALS = "JC";
const PERSON_NAME = "Jauie Cañon";

const TEASER_MESSAGES = [
  " Got questions? I'm here to help!",
  "👋 Hi there! Need any assistance?",
  "🤔 Have a question? Let's chat!",
  " I can answer your questions!",
  " Feel free to ask me anything!",
];

const MESSAGE_DISPLAY_DURATION_MS = 6000; // Show message for 4 seconds
const MESSAGE_INTERVAL_MS = 10000; // 10 seconds between messages

const CARD =
  "border border-stone-200 bg-white shadow-md " +
  "dark:border-stone-700 dark:bg-stone-800 dark:shadow-[2px_2px_5px_rgba(0,0,0,0.4),-2px_-2px_5px_rgba(87,83,78,0.25)]";
const PANEL =
  "border border-stone-200 bg-white  " +
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
      className={`flex ${size} pt-0.5 bg-gray-500 dark:bg-gray-100 shrink-0 items-center justify-center overflow-hidden rounded-full `}
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
  const { displayed, isTyping } = useTypewriter(text, {
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

// Rotating teaser message that appears above the FAB
function RotatingTeaser({ message, visible, onOpen }) {
  const reducedMotion = useReducedMotion();

  if (!visible) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      className={`group relative mb-3 w-[15.5rem] max-w-[70vw] cursor-pointer text-left
        ${reducedMotion ? "" : "animate-[teaser-pop_0.35s_ease-out]"}`}
    >
      <div
        className={`flex  items-start gap-2.5 rounded-2xl rounded-br-md py-3 pl-5 pr-3 text-sm leading-snug text-stone-700 transition-transform group-hover:-translate-y-0.5 dark:text-stone-200 ${CARD}`}
      >
        <p className="pt-0.5 text-[13px]">{message}</p>
      </div>

      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800"
      />
    </div>
  );
}

export default function Chatbot() {
  const { isOpenChatBox, toggleChatbox, messages, sendMessage, loading } =
    useChatbot();
  const [input, setInput] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typedRef = useRef(new Set());
  const messageIntervalRef = useRef(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpenChatBox) scrollToBottom();
  }, [messages, isOpenChatBox, loading]);

  useEffect(() => {
    if (isOpenChatBox) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpenChatBox]);

  // Rotating teaser messages logic
  useEffect(() => {
    if (isOpenChatBox) return;

    const cycleMessages = () => {
      const addedTimerNextMessage = isMobile ? 60000 : 15000;
      setShowMessage(true);

      // Hide message after display duration
      const hideTimeout = setTimeout(() => {
        setShowMessage(false);
      }, MESSAGE_DISPLAY_DURATION_MS);

      // Advance to next message after interval
      const advanceTimeout = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % TEASER_MESSAGES.length);
      }, MESSAGE_DISPLAY_DURATION_MS + addedTimerNextMessage);

      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(advanceTimeout);
      };
    };

    // Start the cycle
    const initialDelay = setTimeout(() => {
      cycleMessages();

      // Set up recurring interval
      messageIntervalRef.current = setInterval(() => {
        cycleMessages();
      }, MESSAGE_INTERVAL_MS + MESSAGE_DISPLAY_DURATION_MS);
    }, 2000);

    return () => {
      clearTimeout(initialDelay);
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    };
  }, [isOpenChatBox]);

  // Clear interval when component unmounts or chat opens
  useEffect(() => {
    if (isOpenChatBox && messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
      messageIntervalRef.current = null;
    }
  }, [isOpenChatBox]);

  const openFromTeaser = () => {
    toggleChatbox();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  };

  const currentMessage = TEASER_MESSAGES[currentMessageIndex];

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex flex-col items-end sm:inset-x-auto sm:right-6 sm:bottom-6">
      <style>{`
        @keyframes teaser-pop {
          0% { opacity: 0; transform: translateY(8px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fab-ring {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      {!isOpenChatBox && showMessage && (
        <RotatingTeaser
          message={currentMessage}
          visible={showMessage}
          onOpen={openFromTeaser}
        />
      )}

      {!isOpenChatBox && (
        <button
          onClick={() => {
            toggleChatbox();
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Chat with ${PERSON_NAME}`}
          className={`relative ml-auto flex sm:h-12 bg-stone-200 sm:w-15 h-10 w-12 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-1 border-stone-200 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.20)]`}
        >
          {/* Pulse ring animation when message is showing */}
          {showMessage && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-2xl bg-emerald-400/40"
              style={{ animation: "fab-ring 1.8s ease-out infinite" }}
            />
          )}

          {/* Three dots container */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="sm:h-1.5 sm:w-1.5 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="sm:h-1.5 sm:w-1.5 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="sm:h-1.5 sm:w-1.5 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          </div>
        </button>
      )}

      {isOpenChatBox && (
        <div
          className={`flex h-[75vh] w-full flex-col overflow-hidden rounded-3xl
            sm:h-[480px] sm:w-[22rem]
            md:h-[520px] md:w-[24rem]
            lg:h-[540px] lg:w-[25rem]
            xl:h-[560px] xl:w-[26rem]
            2xl:h-[600px] 2xl:w-[28rem]
            max-h-[85vh] ${PANEL}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
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
          {/* Messages */}
          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            aria-live="polite"
          >
            {messages.map((msg, index) => {
              if (msg.role === "user") {
                return (
                  <div key={index} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-emerald-600 px-4 py-2.5 text-sm leading-relaxed text-white">
                      {msg.text}
                    </div>
                  </div>
                );
              }
              const isLatest = index === messages.length - 1;
              const shouldAnimate = isLatest && !typedRef.current.has(index);
              return (
                <div key={index} className="flex items-end justify-start gap-2">
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
          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-stone-200 p-3 dark:border-stone-800"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${PERSON_NAME.split(" ")[0]}...`}
              disabled={loading}
              className={`flex-1 rounded-2xl px-4 py-2.5 text-sm text-stone-700 placeholder-stone-400 outline-none transition-colors focus:border-emerald-400 disabled:opacity-60 dark:text-stone-200 dark:placeholder-stone-500 ${FIELD}`}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[2px_2px_6px_rgba(6,95,70,0.3)] transition-transform hover:bg-emerald-500 active:scale-95 disabled:opacity-40 disabled:hover:bg-emerald-600"
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
        </div>
      )}
    </div>
  );
}
