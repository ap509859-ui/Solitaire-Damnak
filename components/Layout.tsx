
import React from 'react';
import { useApp } from '../App';
import { Language } from '../types';
import { Link, useLocation } from 'react-router-dom';
import Icons from './Icons';

export const GuestLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  const { lang, setLang, hotelSettings } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40 px-4 py-4 flex justify-between items-center border-b border-stone-200">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white overflow-hidden border border-stone-100">
            {hotelSettings.logo ? (
              <img src={hotelSettings.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Icons name="hotel" className="w-6 h-6" />
            )}
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-stone-800 uppercase">{hotelSettings.name}</span>
        </Link>
        <button 
          onClick={() => setLang(lang === Language.EN ? Language.KH : Language.EN)}
          className="text-sm font-semibold border border-stone-300 px-3 py-1 rounded-full hover:bg-stone-50 transition-colors"
        >
          {lang === Language.EN ? 'ភាសាខ្មែរ' : 'English'}
        </button>
      </header>
      <main className="max-w-md mx-auto p-4 animate-in fade-in duration-500">
        {title && <h1 className={`text-2xl font-serif font-bold mb-6 text-stone-800 ${lang === Language.KH ? 'khmer-text' : ''}`}>{title}</h1>}
        {children}
      </main>
      
      {/* Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 flex justify-around items-center z-50">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-primary' : 'text-stone-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/chat') ? 'text-primary' : 'text-stone-500'}`}>
          <Icons name="chat" className="w-6 h-6" />
          <span className="text-[10px] font-medium">Concierge</span>
        </Link>
        <Link to="/menu/Room Service" className={`flex flex-col items-center gap-1 transition-colors ${location.pathname.startsWith('/menu') ? 'text-primary' : 'text-stone-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          <span className="text-[10px] font-medium">Orders</span>
        </Link>
        <Link to="/feedback" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/feedback') ? 'text-primary' : 'text-stone-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          <span className="text-[10px] font-medium">Help</span>
        </Link>
      </nav>
    </div>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  const { hotelSettings } = useApp();
  return (
    <div className="min-h-screen flex bg-stone-100">
      <aside className="w-64 bg-stone-900 text-white fixed h-full p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl overflow-hidden border border-white/10 shrink-0">
            {hotelSettings.logo ? (
              <img src={hotelSettings.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Icons name="hotel" className="w-7 h-7" />
            )}
          </div>
          <span className="text-xl font-bold tracking-tight truncate">{hotelSettings.name}</span>
        </div>
        <nav className="space-y-2">
          <Link to="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">Dashboard</Link>
          <Link to="/admin/menu" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">Menu (F&B)</Link>
          <Link to="/admin/services" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">Service Management</Link>
          <Link to="/admin/requests" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">Requests & Orders</Link>
          <Link to="/admin/settings" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">General Settings</Link>
          <Link to="/" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors mt-20 text-stone-400">View Guest App</Link>
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">Staff Member</span>
            <div className="w-10 h-10 bg-stone-300 rounded-full"></div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};
