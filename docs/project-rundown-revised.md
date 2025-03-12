# QuillForge - Project Rundown

## Project Overview
QuillForge is a simple yet effective digital sticky notes application that mimics real post-it notes on a virtual board. Users can create colorful notes with headers and to-do lists, mark items as complete, and freely position their notes anywhere on the screen. The application features local storage for persistence across sessions in the same browser. A key feature is the AI assistant that can create notes based on natural language requests, making note creation effortless.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser LocalStorage
- **Drag & Drop**: react-draggable
- **AI Integration**: OpenAI API (for AI chat assistant)
- **Deployment**: Vercel
- **State Management**: React Context API or Zustand

## Project Requirements

### Core Features
1. Create, edit, and delete sticky notes that look like real post-it notes
2. Add, edit, mark complete, and delete to-do items within notes
3. Drag and drop notes to position them anywhere on the screen
4. Sort button to organize notes in a grid layout
5. Color customization for notes
6. Local storage persistence so notes remain available in the browser
7. AI assistant for natural language note creation
8. Responsive design for mobile and desktop
9. Simple two-page structure: Notes Dashboard and Learn More page

### User Stories
1. As a user, I want to create new notes with custom titles and colors that look like real post-it notes
2. As a user, I want to add to-do items to my notes and mark them as complete
3. As a user, I want to freely position my notes on the screen by dragging them
4. As a user, I want to automatically organize my notes with a sort button
5. As a user, I want to ask an AI assistant to create notes for me based on my requests
6. As a user, I want my notes to persist between sessions on the same browser
7. As a user, I want to learn how to use all features of QuillForge through a dedicated page

## Project Specifics

### Data Structure (LocalStorage)

#### Notes Collection
```javascript
{
  notes: [
    {
      id: "note-1234",
      title: "Shopping List",
      color: "#f8e3a3", // Post-it yellow
      position: { x: 100, y: 150 },
      todos: [
        {
          id: "todo-5678",
          text: "Buy milk",
          completed: false,
          createdAt: "2025-03-12T15:30:00Z"
        },
        // More todo items...
      ],
      createdAt: "2025-03-12T15:00:00Z",
      updatedAt: "2025-03-12T15:30:00Z"
    },
    // More notes...
  ]
}
```

### Project Structure
```
quillforge/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── route.ts         # AI assistant API
│   ├── learn/
│   │   ├── page.tsx             # Learn More page
│   ├── page.tsx                 # Main notes dashboard
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── notes/                   # Note-related components
│   │   ├── NoteBoard.tsx        # Container for all notes
│   │   ├── Note.tsx             # Individual note component
│   │   ├── CreateNoteForm.tsx   # Form to create new notes
│   │   ├── TodoItem.tsx         # Todo item within a note
│   │   ├── SortButton.tsx       # Button to organize notes
│   ├── ai/                      # AI-related components
│   │   ├── AIChat.tsx           # AI chat interface
│   │   ├── AIChatMessage.tsx    # Chat message component
├── lib/                         # Utility functions
│   ├── localStorage.ts          # LocalStorage utility functions
│   ├── ai.ts                    # AI service functions
│   ├── utils.ts                 # General utilities
├── public/                      # Static assets
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── .env.local                   # Environment variables
├── package.json                 # Project dependencies
```

## UI Guide

### Color Palette
- Primary Background: `#f5f2e8` (Light Beige)
- Note Colors: 
  - Default Yellow: `#f8e3a3` (Post-it Yellow)
  - Pink: `#ffccd5`
  - Blue: `#c9e4ff`
  - Green: `#c9ffcc`
  - Purple: `#e6ccff`
- Text: `#2d2d2d` (Dark Gray)
- Accent: `#3b7ea1` (Muted Blue)

### Components

#### Note Component
- Designed to look like real post-it notes:
  - Slight rotation (±2 degrees for visual interest)
  - Subtle drop shadow
  - Slightly curled corners with CSS
  - Textured background (subtle noise pattern)
- Proportions similar to real post-it notes (roughly square)
- Drag handle at the top for repositioning
- Header section with title and delete button
- Body section containing to-do list
- Footer with "Add item" input
- Color picker represented as a small palette icon

#### Note Board
- Full-screen canvas with beige background texture
- Notes can be positioned anywhere with z-index stacking
- Floating "Add note" button (bottom right corner)
- Floating Sort button (next to Add note)
- AI chat button (bottom left corner)

#### To-Do Item
- Checkbox styled to match the post-it note aesthetic
- Text that gets strikethrough when completed
- Delete button (small x) that appears on hover
- Subtle hover effect

#### AI Chat Interface
- Chat bubble icon in bottom left corner
- Expandable chat window in a post-it note style
- Message history showing user inputs and AI responses
- "Create note" button appears next to AI responses that contain potential note content
- Simple prompt suggestions for first-time users

## Implementation Guide

### LocalStorage Implementation

```typescript
// lib/localStorage.ts
export interface Note {
  id: string;
  title: string;
  color: string;
  position: { x: number; y: number };
  todos: TodoItem[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

// Save notes to localStorage
export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem('quillforge-notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to localStorage:', error);
  }
};

// Load notes from localStorage
export const loadNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem('quillforge-notes');
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error loading notes from localStorage:', error);
    return [];
  }
};
```

### Drag and Drop Implementation

Using react-draggable for note positioning:

```typescript
// components/notes/Note.tsx
import Draggable from 'react-draggable';

const Note: React.FC<NoteProps> = ({ note, onUpdate, onDelete }) => {
  const handleDragStop = (e: any, data: any) => {
    onUpdate({
      ...note,
      position: { x: data.x, y: data.y }
    });
  };

  return (
    <Draggable
      handle=".drag-handle"
      defaultPosition={note.position}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div className="note" style={{ backgroundColor: note.color }}>
        <div className="drag-handle">
          <h3>{note.title}</h3>
          <button onClick={() => onDelete(note.id)}>×</button>
        </div>
        {/* Todo list rendering */}
      </div>
    </Draggable>
  );
};
```

### Sort Function Implementation

```typescript
// components/notes/SortButton.tsx
const SortButton: React.FC<{ onSort: () => void }> = ({ onSort }) => {
  return (
    <button 
      className="sort-button" 
      onClick={onSort}
      title="Organize notes in a grid"
    >
      <svg>...</svg> {/* Grid icon */}
    </button>
  );
};

// components/notes/NoteBoard.tsx
const NoteBoard: React.FC = () => {
  // ...other code

  const handleSortNotes = () => {
    const sortedNotes = [...notes].map((note, index) => {
      // Calculate grid position
      const column = index % 4;
      const row = Math.floor(index / 4);
      
      return {
        ...note,
        position: {
          x: 20 + (column * 300),
          y: 20 + (row * 320)
        }
      };
    });
    
    setNotes(sortedNotes);
    saveNotes(sortedNotes);
  };

  return (
    <div className="note-board">
      {/* Note rendering */}
      <SortButton onSort={handleSortNotes} />
    </div>
  );
};
```

### AI Assistant Implementation

```typescript
// app/api/ai/route.ts
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates sticky notes with to-do lists. For requests to create notes, provide a JSON response with 'title' and an array of 'todos'."
        },
        { role: "user", content: message }
      ],
      response_format: { type: "json_object" }
    });
    
    const content = response.choices[0].message.content;
    let parsedContent;
    
    try {
      parsedContent = JSON.parse(content);
      // Check if this looks like a note (has title and todos)
      const isNote = parsedContent.title && Array.isArray(parsedContent.todos);
      
      return NextResponse.json({
        message: isNote ? "I've created a note for you!" : content,
        isNote,
        note: isNote ? {
          title: parsedContent.title,
          todos: parsedContent.todos.map((text: string) => ({
            id: Date.now() + Math.random().toString(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
          })),
          color: generateRandomNoteColor(),
          position: { x: 50, y: 50 },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } : null
      });
    } catch (error) {
      // If we can't parse JSON, just return the message
      return NextResponse.json({
        message: content,
        isNote: false,
        note: null
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error communicating with AI service" },
      { status: 500 }
    );
  }
}

function generateRandomNoteColor() {
  const colors = ['#f8e3a3', '#ffccd5', '#c9e4ff', '#c9ffcc', '#e6ccff'];
  return colors[Math.floor(Math.random() * colors.length)];
}
```

## Implementation Timeline
1. **Day 1-2**: Project setup, UI design for post-it notes
2. **Day 3-4**: Core note and to-do functionality with local storage
3. **Day 5-6**: Drag and drop implementation, sort functionality
4. **Day 7-8**: AI assistant integration
5. **Day 9-10**: Learn More page, testing, and deployment

## Learn More Page Content Outline
1. Welcome to QuillForge
2. Creating Notes
   - Manual creation
   - AI-assisted creation
3. Managing Your Notes
   - Adding to-do items
   - Marking items complete
   - Editing and deleting
4. Organizing Your Board
   - Dragging notes
   - Using the sort function
5. Persistence and Data
   - How local storage works
   - Browser limitations
   - Export/import (future feature)
6. Tips and Tricks
   - Keyboard shortcuts
   - Color coding for different purposes
   - AI prompt suggestions
