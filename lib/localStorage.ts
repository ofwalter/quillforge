export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  color: string;
  position: { x: number; y: number };
  todos: TodoItem[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'quillforge-notes';

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to localStorage:', error);
  }
};

export const loadNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error loading notes from localStorage:', error);
    return [];
  }
};

export const generateNoteId = (): string => {
  return `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateTodoId = (): string => {
  return `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateRandomNoteColor = (): string => {
  const colors = ['#f8e3a3', '#ffccd5', '#c9e4ff', '#c9ffcc', '#e6ccff'];
  return colors[Math.floor(Math.random() * colors.length)];
}; 