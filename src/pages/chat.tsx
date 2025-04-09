import React from "react";
import { ChatContainer } from "../components/chat/chat-container";

export default function Chat() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-gray-500">
          mPLUG/DocOwl2 Chat
        </h1>
        <ChatContainer />
      </div>
    </div>
  );
}
