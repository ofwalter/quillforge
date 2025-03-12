# QuillForge

A simple yet effective digital sticky notes application that mimics real post-it notes on a virtual board. Create, organize, and manage your notes with an AI assistant to help you stay productive.

## Features

- Create colorful sticky notes with to-do lists
- Drag and drop notes anywhere on the board
- Mark tasks as complete
- Automatic note organization
- AI assistant for note creation
- Local storage persistence
- Modern, responsive design

## Tech Stack

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Local Storage for data persistence

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quillforge.git
cd quillforge
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating Notes
- Click the "Add Note" button to create a new note
- Use the AI assistant to create notes from natural language requests
- Drag notes by their headers to position them

### Managing Tasks
- Type in the input field at the bottom of a note and press Enter to add tasks
- Click the checkbox to mark tasks as complete
- Hover over tasks to reveal the delete button

### Organizing Notes
- Drag notes anywhere on the board
- Use the "Sort Notes" button to automatically arrange notes in a grid
- Notes are automatically saved to your browser's local storage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
