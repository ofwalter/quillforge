'use client';

import React, { useState } from 'react';
import { FaRobot, FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from '../ui/Tooltip';

interface AIChatProps {
  onGenerateNote: (content: string) => void;
}

export function AIChat({ onGenerateNote }: AIChatProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate note');
      }
      
      if (data.content) {
        onGenerateNote(data.content);
        setInput('');
      } else {
        throw new Error('No content received from AI');
      }
    } catch (error) {
      console.error('Error generating note:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate note');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <Tooltip
          content={
            <div className="w-64">
              <p className="text-sm font-medium mb-1">AI Assistant Help</p>
              <p className="text-xs text-gray-600">Type your ideas or requests, and the AI will convert them into organized notes.</p>
              <p className="text-xs font-medium mt-1 mb-0.5">Examples:</p>
              <ul className="text-xs text-gray-600 list-disc pl-3 space-y-0.5">
                <li>Create a todo list for my project</li>
                <li>Make a note about the meeting highlights</li>
                <li>Summarize these key points...</li>
              </ul>
            </div>
          }
        >
          <button className="p-2 rounded-full bg-primary text-white hover:opacity-80 transition-opacity">
            <FaQuestionCircle className="w-6 h-6" />
          </button>
        </Tooltip>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Generating note..." : "Ask QuillAI to create a note..."}
              className="w-96 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-primary shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              <FaRobot className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 