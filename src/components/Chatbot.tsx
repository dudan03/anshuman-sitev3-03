import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm the Dudan Technology AI Assistant. How can I help you learn more about our custom chatbot, web, and app development services, or Anshuman's portfolio?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let aiMessage = "";
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  aiMessage += parsed.text;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = aiMessage;
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Error parsing stream data", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-vibrant-blue text-white rounded-full shadow-lg shadow-vibrant-blue/20 hover:scale-110 transition-transform z-50 group flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="group-hover:animate-breathe" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 sm:w-[400px] h-[550px] max-h-[80vh] bg-[#050505]/95 liquid-glass rounded-2xl shadow-2xl shadow-vibrant-blue/10 flex flex-col z-50 border border-white/5 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-vibrant-blue/10 rounded-xl text-vibrant-blue">
                  <Bot size={22} className="icon-glow-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-white tracking-wide">AI Assistant</h3>
                  <p className="text-[11px] uppercase tracking-wider text-white/40 mt-0.5">Dudan Technology</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-xl hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-vibrant-blue text-white rounded-tr-sm shadow-lg shadow-vibrant-blue/20"
                        : "bg-white/5 text-white/90 rounded-tl-sm border border-white/5 backdrop-blur-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-white/90 rounded-2xl rounded-tl-sm p-4 border border-white/5 backdrop-blur-md">
                    <Loader2 size={16} className="animate-spin text-white/50" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-[#030303]/80 backdrop-blur-md">
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-5 pr-14 text-sm text-white placeholder-white/30 focus:outline-none focus:border-vibrant-blue/50 focus:bg-white/10 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 text-vibrant-blue hover:text-white disabled:opacity-30 disabled:hover:text-vibrant-blue transition-all rounded-full bg-vibrant-blue/0 hover:bg-vibrant-blue/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
