'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Note as NoteType, TodoItem, generateTodoId } from '@/lib/localStorage';

interface NoteProps {
  note: NoteType;
  onUpdate: (note: NoteType) => void;
  onDelete: (id: string) => void;
}

export const Note: React.FC<NoteProps> = ({ note, onUpdate, onDelete }) => {
  const [newTodo, setNewTodo] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const noteRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const notePos = useRef({ x: note.position.x, y: note.position.y });

  useEffect(() => {
    notePos.current = note.position;
  }, [note.position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && 
       (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'BUTTON' || 
        e.target.closest('button'))) {
      return;
    }
    
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'move';
    dragStartPos.current = { x: e.clientX - note.position.x, y: e.clientY - note.position.y };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const newX = Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragStartPos.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 300, e.clientY - dragStartPos.current.y));
      
      onUpdate({
        ...note,
        position: { x: newX, y: newY },
        updatedAt: new Date().toISOString()
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, note, onUpdate]);

  const handleTitleSubmit = () => {
    setIsEditing(false);
    onUpdate({
      ...note,
      title,
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      const newTodoItem: TodoItem = {
        id: generateTodoId(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };

      onUpdate({
        ...note,
        todos: [...note.todos, newTodoItem],
        updatedAt: new Date().toISOString()
      });
      setNewTodo('');
    }
  };

  const toggleTodo = (todoId: string) => {
    const updatedTodos = note.todos.map((todo: TodoItem) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    onUpdate({
      ...note,
      todos: updatedTodos,
      updatedAt: new Date().toISOString()
    });
  };

  const deleteTodo = (todoId: string) => {
    onUpdate({
      ...note,
      todos: note.todos.filter((todo: TodoItem) => todo.id !== todoId),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div
      ref={noteRef}
      className={`absolute min-w-[250px] max-w-[350px] p-4 rounded-lg shadow-lg cursor-move bg-white note-transition ${
        isDragging ? 'z-50 shadow-xl' : 'z-10'
      }`}
      style={{
        backgroundColor: note.color || '#fff9b1',
        transform: `translate(${note.position.x}px, ${note.position.y}px)`,
        transition: isDragging ? 'none' : 'all 0.2s ease-out',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="pb-2 border-b border-black/10">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
            className="w-full bg-transparent text-lg font-medium focus:outline-none cursor-text"
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between group">
            <h3
              className="text-lg font-medium truncate flex-1 cursor-text"
              onClick={() => setIsEditing(true)}
            >
              {title || 'New Note'}
            </h3>
            <button
              onClick={() => onDelete(note.id)}
              className="opacity-0 group-hover:opacity-100 ml-2 text-black/40 hover:text-black/60 transition-opacity cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        {note.todos.map((todo: TodoItem) => (
          <div key={todo.id} className="flex items-center group">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 border-2 rounded-sm mr-2 cursor-pointer"
            />
            <span className={`flex-1 text-sm ${todo.completed ? 'line-through opacity-50' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-black/40 hover:text-black/60 transition-opacity px-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleAddTodo}
        placeholder="Add a task..."
        className="mt-3 w-full px-1 py-1 text-sm bg-transparent border-b border-black/10 focus:border-black/20 focus:outline-none placeholder:text-black/40"
      />
    </div>
  );
}; 