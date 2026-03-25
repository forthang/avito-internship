import { create } from 'zustand';
import type { ChatMessage } from '../api/ai.types';
import type { Item } from '@/features/ads/api/items.types';
import { aiComplete } from '../api/ai.api';
import { buildChatSystemPrompt } from '../prompts/chat';

interface AiChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string, item: Item) => Promise<void>;
  clearChat: () => void;
}

export const useAiChat = create<AiChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  sendMessage: async (text: string, item: Item) => {
    const userMessage: ChatMessage = { role: 'user', content: text };
    const current = get().messages;

    set({ messages: [...current, userMessage], isLoading: true });

    try {
      const systemMessage: ChatMessage = {
        role: 'system',
        content: buildChatSystemPrompt(item),
      };
      const allMessages = [systemMessage, ...current, userMessage];
      const response = await aiComplete(allMessages);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
      };
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  clearChat: () => set({ messages: [], isLoading: false }),
}));
