import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import React from "react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export function QuestionInput({ onSubmit, isLoading }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the images..."
        className="resize-none !min-h-[60px] border-gray-400"
      />
      {/* <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
       */}
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || (question.trim() === "")}
          className="bg-blue-500 hover:bg-blue-600 text-white transition-colors !h-[60px]"
        >
          <Send className="h-5 w-5 mr-1" />
          <span>Send</span>
        </Button>
    </form>
  );
}
