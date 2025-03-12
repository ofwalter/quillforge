'use client';

import React, { useState } from 'react';
import { Note, generateNoteId, generateRandomNoteColor } from '@/lib/localStorage';

interface AIChatProps {
  onNoteCreate: (note: Note) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ onNoteCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.isNote && data.note) {
        const newNote: Note = {
          id: generateNoteId(),
          title: data.note.title,
          color: generateRandomNoteColor(),
          position: { x: Math.random() * 100, y: Math.random() * 100 },
          todos: data.note.todos,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        onNoteCreate(newNote);
        setMessage('');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${isOpen ? 'w-80' : 'w-auto'}`}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me to create a note..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b7ea1]"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`mt-2 w-full px-4 py-2 bg-[#3b7ea1] text-white rounded-lg ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2c5f7a]'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Note'}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#3b7ea1] text-white p-3 rounded-full shadow-lg hover:bg-[#2c5f7a]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}; 