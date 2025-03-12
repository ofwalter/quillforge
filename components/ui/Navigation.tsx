'use client';

import Link from 'next/link';
import { FaFeather } from 'react-icons/fa';

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 p-4 z-50">
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
          <FaFeather className="w-6 h-6" />
          <span className="text-xl font-semibold">QuillForge</span>
        </Link>
        <Link
          href="/learn"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors text-sm"
        >
          Learn More
        </Link>
      </div>
    </nav>
  );
}; 