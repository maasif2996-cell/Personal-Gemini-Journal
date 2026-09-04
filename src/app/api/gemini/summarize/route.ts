import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, getGeminiModelName } from '@/lib/gemini';
import { ReflectionSummary } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, title } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'At least one message is required to generate a summary.' },
        { status: 400 }
      );
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'GEMINI_API_KEY missing';
      return NextResponse.json(
        { error: message, isConfigError: true },
        { status: 503 }
      );
    }

    const transcript = messages
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User Reflection' : 'Gemini'}: ${m.content}`)
      .join('\n\n');

    const prompt = `You are an expert cognitive reflection assistant.
Please analyze the following journal entry/conversation titled "${title || 'Untitled Journal Reflection'}".
Provide an insightful synthesis formatted strictly as JSON with this exact schema:
{
  "overview": "A 2-3 sentence executive reflection on what the user shared.",
  "emotionalTone": "A short descriptive phrase of their emotional tone (e.g., 'Contemplative & Cautiously Optimistic')",
  "keyInsights": ["Insight 1", "Insight 2", "Insight 3"],
  "suggestedPrompts": ["Follow-up question 1", "Follow-up question 2"],
  "actionableSteps": ["Concrete micro-step 1", "Concrete micro-step 2"]
}

Journal Transcript:
${transcript}

IMPORTANT: Output ONLY valid, raw JSON. Do not include markdown code blocks or additional commentary.`;

    const model = getGeminiModelName();
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsedData: Partial<ReflectionSummary>;
    try {
      // Clean potential json code block if returned
      const cleanJson = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      parsedData = JSON.parse(cleanJson);
    } catch {
      parsedData = {
        overview: responseText,
        keyInsights: ['Reflection successfully generated.'],
      };
    }

    const summary: ReflectionSummary = {
      overview: parsedData.overview || 'Reflected on recent thoughts and experiences.',
      emotionalTone: parsedData.emotionalTone || 'Reflective',
      keyInsights: parsedData.keyInsights || [],
      suggestedPrompts: parsedData.suggestedPrompts || [],
      actionableSteps: parsedData.actionableSteps || [],
      generatedAt: Date.now(),
    };

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error: unknown) {
    console.error('Gemini Summarize API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate journal summary';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
