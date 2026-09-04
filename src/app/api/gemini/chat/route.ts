import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, getGeminiModelName, JOURNAL_PERSONA_PROMPTS } from '@/lib/gemini';
import { AIMode } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, history = [], mode = 'reflection' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Check for Gemini API key
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'GEMINI_API_KEY missing';
      return NextResponse.json(
        {
          error: message,
          isConfigError: true,
        },
        { status: 503 }
      );
    }

    const systemInstruction = JOURNAL_PERSONA_PROMPTS[mode as AIMode] || JOURNAL_PERSONA_PROMPTS.reflection;
    const model = getGeminiModelName();

    // Map conversation history into Gemini format
    const contents = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Append the current turn
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const replyText = response.text || 'I listened carefully to your reflection, but could not generate a response.';

    return NextResponse.json({
      success: true,
      text: replyText,
      modelUsed: model,
    });
  } catch (error: unknown) {
    console.error('Gemini Chat API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error while processing Gemini response';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
