import type { ChatMessage } from './ai.types';

interface AiResponse {
  choices: { message: { content: string } }[];
}

const PROVIDERS = {
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
  },
  xai: {
    url: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-3-mini-fast',
  },
};

function getProvider() {
  const name = (process.env.REACT_APP_AI_PROVIDER || 'groq') as keyof typeof PROVIDERS;
  return PROVIDERS[name] ?? PROVIDERS.groq;
}

export async function aiComplete(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const provider = getProvider();
  const apiKey = process.env.REACT_APP_AI_API_KEY || process.env.REACT_APP_XAI_API_KEY;

  const response = await fetch(provider.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
    }),
    signal,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`AI request failed: ${response.status} ${text}`);
  }

  const data: AiResponse = await response.json();
  return data.choices[0].message.content;
}
