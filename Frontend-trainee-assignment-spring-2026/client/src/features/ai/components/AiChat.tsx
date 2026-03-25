import { useState, useRef, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import type { Item } from '@/features/ads/api/items.types';
import { useAiChat } from '../hooks/useAiChat';
import { AiChatMessage } from './AiChatMessage';

interface AiChatProps {
  item: Item;
}

export function AiChat({ item }: AiChatProps) {
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useAiChat();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    sendMessage(text, item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">Чат с AI-ассистентом</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Box
          ref={listRef}
          sx={{ maxHeight: 300, overflowY: 'auto', p: 2 }}
        >
          {messages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Задайте вопрос об объявлении
            </Typography>
          )}
          {messages.map((msg, i) => (
            <AiChatMessage key={i} message={msg} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, p: 2, pt: 0 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Написать сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
