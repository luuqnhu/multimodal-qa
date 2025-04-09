import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/use-toast";
import { ImageUpload } from "./image-upload";
import { QuestionInput } from "./question-input";
import React from "react";

export function ChatContainer() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const { toast } = useToast();

  // Fetch message history on mount
  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await fetch("http://103.78.3.94:5000/history", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching message history");
      }
      return await response.json();
    },
  });

  // Update messages state when history is loaded
  useEffect(() => {
    console.log(history)
    if (history) {
      setMessages(history);
    }
  }, [history]);

  // Mutation for sending messages
  const messageMutation = useMutation({
    mutationFn: async ({ content, files }: { content: string, files: File[] }) => {
      const formData = new FormData();
      formData.append("query", content);
      files.forEach(file => formData.append("images", file));

      const response = await fetch("http://103.78.3.94:5000/inference", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.query === variables.content ? { ...msg, answer: data.answer } : msg
        )
      );
      setSelectedFiles([]);
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (question: string) => {
    if (!question.trim() && selectedFiles.length === 0) {
      toast({ title: "Error", description: "Please enter a question or upload images", variant: "destructive" });
      return;
    }

    // Add the message to chat instantly
    console.log(question)
    const newMessage = {
      query: question,
      images: selectedFiles.map(file => URL.createObjectURL(file)), // Display images instantly
      answer: "Loading...",
    };

    // setMessages(prevMessages => [...prevMessages, newMessage]);
    setSelectedFiles([])
    setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, newMessage] : [newMessage]);

    // Send the request to the server
    messageMutation.mutate({ content: question, files: selectedFiles });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 min-h-[400px] max-h-[600px] overflow-y-auto p-4 rounded-lg border border-gray-400">
        {messages.length ? messages.map((message, index) => (
          <div key={index} className="flex flex-col gap-2 p-2 rounded">
            <div className="flex gap-2 ml-auto">
              <div className="flex flex-col bg-gray-300 rounded-xl p-4">
                <span className="ml-auto">{message.query}</span>
                {message.images?.length > 0 && (
                  <div>
                    <div className="flex gap-2">
                      {message.images.map((image: string, idx: number) => (
                        <img key={idx} src={image} alt={`Uploaded ${idx}`} width="150" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M8 7.83c-3.08 0-5.59 2.17-5.59 4.84V16h1.27v-3.33c0-2 1.94-3.57 4.32-3.57s4.32 1.6 4.32 3.57V16h1.27v-3.33c0-2.67-2.51-4.84-5.59-4.84m.1-1.22a3.22 3.22 0 0 0 3.1-3.31A3.21 3.21 0 0 0 8.1 0A3.21 3.21 0 0 0 5 3.3a3.22 3.22 0 0 0 3.1 3.31m0-5.32a1.92 1.92 0 0 1 1.81 2a1.93 1.93 0 0 1-1.81 2a1.93 1.93 0 0 1-1.8-2a1.92 1.92 0 0 1 1.8-2"
                ></path>
              </svg>
            </div>
            <div className="flex gap-2 mr-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M6 7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-4 3H0v6h2zm20 0h2v6h-2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                ></path>
              </svg>
              <span className="p-4 bg-gray-300 rounded-xl">{message.answer}</span>
              </div>
          </div>
        )) : <></>}
      </div>

      {/* Upload images */}
      <ImageUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

      {/* Question input */}
      <QuestionInput onSubmit={handleSubmit} isLoading={false} />
    </div>
  );
}