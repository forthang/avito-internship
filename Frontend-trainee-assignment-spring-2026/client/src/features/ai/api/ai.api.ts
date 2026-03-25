import type { ChatMessage } from './ai.types';

interface XaiResponse {
  choices: { message: { content: string } }[];
}

export async function aiComplete(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_XAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-3-mini-fast',
      messages,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status}`);
  }

  const data: XaiResponse = await response.json();
  return data.choices[0].message.content;
}
