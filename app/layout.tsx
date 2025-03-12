import type { Metadata } from 'next';
import { Navigation } from '@/components/ui/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuillForge',
  description: 'A modern note-taking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
} 