
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Language, MenuItem, RequestItem, Category, Feedback, HotelSettings } from './types';
import { INITIAL_MENU_ITEMS } from './constants.tsx';

// --- Context & State Management ---
interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  requests: RequestItem[];
  addRequest: (r: Omit<RequestItem, 'id' | 'timestamp' | 'status'>) => void;
  updateRequestStatus: (id: string, status: RequestItem['status']) => void;
  feedbacks: Feedback[];
  addFeedback: (f: Omit<Feedback, 'id' | 'timestamp'>) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  hotelSettings: HotelSettings;
  setHotelSettings: (settings: HotelSettings) => void;
  roomNumber: string;
  setRoomNumber: (room: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

import GuestHome from './pages/guest/GuestHome';
import MenuCategory from './pages/guest/MenuCategory';
import CheckoutRequest from './pages/guest/CheckoutRequest';
import FeedbackForm from './pages/guest/FeedbackForm';
import ChatConcierge from './pages/guest/ChatConcierge';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminServices from './pages/admin/AdminServices';
import AdminRequests from './pages/admin/AdminRequests';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSettings from './pages/admin/AdminSettings';

const DEFAULT_SETTINGS: HotelSettings = {
  name: 'LUXESTAY',
  logo: '',
  banner: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  primaryColor: '#C5A059',
  buttonColor: '#1C1C1C',
  iconSize: 32,
  homeView: 'grid',
  categoryView: 'list',
  whatsappNumber: '1234567890',
  telegramUsername: 'LuxeStayConcierge'
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('luxestay_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });
  const [requests, setRequests] = useState<RequestItem[]>(() => {
    const saved = localStorage.getItem('luxestay_requests');
    return saved ? JSON.parse(saved) : [];
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const saved = localStorage.getItem('luxestay_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });
  const [hotelSettings, setHotelSettings] = useState<HotelSettings>(() => {
    const saved = localStorage.getItem('luxestay_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [roomNumber, setRoomNumberState] = useState(() => {
    return localStorage.getItem('luxestay_room_number') || '';
  });

  const setRoomNumber = (room: string) => {
    setRoomNumberState(room);
    localStorage.setItem('luxestay_room_number', room);
  };

  // Sync state with LocalStorage and handle multi-tab synchronization
  useEffect(() => {
    localStorage.setItem('luxestay_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('luxestay_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('luxestay_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('luxestay_settings', JSON.stringify(hotelSettings));
    
    document.title = hotelSettings.name;
    document.documentElement.style.setProperty('--primary-color', hotelSettings.primaryColor);
    document.documentElement.style.setProperty('--primary-color-dark', hotelSettings.primaryColor + 'ee');
    document.documentElement.style.setProperty('--button-color', hotelSettings.buttonColor);
    document.documentElement.style.setProperty('--button-color-dark', hotelSettings.buttonColor + 'dd');
    document.documentElement.style.setProperty('--icon-size', `${hotelSettings.iconSize}px`);
  }, [hotelSettings]);

  // Listen for storage changes from other tabs (e.g. Admin updates)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'luxestay_settings' && e.newValue) setHotelSettings(JSON.parse(e.newValue));
      if (e.key === 'luxestay_menu' && e.newValue) setMenuItems(JSON.parse(e.newValue));
      if (e.key === 'luxestay_requests' && e.newValue) setRequests(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addRequest = (r: Omit<RequestItem, 'id' | 'timestamp' | 'status'>) => {
    const newRequest: RequestItem = {
      ...r,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: 'pending'
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id: string, status: RequestItem['status']) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addFeedback = (f: Omit<Feedback, 'id' | 'timestamp'>) => {
    const newFeedback: Feedback = {
      ...f,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      lang, setLang, menuItems, setMenuItems, requests, addRequest, 
      updateRequestStatus, feedbacks, addFeedback, isAdmin, setIsAdmin,
      hotelSettings, setHotelSettings, roomNumber, setRoomNumber
    }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/menu/:category" element={<MenuCategory />} />
          <Route path="/checkout" element={<CheckoutRequest />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/chat" element={<ChatConcierge />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <AdminLogin />} />
          <Route path="/admin/menu" element={isAdmin ? <AdminMenu /> : <AdminLogin />} />
          <Route path="/admin/services" element={isAdmin ? <AdminServices /> : <AdminLogin />} />
          <Route path="/admin/requests" element={isAdmin ? <AdminRequests /> : <AdminLogin />} />
          <Route path="/admin/settings" element={isAdmin ? <AdminSettings /> : <AdminLogin />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
