import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
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
          }))
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
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
} 