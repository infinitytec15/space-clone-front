"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como posso ajudar com sua análise de dados hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Baseado nos dados da região selecionada, observamos um crescimento de 15% no setor de varejo.",
        "Os indicadores demográficos mostram uma população predominantemente jovem nesta área.",
        "Analisando os dados de consumo, recomendo focar em estabelecimentos de alimentação e lazer.",
        "Esta região apresenta alto potencial para negócios de tecnologia devido ao perfil educacional dos moradores.",
        "Os dados indicam uma oportunidade de mercado para serviços de saúde e bem-estar neste bairro.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 p-0 flex items-center justify-center z-50"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-blue-200 dark:border-blue-900 flex flex-col z-50 transition-all duration-300",
        isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[500px]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-800 bg-blue-50 dark:bg-gray-800 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-blue-900 dark:text-blue-100">
            Space Data AI
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${message.sender === "user" ? "flex justify-end" : "flex justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t dark:border-gray-800">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua pergunta..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
