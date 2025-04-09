import { type Message } from "../../../shared/schema";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";
import { User, Bot } from "lucide-react";
import React from "react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 ${message.isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className={message.isUser ? "bg-primary" : "bg-secondary"}>
        {message.isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </Avatar>
      <Card className="flex-1">
        <CardContent className="p-4">
          {message.images && message.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {message.images.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`Uploaded image ${index + 1}`}
                  className="rounded-md max-h-48 object-contain"
                />
              ))}
            </div>
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.response && (
            <p className="mt-2 text-muted-foreground">{message.response}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
