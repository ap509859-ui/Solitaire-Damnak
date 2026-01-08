
import React, { useState, useRef, useEffect } from 'react';
import { AdminLayout } from '../../components/Layout';
import { useApp } from '../../App';
import Icons from '../../components/Icons';

const AdminSettings: React.FC = () => {
  const { hotelSettings, setHotelSettings } = useApp();
  const [formData, setFormData] = useState(hotelSettings);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Sync document title in real-time as user types in the settings
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${formData.name} (Preview)`;
    return () => {
      document.title = hotelSettings.name || 'LuxeStay Concierge';
    };
  }, [formData.name, hotelSettings.name]);

  // Theme presets for quick selection
  const themePresets = [
    { name: 'Classic Gold', primary: '#C5A059', button: '#1C1C1C' },
    { name: 'Royal Indigo', primary: '#312E81', button: '#1E1B4B' },
    { name: 'Emerald Isle', primary: '#065F46', button: '#064E3B' },
    { name: 'Midnight', primary: '#1F2937', button: '#000000' },
    { name: 'Terracotta', primary: '#9A3412', button: '#7C2D12' },
    { name: 'Deep Rose', primary: '#9D174D', button: '#831843' }
  ];

  const applyPreset = (preset: typeof themePresets[0]) => {
    setFormData(prev => ({
      ...prev,
      primaryColor: preset.primary,
      buttonColor: preset.button
    }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, banner: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    // Simulate API delay
    setTimeout(() => {
      setHotelSettings(formData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  return (
    <AdminLayout title="General Settings">
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Configuration Form */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-stone-200 bg-stone-50/50">
                <h2 className="text-xl font-bold text-stone-800">Site Identity</h2>
                <p className="text-stone-500 text-sm mt-1">Configure your hotel's global name, logo, and brand colors.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Site Title & Logo Column */}
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Site Title (Hotel Name)</label>
                        <span className="text-[10px] text-stone-300 font-mono">{formData.name.length}/30</span>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-primary transition-colors">
                          <Icons name="hotel" className="w-5 h-5" />
                        </div>
                        <input 
                          type="text" 
                          maxLength={30}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-stone-200 rounded-2xl p-5 pl-14 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-serif text-xl font-bold text-stone-800 bg-stone-50/30"
                          placeholder="e.g. LUXESTAY RESORT"
                          required
                        />
                      </div>
                      <p className="text-[10px] text-stone-400 mt-2 italic px-1">
                        * Real-time sync: Changes will appear in your browser tab instantly.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-widest">Brand Logo</label>
                      <div className="flex items-center gap-6 bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner">
                        <div className="w-20 h-20 bg-white rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center shadow-sm shrink-0">
                          {formData.logo ? (
                            <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Icons name="hotel" className="w-10 h-10 text-stone-200" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <button 
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="w-full bg-white text-stone-800 border border-stone-200 py-3 rounded-xl text-xs font-bold hover:bg-stone-50 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                            Upload Logo
                          </button>
                          {formData.logo && (
                            <button type="button" onClick={() => setFormData({ ...formData, logo: '' })} className="w-full text-red-500 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-colors">Remove Logo</button>
                          )}
                          <input type="file" ref={logoInputRef} onChange={handleLogoChange} accept="image/*" className="hidden" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Communication Column */}
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-widest">Support Channels</label>
                      <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner space-y-5">
                        <div className="group">
                          <div className="flex items-center gap-2 mb-2">
                            <Icons name="whatsapp" className="w-4 h-4 text-[#25D366]" />
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">WhatsApp Support</span>
                          </div>
                          <input 
                            type="text" 
                            value={formData.whatsappNumber}
                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                            className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] outline-none transition-all"
                            placeholder="e.g. 85512345678"
                          />
                        </div>
                        <div className="group">
                          <div className="flex items-center gap-2 mb-2">
                            <Icons name="telegram" className="w-4 h-4 text-[#0088cc]" />
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">Telegram Support</span>
                          </div>
                          <div className="flex items-center bg-white border border-stone-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0088cc]/20 focus-within:border-[#0088cc] transition-all">
                            <span className="pl-3 text-stone-400 text-sm">@</span>
                            <input 
                              type="text" 
                              value={formData.telegramUsername}
                              onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                              className="flex-1 p-3 text-sm border-none outline-none"
                              placeholder="username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-widest">Icon Styling ({formData.iconSize}px)</label>
                      <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner">
                        <input 
                          type="range" min="24" max="64" step="2"
                          value={formData.iconSize}
                          onChange={(e) => setFormData({ ...formData, iconSize: parseInt(e.target.value) })}
                          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between mt-2 text-[10px] text-stone-400 font-bold uppercase tracking-tighter">
                          <span>Compact</span>
                          <span>Large Icons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Customization */}
                <div className="space-y-8 pt-8 border-t border-stone-100">
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-5 tracking-widest">Quick Themes</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {themePresets.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => applyPreset(preset)}
                          className="group relative flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200 active:scale-95"
                        >
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: preset.primary }}></div>
                            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: preset.button }}></div>
                          </div>
                          <span className="text-[9px] font-bold text-stone-500 uppercase tracking-tighter truncate w-full text-center group-hover:text-stone-800">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Accent Color</label>
                        <span className="text-[10px] font-mono text-stone-400 font-bold">{formData.primaryColor.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-[2rem] border border-stone-100 shadow-inner group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                          <input 
                            type="color" 
                            value={formData.primaryColor} 
                            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })} 
                            className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer border-none p-0" 
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-stone-400 uppercase mb-1">Primary Accents</p>
                          <input 
                            type="text" 
                            value={formData.primaryColor} 
                            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })} 
                            className="w-full border-none bg-transparent font-mono text-sm uppercase outline-none text-stone-800 font-bold" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Action Color</label>
                        <span className="text-[10px] font-mono text-stone-400 font-bold">{formData.buttonColor.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-[2rem] border border-stone-100 shadow-inner group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                          <input 
                            type="color" 
                            value={formData.buttonColor} 
                            onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })} 
                            className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer border-none p-0" 
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-stone-400 uppercase mb-1">Buttons & UI</p>
                          <input 
                            type="text" 
                            value={formData.buttonColor} 
                            onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })} 
                            className="w-full border-none bg-transparent font-mono text-sm uppercase outline-none text-stone-800 font-bold" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Banner Section */}
                <div className="pt-8 border-t border-stone-100">
                  <label className="block text-xs font-bold text-stone-400 uppercase mb-4 tracking-widest">Hero Banner Image</label>
                  <div className="relative group rounded-3xl overflow-hidden border-2 border-stone-100 h-56 bg-stone-50 shadow-inner group">
                    <img src={formData.banner} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]">
                      <button 
                        type="button" 
                        onClick={() => bannerInputRef.current?.click()} 
                        className="bg-white text-stone-800 px-8 py-3 rounded-full font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all active:scale-95"
                      >
                        Change Banner
                      </button>
                    </div>
                    <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-10 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    {saveStatus === 'saved' && (
                      <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-full text-green-700 font-bold text-xs animate-in slide-in-from-left duration-300">
                        <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-[10px]">✓</div>
                        Site Title & settings synchronized
                      </div>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    disabled={saveStatus === 'saving'} 
                    className="px-12 py-5 bg-stone-900 text-white rounded-2xl font-bold shadow-2xl active:scale-95 transition-all hover:bg-black disabled:opacity-50 disabled:scale-100"
                  >
                    {saveStatus === 'saving' ? 'Publishing...' : 'Save All Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Side Preview Column */}
          <div className="space-y-6">
            
            {/* Browser Tab Preview - NOW EDITABLE */}
            <div className="bg-white rounded-[2rem] border border-stone-200 p-6 shadow-sm overflow-hidden group/tab">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Edit in Browser View</h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-stone-100"></div>
                  <div className="w-2 h-2 rounded-full bg-stone-100"></div>
                  <div className="w-2 h-2 rounded-full bg-stone-100"></div>
                </div>
              </div>
              <div className="bg-stone-50/50 rounded-xl p-3 border border-stone-200 flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary focus-within:bg-white transition-all shadow-sm">
                 <div className="bg-white p-1 rounded-md shadow-sm border border-stone-100 shrink-0">
                    {formData.logo ? (
                      <img src={formData.logo} className="w-4 h-4 object-contain" />
                    ) : (
                      <Icons name="hotel" className="w-4 h-4 text-primary" />
                    )}
                 </div>
                 <div className="flex-1">
                   <input 
                     type="text" 
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="w-full bg-transparent border-none text-[11px] font-medium text-stone-600 outline-none p-0 focus:ring-0"
                     placeholder="Browser Title"
                   />
                 </div>
                 <div className="text-stone-300">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
                 </div>
              </div>
              <p className="text-[9px] text-stone-400 mt-3 italic text-center opacity-0 group-hover/tab:opacity-100 transition-opacity">Click above to edit title directly</p>
            </div>

            {/* Live Style Guide */}
            <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <h3 className="text-lg font-bold mb-8 flex items-center gap-3 relative z-10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                Live Style Guide
              </h3>
              
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">Color Harmony</p>
                  <div className="flex gap-2">
                    <div className="h-16 w-full rounded-2xl shadow-lg border border-white/10" style={{ backgroundColor: formData.primaryColor }}></div>
                    <div className="h-16 w-full rounded-2xl shadow-lg border border-white/10" style={{ backgroundColor: formData.buttonColor }}></div>
                  </div>
                </div>

                <div className="p-5 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                  <p className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">Interface Preview</p>
                  
                  <div className="space-y-2">
                    <div className="h-10 w-full rounded-xl flex items-center justify-center text-[10px] font-bold uppercase tracking-widest shadow-lg" style={{ backgroundColor: formData.buttonColor }}>
                      Primary Action
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-md" style={{ color: formData.primaryColor }}>
                      <Icons name="room-service" className="w-5 h-5" />
                    </div>
                    <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-white/20"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-stone-500 mb-3 tracking-widest">Typography Palette</p>
                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl leading-none" style={{ color: formData.primaryColor }}>{formData.name || 'Header Title'}</h4>
                    <p className="text-[10px] text-stone-400 leading-relaxed font-medium">LuxeStay Concierge typography uses elegant serifs for headlines and readable sans-serif for content.</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative background blur */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-stone-100/5 rounded-full blur-[80px]"></div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6">
              <h4 className="text-xs font-bold text-stone-800 mb-2 uppercase">Pro Tip</h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Site titles between 15-30 characters perform best for guest recognition. High-contrast brand colors improve accessibility on mobile devices.
              </p>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
