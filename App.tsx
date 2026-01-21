
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Language, MenuItem, RequestItem, Category, Feedback, HotelSettings } from './types';
import { INITIAL_MENU_ITEMS } from './constants.tsx';
import { supabase } from './services/supabase';

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
  name: 'Green Amazon Residence',
  logo: '',
  banner: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  primaryColor: '#2D5A27', // Updated to match Green Amazon vibe
  buttonColor: '#1C1C1C',
  iconSize: 32,
  homeView: 'grid',
  categoryView: 'list',
  whatsappNumber: '1234567890',
  telegramUsername: 'GreenAmazonConcierge'
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [hotelSettings, setHotelSettingsState] = useState<HotelSettings>(DEFAULT_SETTINGS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roomNumber, setRoomNumberState] = useState(() => localStorage.getItem('luxestay_room_number') || '');

  // Initialization: Fetch all data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      // Settings
      const { data: settingsData } = await supabase.from('settings').select('*').single();
      if (settingsData) setHotelSettingsState(settingsData.config);

      // Menu Items
      const { data: menuData } = await supabase.from('menu_items').select('*');
      if (menuData && menuData.length > 0) {
        setMenuItems(menuData.map(m => m.data));
      } else {
        // Fallback for first-time setup
        setMenuItems(INITIAL_MENU_ITEMS);
      }

      // Requests
      const { data: requestData } = await supabase.from('requests').select('*').order('timestamp', { ascending: false });
      if (requestData) setRequests(requestData);

      // Feedbacks
      const { data: feedbackData } = await supabase.from('feedbacks').select('*').order('timestamp', { ascending: false });
      if (feedbackData) setFeedbacks(feedbackData);
    };

    fetchData();

    // Subscribe to Realtime changes
    const settingsSub = supabase.channel('settings_changes').on('postgres_changes', { event: '*', table: 'settings' }, (payload) => {
      if (payload.new) setHotelSettingsState((payload.new as any).config);
    }).subscribe();

    const menuSub = supabase.channel('menu_changes').on('postgres_changes', { event: '*', table: 'menu_items' }, async () => {
      const { data } = await supabase.from('menu_items').select('*');
      if (data) setMenuItems(data.map(m => m.data));
    }).subscribe();

    const requestSub = supabase.channel('request_changes').on('postgres_changes', { event: '*', table: 'requests' }, async () => {
      const { data } = await supabase.from('requests').select('*').order('timestamp', { ascending: false });
      if (data) setRequests(data);
    }).subscribe();

    return () => {
      settingsSub.unsubscribe();
      menuSub.unsubscribe();
      requestSub.unsubscribe();
    };
  }, []);

  const setHotelSettings = async (settings: HotelSettings) => {
    setHotelSettingsState(settings);
    await supabase.from('settings').upsert({ id: 1, config: settings });
  };

  const setRoomNumber = (room: string) => {
    setRoomNumberState(room);
    localStorage.setItem('luxestay_room_number', room);
  };

  const addRequest = async (r: Omit<RequestItem, 'id' | 'timestamp' | 'status'>) => {
    const newRequest = {
      ...r,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: 'pending' as const
    };
    await supabase.from('requests').insert([newRequest]);
  };

  const updateRequestStatus = async (id: string, status: RequestItem['status']) => {
    await supabase.from('requests').update({ status }).eq('id', id);
  };

  const addFeedback = async (f: Omit<Feedback, 'id' | 'timestamp'>) => {
    const newFeedback = {
      ...f,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    await supabase.from('feedbacks').insert([newFeedback]);
  };

  // Sync Global CSS Variables
  useEffect(() => {
    document.title = hotelSettings.name;
    const root = document.documentElement;
    root.style.setProperty('--primary-color', hotelSettings.primaryColor);
    root.style.setProperty('--primary-color-dark', hotelSettings.primaryColor + 'dd');
    root.style.setProperty('--button-color', hotelSettings.buttonColor);
    root.style.setProperty('--icon-size', `${hotelSettings.iconSize}px`);
  }, [hotelSettings]);

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
