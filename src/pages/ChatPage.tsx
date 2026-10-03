import { useState, useRef, useEffect } from 'react';
import { Send, Heart, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import { type ChatMessage, getAssistantResponse, suggestedPrompts } from '@/data/chat';

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm HealthyMate, your personal wellness assistant. I can share general tips about sleep, hydration, nutrition, exercise, stress, and study habits.\n\nWhat would you like to talk about today?",
  timestamp: Date.now(),
};

async function fetchAIReply(messages: { role: string; content: string }[]): Promise<string> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-chat`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  if (typeof data.reply !== 'string') {
    throw new Error('Unexpected response format');
  }
  return data.reply;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError(null);
    setUsingFallback(false);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setIsTyping(true);

    try {
      const replyText = await fetchAIReply(
        allMessages.map((m) => ({ role: m.role, content: m.content })),
      );
      const reply: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const fallback = getAssistantResponse(trimmed);
      const reply: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: fallback,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
      setUsingFallback(true);
      setError(
        err instanceof Error && err.message.includes('not configured')
          ? 'AI service not configured — showing sample responses. Add your Gemini API key to enable live AI.'
          : 'Could not reach the AI service — showing a sample response instead.',
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([welcomeMessage]);
    setError(null);
    setUsingFallback(false);
  };

  const showPrompts = messages.length === 1;

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 pt-6 pb-24 md:pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-sage-500 flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="font-bold text-sage-800 text-lg leading-tight">HealthyMate AI</h1>
            <p className="text-xs text-sage-500">General wellness suggestions, not medical advice</p>
          </div>
        </div>
        {messages.length > 1 && (
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-sage-400 hover:text-sage-600 hover:bg-sage-50 transition-all"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-coral-50 border border-coral-100 rounded-xl px-3 py-2.5 mb-3 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-coral-500 flex-shrink-0" />
          <p className="text-xs text-coral-700">{error}</p>
        </div>
      )}

      {usingFallback && !error && (
        <div className="flex items-center gap-2 bg-cream-100 border border-cream-200 rounded-xl px-3 py-2.5 mb-3">
          <AlertCircle className="w-4 h-4 text-cream-500 flex-shrink-0" />
          <p className="text-xs text-sage-600">Using sample responses — add your Gemini API key for live AI.</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-sage-50 flex flex-col h-[calc(100vh-260px)] md:h-[calc(100vh-200px)] overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-sage-500 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-white" fill="white" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-sage-500 text-white rounded-tr-sm'
                    : 'bg-cream-50 text-sage-800 rounded-tl-sm border border-cream-100'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                <p className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-sage-200' : 'text-sage-400'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-sage-500 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <div className="bg-cream-50 border border-cream-100 rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-1">
                <span className="w-2 h-2 bg-sage-300 rounded-full animate-pulse-soft" />
                <span className="w-2 h-2 bg-sage-300 rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-sage-300 rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Suggested prompts */}
        {showPrompts && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-600 bg-cream-50 hover:bg-cream-100 border border-cream-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <Sparkles className="w-3 h-3 text-mango-400" />
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-sage-50 p-3 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask about sleep, nutrition, stress..."
            className="flex-1 bg-cream-50 text-sage-800 placeholder-sage-400 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-sage-200 transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-sage-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sage-600 active:scale-95 transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
