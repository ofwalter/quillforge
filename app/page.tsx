import { NoteBoard } from '@/components/notes/NoteBoard';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f5f2e8] p-4 overflow-hidden">
      <div className="relative w-full h-[calc(100vh-2rem)] overflow-hidden">
        <NoteBoard />
      </div>
    </main>
  );
} 