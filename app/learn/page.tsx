import Link from 'next/link';
import { FaFeather, FaPlus, FaMousePointer, FaPalette, FaCheck, FaTrash, FaDatabase, FaRobot, FaMagic, FaBrain } from 'react-icons/fa';

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background p-8 pt-20 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity"
          >
            <FaFeather className="w-8 h-8" />
            <span className="text-3xl font-semibold">QuillForge</span>
          </Link>

          <h1 className="text-lg font-semibold text-[#3b7ea1]">
            Created by Owen Walter
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4 text-primary">
              <FaPlus className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Creating Notes</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <FaMousePointer className="w-4 h-4 text-primary/60" />
                <span>Click the &quot;Add Note&quot; button in the bottom right</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMousePointer className="w-4 h-4 text-primary/60" />
                <span>Click and drag anywhere on the note to move it</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPalette className="w-4 h-4 text-primary/60" />
                <span>Each note has a unique color for organization</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4 text-primary">
              <FaCheck className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Managing Tasks</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <FaPlus className="w-4 h-4 text-primary/60" />
                <span>Type in the bottom field to add tasks</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheck className="w-4 h-4 text-primary/60" />
                <span>Click checkboxes to mark tasks complete</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaTrash className="w-4 h-4 text-primary/60" />
                <span>Hover and click × to remove tasks or notes</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4 text-primary">
              <FaRobot className="w-6 h-6" />
              <h2 className="text-xl font-semibold">QuillAI Assistant</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <FaMagic className="w-4 h-4 text-primary/60" />
                <span>Type your ideas in the QuillAI chat</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaBrain className="w-4 h-4 text-primary/60" />
                <span>QuillAI converts your input into organized notes</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaRobot className="w-4 h-4 text-primary/60" />
                <span>Perfect for quick lists and meeting notes</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4 text-primary">
              <FaDatabase className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Data Storage</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <FaDatabase className="w-4 h-4 text-primary/60" />
                <span>Notes save automatically to local storage</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheck className="w-4 h-4 text-primary/60" />
                <span>Your notes persist between sessions</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaTrash className="w-4 h-4 text-primary/60" />
                <span>Clear all notes with the trash button</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
} 