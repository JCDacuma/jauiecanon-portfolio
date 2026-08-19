import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const ChatbotContext = createContext();

export default function ChatbotProvider({ children }) {
  const [isOpenChatBox, setIsOpenChatBox] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm Jauie. Welcome to my portfolio! Ask me anything about my work, skills, or background.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const toggleChatbox = () => setIsOpenChatBox((prev) => !prev);
  const openChatbox = () => setIsOpenChatBox(true);
  const closeChatbox = () => setIsOpenChatBox(false);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || loading) return;

    const trimmedMsg = userMessage.trim();

    // Append user message locally
    const updatedMessages = [...messages, { role: "user", text: trimmedMsg }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Pass full history to enable multi-turn context
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch response");

      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I couldn't process that request right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Hi! I'm Jauie. Welcome to my portfolio! Ask me anything about my work, skills, or background.",
      },
    ]);
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpenChatBox,
        toggleChatbox,
        openChatbox,
        closeChatbox,
        messages,
        sendMessage,
        loading,
        clearChat,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("There is problem in automated chat system");
  }
  return context;
}
