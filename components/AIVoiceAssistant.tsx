
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Mic, Volume2 } from 'lucide-react';
import { askAssistant } from '../lib/gemini';

const AIVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hi! I’m your EduStream AI assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connectivity issue. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#5D3FD3] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all group relative animate-bounce"
        >
          <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
          <Sparkles className="group-hover:rotate-12 transition-transform" size={28} />
          <span className="absolute -top-12 right-0 bg-white text-[#5D3FD3] text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Ask EduStream AI
          </span>
        </button>
      ) : (
        <div className="w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          {/* Header */}
          <div className="bg-[#5D3FD3] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm">EduStream AI</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-[#5D3FD3] text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your syllabus..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Mic size={16} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!query.trim() || isLoading}
                  className="p-1.5 bg-[#5D3FD3] text-white rounded-lg disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 px-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Powering by</span>
              <span className="text-[10px] text-[#5D3FD3] font-black uppercase">Gemini 3 Flash</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAssistant;
