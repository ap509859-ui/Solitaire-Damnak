
import React, { useState, useRef, useEffect } from 'react';
import { GuestLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { Language } from '../../types';
import Icons from '../../components/Icons';
import { getAIConciergeResponse } from '../../services/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const ChatConcierge: React.FC = () => {
  const { lang, hotelSettings, menuItems } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      text: lang === Language.EN 
        ? `Welcome! I am your AI Concierge at ${hotelSettings.name}. How can I help you today?` 
        : `សូមស្វាគមន៍! ខ្ញុំជាជំនួយការ AI របស់លោកអ្នកនៅ ${hotelSettings.name}។ តើខ្ញុំអាចជួយលោកអ្នកដោយរបៀបណា?`,
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare context for Gemini
    const context = `
      Hotel Name: ${hotelSettings.name}
      Available Services: ${menuItems.map(i => i.name.en).join(', ')}
      Current Language: ${lang}
    `;

    const aiResponse = await getAIConciergeResponse(input, context);
    const aiMessage: Message = { role: 'ai', text: aiResponse || "I'm sorry, I couldn't process that.", timestamp: Date.now() };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const t = {
    placeholder: { en: 'Type your question...', kh: 'វាយសំណួររបស់អ្នក...' },
    online: { en: 'Concierge Online', kh: 'ជំនួយការកំពុងនៅទីនេះ' },
    back: { en: 'Back', kh: 'ត្រឡប់ក្រោយ' }
  };

  return (
    <GuestLayout title={lang === Language.EN ? 'Concierge Chat' : 'ជជែកជាមួយជំនួយការ'}>
      <div className="flex flex-col h-[calc(100vh-18rem)] bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden relative">
        {/* Chat Header */}
        <div className="bg-stone-50/50 px-6 py-3 border-b border-stone-100 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Icons name="chat" className="w-6 h-6" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className={`text-xs font-bold text-stone-800 leading-none mb-1 ${lang === Language.KH ? 'khmer-text' : ''}`}>
              {t.online[lang.toLowerCase() as 'en' | 'kh']}
            </p>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">24/7 Assistance</p>
          </div>
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-stone-50 text-stone-800 border border-stone-100 rounded-tl-none'
              }`}>
                <p className={`text-sm leading-relaxed ${lang === Language.KH && msg.role === 'ai' ? 'khmer-text' : ''}`}>
                  {msg.text}
                </p>
                <p className={`text-[9px] mt-1.5 opacity-50 font-mono ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-stone-50 border border-stone-100 rounded-2xl rounded-tl-none px-5 py-3 flex gap-1">
                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-stone-100">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder[lang.toLowerCase() as 'en' | 'kh']}
              className={`flex-1 bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all ${lang === Language.KH ? 'khmer-text' : ''}`}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-button text-white p-3.5 rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <p className="mt-4 text-center text-[10px] text-stone-400 font-medium px-4">
        Our AI concierge is trained to help with restaurant bookings, housekeeping, local info and more.
      </p>
    </GuestLayout>
  );
};

export default ChatConcierge;
