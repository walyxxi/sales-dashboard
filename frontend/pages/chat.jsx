import Layout from "@/components/Layout";
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageBubble } from "@/components/Chat/MessageBubble";
import { MessageInput } from "@/components/Chat/MessageInput";
import { useError } from "@/components/Error/ErrorProvider";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { showError } = useError();

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (would be replaced with actual API call)
    await getAIResponse(content)
  };

  // Simple mock responses
  const getAIResponse = useCallback(async (question) => {
    const response = await fetch(`http://localhost:8000/api/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    try {
      if (!response.ok) {
        throw new Error("Failed to fetch ai response data");
      }
      const data = await response.json();
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: data?.response,
        role: "assistant",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      showError("Error fetching ai response data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout title="AI Chat">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 p-4 max-w-[80%] rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 bg-background dark:bg-black p-4 border-t dark:border-gray-700">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}