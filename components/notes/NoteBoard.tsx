'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Note } from './Note';
import { Note as NoteType, loadNotes, saveNotes, generateNoteId, generateRandomNoteColor } from '@/lib/localStorage';
import { FaTrash } from 'react-icons/fa';

export const NoteBoard: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const savedNotes = loadNotes();
    if (savedNotes.length === 0) {
      // Create a welcome note if no notes exist
      const welcomeNote: NoteType = {
        id: generateNoteId(),
        title: 'Welcome to QuillForge! 👋',
        color: '#f8e3a3',
        position: { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 },
        todos: [
          { id: generateNoteId(), text: 'Click and drag this note to move it', completed: false, createdAt: new Date().toISOString() },
          { id: generateNoteId(), text: 'Add new notes with the + button', completed: false, createdAt: new Date().toISOString() },
          { id: generateNoteId(), text: 'Type below to add tasks', completed: false, createdAt: new Date().toISOString() }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([welcomeNote]);
      saveNotes([welcomeNote]);
    } else {
      setNotes(savedNotes);
    }
  }, []);

  const handleNoteUpdate = (updatedNote: NoteType) => {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const handleNoteDelete = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const createNewNote = useCallback(() => {
    const navbarWidth = 300; // Width of the navbar area
    const navbarHeight = 80; // Height of the navbar area
    const buttonAreaWidth = 200; // Width of the button area (adjusted for both buttons)
    const buttonAreaHeight = 80; // Height of the button area

    // Calculate a random position that avoids the navbar and button areas
    let x, y;
    do {
      x = Math.random() * (window.innerWidth - 350); // Account for note width
      y = Math.random() * (window.innerHeight - 150); // Account for note height
    } while (
      (y < navbarHeight && x < navbarWidth) || // Avoid navbar area
      (y > window.innerHeight - buttonAreaHeight && x > window.innerWidth - buttonAreaWidth) // Avoid button area
    );

    const newNote: NoteType = {
      id: generateNoteId(),
      title: 'New Note',
      todos: [],
      position: { x, y },
      color: generateRandomNoteColor(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes, newNote];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNewNote();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [createNewNote]);

  const handleDeleteAllNotes = () => {
    setNotes([]);
    saveNotes([]);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          onUpdate={handleNoteUpdate}
          onDelete={handleNoteDelete}
        />
      ))}
      
      <div className="fixed bottom-6 right-6 flex gap-3">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-colors text-lg"
          title="Delete all notes"
        >
          <FaTrash />
        </button>
        <button
          onClick={createNewNote}
          className="bg-[#3b7ea1] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2c5f7a] transition-colors text-lg font-medium"
        >
          + New Note
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Delete All Notes?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All notes will be permanently deleted.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllNotes}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 