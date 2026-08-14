import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Send, Bot, User, Loader2, RefreshCw, ArrowLeft, Sparkles, Cloud, Cpu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';

// Same deferred import as Hero — keeps the particles engine in one shared
// async chunk instead of being bundled into this page.
const ParticlesBackground = lazy(() => import('@/components/ParticlesBackground'));

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
  error?: boolean;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey! I'm Madhur's AI assistant. Ask me anything about Madhur - his projects, skills, experience, or how to get in touch with him!"
};

const SUGGESTED_QUESTIONS = [
  'What projects has Madhur built?',
  'What are his strongest skills?',
  'Tell me about SpeakInsights',
  'How can I get in touch?',
];

interface HealthInfo {
  model: string;
  cloud: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [health, setHealth] = useState<HealthInfo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // The theme class is normally applied by the Header on the home page; apply
  // it here too so landing directly on /chat still honors the saved theme.
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  // In dev the Vite server proxies /api -> the local FastAPI backend, which avoids
  // CORS entirely. Set VITE_CHAT_API_BASE_URL to point at a deployed backend.
  const API_BASE_URL = (import.meta.env.VITE_CHAT_API_BASE_URL || '/api').replace(/\/$/, '');
  const API_URL = `${API_BASE_URL}/chat`;

  // Show which model is answering (Ollama cloud model vs. local fallback).
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/health`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!cancelled && data?.model) {
          setHealth({ model: data.model, cloud: Boolean(data.cloud) });
        }
      })
      .catch(() => { /* backend offline; the badge just stays hidden */ });
    return () => { cancelled = true; };
  }, [API_BASE_URL]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add a placeholder for the assistant response
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      isLoading: true
    }]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // A misconfigured host can rewrite /api/chat to index.html with a 200;
      // treat anything that isn't an SSE stream as a connection failure.
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/event-stream')) {
        throw new Error(`Unexpected response type: ${contentType}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let fullContent = '';
      let hadError = false;
      // SSE events arrive in arbitrarily sized chunks, so a single event can be
      // split across reads. Buffer until we see a newline before parsing.
      let buffer = '';

      const handleLine = (line: string) => {
        if (!line.startsWith('data: ')) return;
        try {
          const data = JSON.parse(line.slice(6));
          if (data.error) {
            fullContent = `Sorry, I encountered an error: ${data.error}`;
            hadError = true;
          } else if (data.content) {
            fullContent += data.content;
          }

          setMessages(prev => prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: fullContent, error: hadError }
              : msg
          ));
        } catch (parseError) {
          console.error('Parse error:', parseError, line);
        }
      };

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        // stream: true keeps multi-byte characters intact across chunk boundaries.
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex).trimEnd();
          buffer = buffer.slice(newlineIndex + 1);
          handleLine(line);
        }
      }

      // Flush anything left in the decoder and the buffer.
      buffer += decoder.decode();
      if (buffer.trim()) {
        handleLine(buffer.trim());
      }

      // The stream ended: clear the spinner regardless of whether a final
      // done event arrived, and surface silence as an error rather than
      // an empty bubble.
      setMessages(prev => prev.map(msg =>
        msg.id === assistantMessageId
          ? {
              ...msg,
              content: fullContent || 'The assistant returned an empty response. Please try again.',
              isLoading: false,
              error: hadError || !fullContent,
            }
          : msg
      ));
    } catch (error) {
      console.error('Chat request failed:', error);
      setMessages(prev => prev.map(msg =>
        msg.id === assistantMessageId
          ? { ...msg, content: 'Sorry, I had trouble connecting to the chat service. Please try again in a moment.', isLoading: false, error: true }
          : msg
      ));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    inputRef.current?.focus();
  };

  const showSuggestions = messages.length === 1 && !isLoading;
  const modelLabel = health
    ? `${health.model.replace(/[-:]cloud$/, '')} · ${health.cloud ? 'Ollama Cloud' : 'local'}`
    : null;

  return (
    <>
      <Helmet>
        <title>Chat with Madhur AI | Madhur Patel</title>
        <meta name="description" content="Chat with Madhur's AI assistant to learn more about his projects, skills, and experience." />
      </Helmet>

      <div className="relative flex flex-col h-screen bg-background text-foreground overflow-hidden">
        {/* Same interactive network background as the rest of the site */}
        <Suspense fallback={null}>
          <ParticlesBackground id="tsparticles-chat" />
        </Suspense>

        {/* Header — mirrors the main site header */}
        <header className="relative z-10 glass-card border-b px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h1 className="font-heading font-semibold text-lg leading-tight">Chat with Madhur</h1>
                {modelLabel ? (
                  <p className="text-muted-foreground text-xs flex items-center gap-1">
                    {health?.cloud
                      ? <Cloud className="w-3 h-3" aria-hidden="true" />
                      : <Cpu className="w-3 h-3" aria-hidden="true" />}
                    {modelLabel}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-xs">AI assistant</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" title="Back to portfolio" aria-label="Back to portfolio">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">Portfolio</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                title="Reset chat"
                aria-label="Reset chat"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="relative z-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'hero-gradient text-primary-foreground'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Bot className="w-4 h-4" aria-hidden="true" />
                  )}
                </div>
                <div className={`flex-1 max-w-[85%] sm:max-w-2xl ${
                  message.role === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`inline-block text-left rounded-2xl px-4 py-3 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : message.error
                        ? 'bg-destructive/10 text-destructive border border-destructive/30'
                        : 'glass-card text-card-foreground rounded-tl-sm'
                  }`}>
                    {message.isLoading && message.content === '' ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Thinking...</span>
                      </div>
                    ) : message.role === 'assistant' && !message.error ? (
                      <div className="chat-markdown leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {showSuggestions && (
              <div className="pl-11">
                <p className="text-muted-foreground text-sm mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                      className="skill-badge cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="relative z-10 glass-card border-t px-4 py-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about Madhur..."
                  aria-label="Chat message"
                  className="w-full bg-background text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 resize-none border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex-shrink-0 w-12 h-12 rounded-xl hero-gradient text-primary-foreground flex items-center justify-center shadow-lg transition-[opacity,box-shadow,transform] duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <p className="text-muted-foreground/70 text-xs mt-2 text-center">
              Answers come from an AI model with context about Madhur — double-check anything important.
            </p>
          </form>
        </footer>
      </div>
    </>
  );
};

export default Chat;
