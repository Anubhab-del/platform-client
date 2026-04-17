import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, User, Sparkles, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: `Hi there! I'm **LearnBot** 🤖 — your AI learning assistant on LearnPro.\n\nI can help you with:\n- Explaining concepts from your courses\n- Coding questions with clear examples\n- Study strategies and learning tips\n- Career advice in tech\n\nWhat would you like to learn today?`,
  },
];

function renderInline(text) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-black/30 text-emerald-300 px-1.5 py-0.5 rounded text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderContent(text) {
  const lines = text.split('\n');
  const output = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      output.push(
        <ul key={`list-${output.length}`} className="space-y-1 my-1 ml-2">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      if (line.trim() === '') {
        if (i > 0) output.push(<div key={`gap-${i}`} className="h-1" />);
      } else {
        output.push(
          <p key={`p-${i}`} className="text-sm leading-relaxed">
            {renderInline(line)}
          </p>
        );
      }
    }
  });

  flushList();
  return output;
}

function MessageBubble({ msg }) {
  const isBot = msg.role === 'assistant';
  return (
    <div className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${isBot ? 'bg-brand-500/20 border border-brand-500/30' : 'bg-surface-700 border border-white/10'}`}>
        {isBot
          ? <Bot  className="w-3.5 h-3.5 text-brand-400" />
          : <User className="w-3.5 h-3.5 text-white/60" />
        }
      </div>
      <div className={`max-w-[85%] px-4 py-3 rounded-2xl
                      ${isBot
                        ? 'bg-surface-800 border border-white/10 text-white/85 rounded-tl-sm'
                        : 'bg-brand-600 text-white rounded-tr-sm'
                      }`}>
        <div className="space-y-1">{renderContent(msg.content)}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30
                      flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-brand-400" />
      </div>
      <div className="bg-surface-800 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

export default function ChatBot() {
  const { token } = useAuth();
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    return () => clearTimeout(t);
  }, [open, messages, loading]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  const resizeTextarea = (el) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setErrorMsg('');

    // Use token from AuthContext — this is the most reliable source
    const activeToken = token || localStorage.getItem('learnpro_token');

    if (!activeToken) {
      setErrorMsg('You need to be logged in to use LearnBot.');
      return;
    }

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (inputRef.current) inputRef.current.style.height = 'auto';

    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .slice(-10)
        .map(({ role, content }) => ({ role, content }));

      // Build the correct API URL
      // VITE_API_URL must be set on Vercel e.g. https://your-server.onrender.com/api
      const apiBase = import.meta.env.VITE_API_URL || '/api';
      const chatUrl = `${apiBase}/chat`;

      console.log('ChatBot sending to:', chatUrl);
      console.log('Token present:', !!activeToken);

      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ messages: history }),
      });

      console.log('ChatBot response status:', response.status);

      // Read the response body once
      const responseText = await response.text();
      console.log('ChatBot raw response:', responseText);

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(`Server returned non-JSON: ${responseText.slice(0, 100)}`);
      }

      if (response.status === 401) {
        setErrorMsg('Session expired. Please log out and log back in.');
        setLoading(false);
        return;
      }

      if (response.status === 500) {
        throw new Error(data.message || 'Server error. Check your Groq API key on Render.');
      }

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      if (!data.message) {
        throw new Error('No message in response from server.');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);

    } catch (err) {
      console.error('ChatBot error:', err.message);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `❌ ${err.message || 'Something went wrong. Please try again.'}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setErrorMsg('');
  };

  const suggestions = [
    'Explain closures in JavaScript',
    'What is gradient descent?',
    'Tips for learning React fast',
    'How to crack DSA interviews',
  ];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close LearnBot' : 'Open LearnBot'}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl
                    flex items-center justify-center transition-all duration-300 ease-out
                    ${open
                      ? 'bg-surface-800 border border-white/20 shadow-black/40'
                      : 'bg-brand-600 shadow-brand-600/40 hover:bg-brand-500 hover:scale-105'
                    }`}
      >
        <div className="relative">
          {!open && <span className="absolute -inset-1 rounded-full bg-brand-500/30 animate-ping" />}
          {open
            ? <X        className="w-5 h-5 text-white relative z-10" />
            : <Sparkles className="w-5 h-5 text-white relative z-10" />
          }
        </div>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50
                        w-[340px] sm:w-[390px]
                        h-[560px] max-h-[calc(100dvh-120px)]
                        flex flex-col rounded-2xl border border-white/10
                        bg-surface-950/95 backdrop-blur-xl
                        shadow-2xl shadow-black/60 animate-slide-up overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 flex-shrink-0 bg-surface-900/60">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-brand-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">LearnBot</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <p className="text-xs text-white/40">AI assistant · online</p>
              </div>
            </div>
            <button onClick={clearChat} title="Clear conversation"
              className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setOpen(false)} title="Close"
              className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
            {loading && <TypingIndicator />}
            {errorMsg && (
              <div className="text-center py-2">
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                  {errorMsg}
                </p>
              </div>
            )}
            <div ref={bottomRef} className="h-px" />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && !loading && (
            <div className="px-4 pb-3 flex-shrink-0">
              <p className="text-xs text-white/30 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map(s => (
                  <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50
                               hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-150">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex items-end gap-2 px-4 pb-4 pt-3 border-t border-white/10 flex-shrink-0 bg-surface-900/40">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); resizeTextarea(e.target); }}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              rows={1}
              disabled={loading}
              className="flex-1 min-w-0 bg-surface-800 border border-white/10 rounded-xl
                         px-3.5 py-2.5 text-sm text-white placeholder-white/30
                         outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30
                         resize-none transition-all duration-200 max-h-28 scrollbar-hide disabled:opacity-50"
              style={{ height: '42px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center
                         hover:bg-brand-500 disabled:opacity-40 disabled:pointer-events-none
                         transition-all duration-150 active:scale-95"
            >
              {loading
                ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                : <Send    className="w-4 h-4 text-white" />
              }
            </button>
          </div>
        </div>
      )}
    </>
  );
}