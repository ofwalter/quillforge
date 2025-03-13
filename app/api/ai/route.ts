import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if API key is configured
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not configured in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Create notes with a title line and bullet points below. Be concise."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200, // Limit output tokens
    });

    const content = completion.choices[0].message.content;
    console.log('Received response from OpenAI:', content);

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('OpenAI API error:', error.message);
    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your OpenAI API key configuration.' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to generate note content: ' + error.message },
      { status: 500 }
    );
  }
} 