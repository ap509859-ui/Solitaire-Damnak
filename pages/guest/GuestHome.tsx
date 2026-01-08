
import React, { useState } from 'react';
import { GuestLayout } from '../../components/Layout';
import { Link } from 'react-router-dom';
import { useApp } from '../../App';
import { Language, Category } from '../../types';
import Icons from '../../components/Icons';

const GuestHome: React.FC = () => {
  const { lang, hotelSettings } = useApp();
  const [showChatOptions, setShowChatOptions] = useState(false);

  const services = [
    { id: Category.ROOM_SERVICE, icon: 'room-service', label: { en: 'Room Service', kh: 'សេវាកម្មក្នុងបន្ទប់' } },
    { id: Category.POOLSIDE, icon: 'poolside', label: { en: 'Poolside Bar', kh: 'បារមាត់អាងហែលទឹក' } },
    { id: Category.BREAKFAST, icon: 'breakfast', label: { en: 'Breakfast Menu', kh: 'បញ្ជីអាហារពេលព្រឹក' } },
    { id: Category.RESTAURANT, icon: 'restaurant', label: { en: 'Restaurant', kh: 'ភោជនីយដ្ឋាន' } },
    { id: Category.TOURS, icon: 'ticket', label: { en: 'Tours & Tickets', kh: 'ដំណើរកម្សាន្ត និងសំបុត្រ' } },
    { id: Category.WELLNESS, icon: 'massage', label: { en: 'Wellness', kh: 'សុខុមាលភាព និងស្ប៉ា' } },
    { id: Category.RENTALS, icon: 'bicycle', label: { en: 'Bike Rental', kh: 'ជួលម៉ូតូ និងកង់' } },
    { id: Category.LAUNDRY, icon: 'laundry', label: { en: 'Laundry', kh: 'បោកអ៊ុត' } },
    { id: Category.TRANSPORT, icon: 'taxi', label: { en: 'Transfers', kh: 'សេវាកម្មដឹកជញ្ជូន' } },
    { id: Category.HOUSEKEEPING, icon: 'housekeeping', label: { en: 'Housekeeping', kh: 'សេវាសម្អាត' } },
    { id: Category.MAINTENANCE, icon: 'fixing', label: { en: 'Maintenance', kh: 'ការថែទាំ' } },
    { id: Category.LOCAL_ATTRACTION, icon: 'map', label: { en: 'Local Attractions', kh: 'កន្លែងកម្សាន្តក្នុងតំបន់' } },
  ];

  const t = {
    welcomePrefix: { en: 'Welcome to', kh: 'សូមស្វាគមន៍មកកាន់' },
    subtitle: { en: 'How can we assist you today?', kh: 'តើយើងអាចជួយអ្វីលោកអ្នកបានខ្លះ?' },
    checkout: { en: 'Check-out Request', kh: 'ស្នើសុំចាកចេញ' },
    feedback: { en: 'Give Feedback', kh: 'មតិកែលម្អ' },
    chatFrontDesk: { en: 'Chat Front Desk', kh: 'ជជែកជាមួយផ្នែកទទួលភ្ញៀវ' },
    staffPortal: { en: 'Staff Portal', kh: 'ច្រកចូលបុគ្គលិក' },
    selectChat: { en: 'Choose your assistant', kh: 'សូមជ្រើសរើសជំនួយការរបស់អ្នក' },
    aiBot: { en: 'Concierge Chat Bot', kh: 'ជំនួយការ AI' },
    aiBotDesc: { en: 'Instant answers 24/7', kh: 'ឆ្លើយតបភ្លាមៗ ២៤/៧' },
    humanChatWA: { en: 'WhatsApp Support', kh: 'ជំនួយតាម WhatsApp' },
    humanChatWADesc: { en: 'Chat with us on WhatsApp', kh: 'ជជែកតាមរយៈ WhatsApp' },
    humanChatTG: { en: 'Telegram Support', kh: 'ជំនួយតាម Telegram' },
    humanChatTGDesc: { en: 'Chat with us on Telegram', kh: 'ជជែកតាមរយៈ Telegram' },
    close: { en: 'Close', kh: 'បិទ' }
  };

  return (
    <GuestLayout>
      <div className="mb-8">
        <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-xl">
          <img src={hotelSettings.banner} alt="Hotel Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className={`text-2xl font-serif font-bold text-white mb-1 ${lang === Language.KH ? 'khmer-text' : ''}`}>
              {t.welcomePrefix[lang.toLowerCase() as 'en' | 'kh']} {hotelSettings.name}
            </h2>
            <p className={`text-stone-200 text-sm ${lang === Language.KH ? 'khmer-text' : ''}`}>
              {t.subtitle[lang.toLowerCase() as 'en' | 'kh']}
            </p>
          </div>
        </div>

        {/* Chat Front Desk Button */}
        <div className="mb-6">
          <button 
            onClick={() => setShowChatOptions(true)}
            className="w-full flex items-center justify-between bg-primary text-white p-5 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                <Icons name="chat" className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className={`text-lg font-bold block ${lang === Language.KH ? 'khmer-text' : ''}`}>
                  {t.chatFrontDesk[lang.toLowerCase() as 'en' | 'kh']}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Help & Assistance</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>
        </div>

        {hotelSettings.homeView === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <Link 
                key={service.id}
                to={`/menu/${service.id}`}
                className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-md transition-shadow active:scale-95"
              >
                <div 
                  className="mb-3 flex items-center justify-center transition-all text-primary"
                  style={{ height: 'var(--icon-size)', width: 'var(--icon-size)' }}
                >
                  <Icons name={service.icon} className="w-full h-full" />
                </div>
                <span className={`text-sm font-semibold text-stone-700 leading-tight ${lang === Language.KH ? 'khmer-text' : ''}`}>
                  {service.label[lang.toLowerCase() as 'en' | 'kh']}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <Link 
                key={service.id}
                to={`/menu/${service.id}`}
                className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-5 hover:shadow-md transition-shadow active:scale-95"
              >
                <div 
                  className="flex items-center justify-center transition-all shrink-0 text-primary"
                  style={{ height: 'var(--icon-size)', width: 'var(--icon-size)' }}
                >
                  <Icons name={service.icon} className="w-full h-full" />
                </div>
                <span className={`flex-1 text-base font-semibold text-stone-800 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                  {service.label[lang.toLowerCase() as 'en' | 'kh']}
                </span>
                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-3">
          <Link 
            to="/feedback"
            className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icons name="rating" className="w-6 h-6 text-yellow-500" />
              <span className={`font-semibold ${lang === Language.KH ? 'khmer-text' : ''}`}>{t.feedback[lang.toLowerCase() as 'en' | 'kh']}</span>
            </div>
            <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </Link>

          <Link 
            to="/checkout"
            className="flex items-center justify-between bg-button text-white p-4 rounded-xl shadow-sm hover:bg-button-dark transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icons name="checkout" className="w-6 h-6 text-white/90" />
              <span className={`font-semibold ${lang === Language.KH ? 'khmer-text' : ''}`}>{t.checkout[lang.toLowerCase() as 'en' | 'kh']}</span>
            </div>
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="mt-12 mb-4 pt-8 border-t border-stone-200 text-center">
          <Link 
            to="/admin/login" 
            className="inline-flex items-center gap-2 text-stone-400 text-xs hover:text-stone-600 transition-colors uppercase tracking-widest font-bold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span className={lang === Language.KH ? 'khmer-text' : ''}>
              {t.staffPortal[lang.toLowerCase() as 'en' | 'kh']}
            </span>
          </Link>
        </div>
      </div>

      {/* Chat Options Drawer */}
      {showChatOptions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-[4px] animate-in fade-in duration-300" 
            onClick={() => setShowChatOptions(false)} 
          />
          <div className="relative bg-white w-full max-w-md rounded-t-[2.5rem] p-8 pb-12 animate-in slide-in-from-bottom duration-500 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-8 shrink-0" />
            
            <h3 className={`text-xl font-serif font-bold text-stone-800 text-center mb-8 shrink-0 ${lang === Language.KH ? 'khmer-text' : ''}`}>
              {t.selectChat[lang.toLowerCase() as 'en' | 'kh']}
            </h3>

            <div className="space-y-4">
              {/* Option 1: AI Bot */}
              <Link 
                to="/chat"
                className="flex items-center gap-5 p-5 bg-stone-50 rounded-3xl border border-stone-100 hover:border-primary/30 transition-all active:scale-95 group"
                onClick={() => setShowChatOptions(false)}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                  <Icons name="bot" className="w-8 h-8" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`text-lg font-bold text-stone-800 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                    {t.aiBot[lang.toLowerCase() as 'en' | 'kh']}
                  </h4>
                  <p className={`text-xs text-stone-400 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                    {t.aiBotDesc[lang.toLowerCase() as 'en' | 'kh']}
                  </p>
                </div>
                <div className="text-stone-300 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                </div>
              </Link>

              {/* Option 2: Human WhatsApp */}
              <a 
                href={`https://wa.me/${hotelSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 bg-stone-50 rounded-3xl border border-stone-100 hover:border-[#25D366]/30 transition-all active:scale-95 group"
                onClick={() => setShowChatOptions(false)}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform shrink-0">
                  <Icons name="whatsapp" className="w-8 h-8" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`text-lg font-bold text-stone-800 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                    {t.humanChatWA[lang.toLowerCase() as 'en' | 'kh']}
                  </h4>
                  <p className={`text-xs text-stone-400 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                    {t.humanChatWADesc[lang.toLowerCase() as 'en' | 'kh']}
                  </p>
                </div>
                <div className="text-stone-300 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                </div>
              </a>

              {/* Option 3: Human Telegram */}
              <a 
                href={`https://t.me/${hotelSettings.telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 bg-stone-50 rounded-3xl border border-stone-100 hover:border-[#0088cc]/30 transition-all active:scale-95 group"
                onClick={() => setShowChatOptions(false)}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc] group-hover:scale-110 transition-transform shrink-0">
                  <Icons name="telegram" className="w-8 h-8" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`text-lg font-bold text-stone-800 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                    {t.humanChatTG[lang.toLowerCase() as 'en' | 'kh']}
                  </h4>
                  <p className={`text-xs text-stone-400 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                    {t.humanChatTGDesc[lang.toLowerCase() as 'en' | 'kh']}
                  </p>
                </div>
                <div className="text-stone-300 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                </div>
              </a>
            </div>

            <button 
              onClick={() => setShowChatOptions(false)}
              className={`mt-8 w-full text-stone-400 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors shrink-0 ${lang === Language.KH ? 'khmer-text' : ''}`}
            >
              {t.close[lang.toLowerCase() as 'en' | 'kh']}
            </button>
          </div>
        </div>
      )}
    </GuestLayout>
  );
};

export default GuestHome;
