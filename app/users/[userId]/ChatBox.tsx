// components/ChatBox.tsx
"use client";
import React, { useState } from "react";

const ChatBox: React.FC<{ user: string }> = ({ user }) => {
  const [messages, setMessages] = useState([
    { from: user, text: "Hi," },

    { from: user, text: "how can I help you today?" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-lg p-6 shadow-lg font-sans">
      <div className="overflow-y-auto h-96">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              msg.from === "user"
                ? "bg-black text-white text-right"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.from !== "user" && (
              <strong className="block mb-1">{msg.from}</strong>
            )}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
