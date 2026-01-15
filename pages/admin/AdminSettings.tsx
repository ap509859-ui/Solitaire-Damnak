
import React, { useState, useRef, useEffect } from 'react';
import { AdminLayout } from '../../components/Layout';
import { useApp } from '../../App';
import Icons from '../../components/Icons';

const AdminSettings: React.FC = () => {
  const { hotelSettings, setHotelSettings, menuItems, setMenuItems } = useApp();
  const [formData, setFormData] = useState(hotelSettings);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `${formData.name} (Settings)`;
  }, [formData.name]);

  const handleExportData = () => {
    const data = {
      settings: hotelSettings,
      menu: menuItems
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${hotelSettings.name.replace(/\s+/g, '_')}_config.json`;
    a.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          if (json.settings) setHotelSettings(json.settings);
          if (json.menu) setMenuItems(json.menu);
          alert("Configuration imported successfully!");
          window.location.reload();
        } catch (err) {
          alert("Invalid configuration file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setHotelSettings(formData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 500);
  };

  return (
    <AdminLayout title="General Settings">
      <div className="max-w-6xl space-y-8">
        {/* Data Management Card */}
        <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Backup & Portability</h2>
            <p className="text-stone-400 text-sm">Download your configuration to share it or move to another device.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <label className="flex-1 md:flex-none cursor-pointer bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all text-center">
              Import JSON
              <input type="file" className="hidden" accept=".json" onChange={handleImportData} />
            </label>
            <button 
              onClick={handleExportData}
              className="flex-1 md:flex-none bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Export JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-2">Hotel Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-stone-200 rounded-xl p-4 focus:border-primary outline-none transition-all font-bold text-stone-800"
                        placeholder="Hotel Name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-2">Banner URL</label>
                      <input 
                        type="text" 
                        value={formData.banner}
                        onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                        className="w-full border border-stone-200 rounded-xl p-4 text-sm outline-none"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-2">WhatsApp Number</label>
                      <input 
                        type="text" 
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        className="w-full border border-stone-200 rounded-xl p-4 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-2">Primary Color</label>
                      <div className="flex gap-3">
                        <input 
                          type="color" 
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="h-12 w-12 rounded-lg cursor-pointer border-none"
                        />
                        <input 
                          type="text" 
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="flex-1 border border-stone-200 rounded-xl px-4 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                  {saveStatus === 'saved' && <span className="text-green-600 font-bold text-sm animate-pulse">✓ Changes published live</span>}
                  <button 
                    type="submit" 
                    className="ml-auto bg-stone-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
                  >
                    {saveStatus === 'saving' ? 'Publishing...' : 'Update & Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">Device Preview</h3>
              <div className="aspect-[9/16] bg-stone-100 rounded-[2.5rem] border-[8px] border-stone-800 shadow-2xl relative overflow-hidden group">
                <img src={formData.banner} className="w-full h-24 object-cover" />
                <div className="p-4">
                  <div className="w-20 h-2 bg-stone-300 rounded mb-2"></div>
                  <div className="w-full h-8 rounded-lg mb-4" style={{ backgroundColor: formData.primaryColor }}></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-white rounded-xl shadow-sm"></div>
                    <div className="aspect-square bg-white rounded-xl shadow-sm"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <a href="#/" target="_blank" className="bg-white text-stone-900 px-4 py-2 rounded-full font-bold text-xs">Open Live App</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
