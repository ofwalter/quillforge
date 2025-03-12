'use client';

import React, { useState, useEffect } from 'react';
import { Note } from './Note';
import { Note as NoteType, loadNotes, saveNotes, generateNoteId, generateRandomNoteColor } from '@/lib/localStorage';

export const NoteBoard: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

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

  const createNewNote = () => {
    const newNote: NoteType = {
      id: generateNoteId(),
      title: 'New Note',
      color: generateRandomNoteColor(),
      position: { 
        x: Math.max(50, Math.random() * (window.innerWidth - 350)), 
        y: Math.max(50, Math.random() * (window.innerHeight - 350)) 
      },
      todos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  useEffect(() => {
    const handleNewNote = (e: KeyboardEvent) => {
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        createNewNote();
      }
    };

    window.addEventListener('keydown', handleNewNote);
    return () => window.removeEventListener('keydown', handleNewNote);
  }, [notes]);

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
      
      <button
        onClick={createNewNote}
        className="fixed bottom-6 right-6 bg-[#3b7ea1] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2c5f7a] transition-colors text-lg font-medium"
      >
        + New Note
      </button>
    </div>
  );
}; 