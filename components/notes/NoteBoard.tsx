'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

  const createNewNote = useCallback(() => {
    const newNote: NoteType = {
      id: generateNoteId(),
      title: 'New Note',
      todos: [],
      position: { x: Math.random() * 100, y: Math.random() * 100 },
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