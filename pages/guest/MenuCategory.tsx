
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GuestLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { Language, Category, MenuItem } from '../../types';

const MenuCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { lang, menuItems, addRequest, roomNumber, setRoomNumber } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [localRoomNumber, setLocalRoomNumber] = useState(roomNumber);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedTime, setSelectedTime] = useState<'now' | 'later'>('now');
  const [anotherTime, setAnotherTime] = useState('');

  const [maintenanceDesc, setMaintenanceDesc] = useState('');
  const [maintenanceImage, setMaintenanceImage] = useState<string | null>(null);

  const [laundryServiceLevel, setLaundryServiceLevel] = useState<'standard' | 'express'>('standard');
  const [laundryItems, setLaundryItems] = useState('');

  const [showOrderModal, setShowOrderModal] = useState<string | null>(null);

  const isHousekeeping = category === Category.HOUSEKEEPING;
  const isMaintenance = category === Category.MAINTENANCE;
  const isLaundry = category === Category.LAUNDRY;
  const isAttractions = category === Category.LOCAL_ATTRACTION;
  
  const filteredItems = menuItems.filter(item => item.category === category && item.available);

  const groupedItems = React.useMemo(() => {
    if (!isAttractions) return { "General": filteredItems };
    
    const groups: Record<string, MenuItem[]> = {};
    filteredItems.forEach(item => {
      const sub = lang === Language.EN ? (item.subCategory?.en || "General") : (item.subCategory?.kh || "ទូទៅ");
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(item);
    });
    return groups;
  }, [filteredItems, isAttractions, lang]);

  const handleHousekeepingSubmit = async () => {
    if (!localRoomNumber) {
      alert(lang === Language.EN ? 'Please enter your room number' : 'សូមបញ្ចូលលេខបន្ទប់របស់អ្នក');
      return;
    }
    setIsSubmitting(true);
    setRoomNumber(localRoomNumber);
    const timeDetail = selectedTime === 'now' ? 'Now' : `Another Time: ${anotherTime}`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    addRequest({
      type: 'service',
      roomNumber: localRoomNumber,
      details: `Housekeeping Request. Time: ${timeDetail}. Notes: ${notes}`
    });
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); navigate('/'); }, 2500);
  };

  const handleMaintenanceSubmit = async () => {
    if (!localRoomNumber) {
      alert(lang === Language.EN ? 'Please enter your room number' : 'សូមបញ្ចូលលេខបន្ទប់របស់អ្នក');
      return;
    }
    if (!maintenanceDesc) {
      alert(lang === Language.EN ? 'Please describe the problem' : 'សូមរៀបរាប់ពីបញ្ហា');
      return;
    }
    setIsSubmitting(true);
    setRoomNumber(localRoomNumber);
    await new Promise(resolve => setTimeout(resolve, 1200));
    addRequest({
      type: 'service',
      roomNumber: localRoomNumber,
      details: `Maintenance Request. Problem: ${maintenanceDesc}. Notes: ${notes}. Has Image: ${maintenanceImage ? 'Yes' : 'No'}`
    });
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); navigate('/'); }, 2500);
  };

  const handleLaundrySubmit = async () => {
    if (!localRoomNumber) {
      alert(lang === Language.EN ? 'Please enter your room number' : 'សូមបញ្ចូលលេខបន្ទប់របស់អ្នក');
      return;
    }
    setIsSubmitting(true);
    setRoomNumber(localRoomNumber);
    const timeDetail = selectedTime === 'now' ? 'Now' : `Another Time: ${anotherTime}`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    addRequest({
      type: 'service',
      roomNumber: localRoomNumber,
      details: `Laundry Request. Service: ${laundryServiceLevel.toUpperCase()}. Items: ${laundryItems}. Time: ${timeDetail}. Notes: ${notes}`
    });
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); navigate('/'); }, 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMaintenanceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenericOrder = async (item: any) => {
    if (!localRoomNumber) {
      alert(lang === Language.EN ? 'Please enter your room number' : 'សូមបញ្ចូលលេខបន្ទប់របស់អ្នក');
      return;
    }
    setIsSubmitting(true);
    setRoomNumber(localRoomNumber);
    await new Promise(resolve => setTimeout(resolve, 800));
    addRequest({
      type: 'order',
      roomNumber: localRoomNumber,
      items: [{ name: lang === Language.EN ? item.name.en : item.name.kh, quantity: 1 }],
      details: notes
    });
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowOrderModal(null); navigate('/'); }, 2500);
  };

  const handleItemAction = (item: MenuItem) => {
    if (isAttractions && item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      setLocalRoomNumber(roomNumber);
      setShowOrderModal(item.id);
    }
  };

  if (success) {
    return (
      <GuestLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-4xl mb-8 shadow-inner border border-primary/20">✨</div>
          <h2 className={`text-2xl font-serif font-bold mb-3 text-stone-800 ${lang === Language.KH ? 'khmer-text' : ''}`}>
            {lang === Language.EN ? 'Request Confirmed' : 'ការកក់ត្រូវបានបញ្ជាក់'}
          </h2>
          <p className={`text-stone-500 max-w-xs leading-relaxed ${lang === Language.KH ? 'khmer-text' : ''}`}>
            {lang === Language.EN 
              ? 'Our team has been notified. We will process your request as soon as possible.' 
              : 'ក្រុមការងាររបស់យើងត្រូវបានជូនដំណឹងរួចហើយ។ យើងនឹងដោះស្រាយសំណើរបស់អ្នកឱ្យបានឆាប់តាមដែលអាចធ្វើទៅបាន។'}
          </p>
        </div>
      </GuestLayout>
    );
  }

  if (isLaundry) {
    return (
      <GuestLayout>
        <div className="-mx-4 -mt-4 mb-6 relative h-64 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80" 
            alt="Laundry Service" 
            className="w-full h-full object-cover brightness-[0.6] blur-[1px]" 
          />
          <div className="absolute inset-0 flex items-center p-8">
            <h1 className="text-4xl font-bold text-white leading-tight drop-shadow-lg">
              {lang === Language.EN ? 'Laundry & Dry Clean' : 'បោកអ៊ុត និងបោកស្ងួត'}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-widest">
              {lang === Language.EN ? 'Your Room' : 'លេខបន្ទប់របស់អ្នក'}
            </label>
            <input 
              type="text" 
              value={localRoomNumber}
              onChange={(e) => setLocalRoomNumber(e.target.value)}
              placeholder="e.g. 204"
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-stone-800 font-bold outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
            />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold text-stone-800 mb-6">{lang === Language.EN ? 'Service Type' : 'ប្រភេទសេវាកម្ម'}</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setLaundryServiceLevel('standard')}
                className={`p-4 rounded-2xl border transition-all text-center ${laundryServiceLevel === 'standard' ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200' : 'bg-stone-50 border-stone-100'}`}
              >
                <p className={`font-bold text-sm ${laundryServiceLevel === 'standard' ? 'text-indigo-600' : 'text-stone-600'}`}>Standard</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">24 Hours</p>
              </button>
              <button 
                onClick={() => setLaundryServiceLevel('express')}
                className={`p-4 rounded-2xl border transition-all text-center ${laundryServiceLevel === 'express' ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200' : 'bg-stone-50 border-stone-100'}`}
              >
                <p className={`font-bold text-sm ${laundryServiceLevel === 'express' ? 'text-indigo-600' : 'text-stone-600'}`}>Express</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">6 Hours (+50%)</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-800">{lang === Language.EN ? 'Pickup Time' : 'ម៉ោងមកយក'}</h2>
              <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Required</span>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => setSelectedTime('now')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${selectedTime === 'now' ? 'bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-200' : 'bg-white border-transparent'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTime === 'now' ? 'border-indigo-600' : 'border-stone-300'}`}>
                  {selectedTime === 'now' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                </div>
                <span className={`font-semibold ${selectedTime === 'now' ? 'text-indigo-600' : 'text-stone-600'}`}>{lang === Language.EN ? 'Pickup Now' : 'មកយកឥឡូវនេះ'}</span>
              </button>
              <button 
                onClick={() => setSelectedTime('later')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${selectedTime === 'later' ? 'bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-200' : 'bg-white border-transparent'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTime === 'later' ? 'border-indigo-600' : 'border-stone-300'}`}>
                  {selectedTime === 'later' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                </div>
                <span className={`font-semibold ${selectedTime === 'later' ? 'text-indigo-600' : 'text-stone-600'}`}>{lang === Language.EN ? 'Schedule Pickup' : 'កក់ម៉ោងមកយក'}</span>
              </button>
              {selectedTime === 'later' && (
                <input
                  type="text"
                  value={anotherTime}
                  onChange={(e) => setAnotherTime(e.target.value)}
                  placeholder={lang === Language.EN ? "Enter Time (e.g. 2:00 PM)" : "បញ្ចូលម៉ោង (ឧ. ម៉ោង ២)"}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all text-stone-800 font-medium animate-in slide-in-from-top-2"
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold text-stone-800 mb-6">{lang === Language.EN ? 'Items List' : 'បញ្ជីសម្លៀកបំពាក់'}</h2>
            <textarea
              value={laundryItems}
              onChange={(e) => setLaundryItems(e.target.value)}
              placeholder={lang === Language.EN ? "e.g. 3 Shirts, 2 Pants..." : "ឧ. អាវ ៣, ខោ ២..."}
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 h-24 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-stone-800 resize-none"
            />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold text-stone-800 mb-6">{lang === Language.EN ? 'Special Instructions' : 'ការណែនាំពិសេស'}</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === Language.EN ? "e.g. No starch, delicate wash..." : "ឧ. កុំប្រើទឹកអប់..."}
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 h-24 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-stone-800 resize-none"
            />
          </div>

          <button
            onClick={handleLaundrySubmit}
            disabled={isSubmitting}
            className="w-full bg-button text-white py-6 rounded-[2.5rem] font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? '...' : (lang === Language.EN ? 'CONFIRM PICKUP' : 'បញ្ជាក់ការមកយក')}
          </button>
        </div>
      </GuestLayout>
    );
  }

  if (isMaintenance) {
    return (
      <GuestLayout>
        <div className="-mx-4 -mt-4 mb-6 relative h-64 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" 
            alt="Maintenance" 
            className="w-full h-full object-cover brightness-[0.6] blur-[1px]" 
          />
          <div className="absolute inset-0 flex items-center p-8">
            <h1 className="text-4xl font-bold text-white leading-tight drop-shadow-lg">
              {lang === Language.EN ? 'Maintenance' : 'ការថែទាំ'}
            </h1>
          </div>
        </div>

        <div className="px-1 mb-8">
          <p className={`text-sm text-stone-600 leading-relaxed ${lang === Language.KH ? 'khmer-text' : ''}`}>
            {lang === Language.EN 
              ? 'Please describe the issue and click submit. We aim to resolve issues as soon as possible, usually within 24 hours. If you believe the problem requires urgent attention please click the chat button below. We apologies for any inconvenience caused.'
              : 'សូមរៀបរាប់ពីបញ្ហា រួចចុចបញ្ជូន។ យើងមានបំណងដោះស្រាយបញ្ហាឱ្យបានឆាប់បំផុត តាមធម្មតាក្នុងរយៈពេល ២៤ ម៉ោង។ ប្រសិនបើលោកអ្នកយល់ថាបញ្ហានេះត្រូវការការយកចិត្តទុកដាក់ជាបន្ទាន់ សូមចុចប៊ូតុងជជែកខាងក្រោម។ យើងសូមអភ័យទោសចំពោះការរំខានណាមួយដែលបានកើតឡើង។'}
          </p>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-widest">
              {lang === Language.EN ? 'Your Room' : 'លេខបន្ទប់របស់អ្នក'}
            </label>
            <input 
              type="text" 
              value={localRoomNumber}
              onChange={(e) => setLocalRoomNumber(e.target.value)}
              placeholder="e.g. 204"
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-stone-800 font-bold outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
            />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-800">{lang === Language.EN ? 'Problem' : 'បញ្ហា'}</h2>
              <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Required</span>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest z-10 transition-colors group-focus-within:text-indigo-500">
                  {lang === Language.EN ? 'Description' : 'ការរៀបរាប់'}
                </label>
                <div className="absolute left-4 top-10 text-stone-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </div>
                <textarea
                  value={maintenanceDesc}
                  onChange={(e) => setMaintenanceDesc(e.target.value)}
                  placeholder={lang === Language.EN ? "Description" : "ការរៀបរាប់"}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 pt-10 pl-12 h-32 outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-stone-800 font-medium resize-none"
                />
              </div>

              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest z-10 transition-colors group-focus-within:text-indigo-500">
                  {lang === Language.EN ? 'Image Upload' : 'បញ្ជូនរូបភាព'}
                </label>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center bg-stone-50 border border-stone-200 rounded-2xl p-4 pt-10 h-24 text-left group-hover:bg-white transition-all active:scale-[0.98] outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <div className="flex items-center gap-4 text-stone-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    <span className="font-semibold text-stone-400">
                      {maintenanceImage ? (lang === Language.EN ? 'Change Photo' : 'ប្តូររូបភាព') : (lang === Language.EN ? 'Image Upload' : 'បញ្ជូនរូបភាព')}
                    </span>
                  </div>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                
                {maintenanceImage && (
                  <div className="mt-4 relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md animate-in zoom-in duration-300">
                    <img src={maintenanceImage} alt="Problem Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setMaintenanceImage(null)} 
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm transition-colors hover:bg-white"
                      aria-label="Remove image"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold text-stone-800 mb-6">{lang === Language.EN ? 'Notes' : 'កំណត់សម្គាល់'}</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === Language.EN ? "Notes" : "កំណត់សម្គាល់"}
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-stone-800 resize-none"
            />
          </div>

          <button
            onClick={handleMaintenanceSubmit}
            disabled={isSubmitting}
            className="w-full bg-button text-white py-6 rounded-[2.5rem] font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? '...' : (lang === Language.EN ? 'SUBMIT' : 'បញ្ជូន')}
          </button>
        </div>
      </GuestLayout>
    );
  }

  if (isHousekeeping) {
    return (
      <GuestLayout>
        <div className="-mx-4 -mt-4 mb-6 relative h-64 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
            alt="Housekeeping" 
            className="w-full h-full object-cover brightness-[0.6] blur-[2px]" 
          />
          <div className="absolute inset-0 flex items-center p-8">
            <h1 className="text-4xl font-bold text-white leading-tight drop-shadow-lg">
              {lang === Language.EN ? 'Request Room Clean' : 'ស្នើសុំសម្អាតបន្ទប់'}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-widest">
              {lang === Language.EN ? 'Your Room' : 'លេខបន្ទប់របស់អ្នក'}
            </label>
            <input 
              type="text" 
              value={localRoomNumber}
              onChange={(e) => setLocalRoomNumber(e.target.value)}
              placeholder="e.g. 204"
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-stone-800 font-bold outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
            />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-800">{lang === Language.EN ? 'Time' : 'ពេលវេលា'}</h2>
              <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Required</span>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setSelectedTime('now')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  selectedTime === 'now' 
                    ? 'bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-200' 
                    : 'bg-white border-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTime === 'now' ? 'border-indigo-600' : 'border-stone-300'}`}>
                  {selectedTime === 'now' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                </div>
                <span className={`font-semibold ${selectedTime === 'now' ? 'text-indigo-600' : 'text-stone-600'}`}>
                  {lang === Language.EN ? 'Now' : 'ឥឡូវនេះ'}
                </span>
              </button>

              <button 
                onClick={() => setSelectedTime('later')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  selectedTime === 'later' 
                    ? 'bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-200' 
                    : 'bg-white border-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTime === 'later' ? 'border-indigo-600' : 'border-stone-300'}`}>
                  {selectedTime === 'later' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                </div>
                <span className={`font-semibold ${selectedTime === 'later' ? 'text-indigo-600' : 'text-stone-600'}`}>
                  {lang === Language.EN ? 'Another Time' : 'ពេលផ្សេង'}
                </span>
              </button>

              {selectedTime === 'later' && (
                <div className="relative animate-in slide-in-from-top-2 duration-300">
                   <div className="absolute left-4 top-4 text-stone-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                    </svg>
                  </div>
                  <textarea
                    value={anotherTime}
                    onChange={(e) => setAnotherTime(e.target.value)}
                    placeholder={lang === Language.EN ? "Another Time" : "ពេលផ្សេង"}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 pl-12 h-24 outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all text-stone-800 font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold text-stone-800 mb-6">{lang === Language.EN ? 'Notes' : 'កំណត់សម្គាល់'}</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === Language.EN ? "Notes" : "កំណត់សម្គាល់"}
              className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-stone-800 resize-none"
            />
          </div>

          <button
            onClick={handleHousekeepingSubmit}
            disabled={isSubmitting}
            className="w-full bg-button text-white py-6 rounded-[2.5rem] font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? '...' : (lang === Language.EN ? 'SUBMIT REQUEST' : 'បញ្ជូនសំណើ')}
          </button>
        </div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout title={category}>
      <div className="space-y-10">
        {Object.entries(groupedItems).map(([groupName, items]) => (
          <div key={groupName} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {isAttractions && (
              <div className="flex items-center gap-3 mb-2 px-1">
                <div className="h-[2px] w-4 bg-primary rounded-full"></div>
                <h2 className={`text-xs font-bold text-primary uppercase tracking-[0.2em] ${lang === Language.KH ? 'khmer-text' : ''}`}>
                  {groupName}
                </h2>
              </div>
            )}
            
            <div className="space-y-4">
              {(items as MenuItem[]).map(item => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm flex items-center p-4 gap-4 group transition-all hover:shadow-md">
                  <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-2xl shadow-sm">
                    <img src={item.image} alt={item.name.en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {isAttractions && item.subCategory && (
                      <div className="mb-1.5 flex">
                        <span className={`inline-block px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider rounded-lg border border-primary/10 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                          {lang === Language.EN ? item.subCategory.en : item.subCategory.kh}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className={`font-serif font-bold text-stone-800 text-lg truncate flex-1 pr-2 ${lang === Language.KH ? 'khmer-text' : ''}`}>
                        {lang === Language.EN ? item.name.en : item.name.kh}
                      </h3>
                      {item.price > 0 && (
                        <span className="font-mono font-bold text-primary text-sm shrink-0">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    <p className={`text-stone-400 text-[11px] mb-2 line-clamp-2 leading-relaxed ${lang === Language.KH ? 'khmer-text' : ''}`}>
                      {lang === Language.EN ? item.description.en : item.description.kh}
                    </p>
                    <button 
                      onClick={() => handleItemAction(item)}
                      className="w-full bg-stone-50 text-stone-800 border border-stone-100 rounded-xl font-bold py-2.5 text-sm hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>{lang === Language.EN ? (isAttractions ? 'Details' : 'Book Now') : (isAttractions ? 'ព័ត៌មានលម្អិត' : 'កក់ឥឡូវនេះ')}</span>
                      {item.externalUrl && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]" onClick={() => !isSubmitting && setShowOrderModal(null)} />
          <div className="relative bg-white w-full max-w-md rounded-t-[2.5rem] p-8 pb-16 animate-in slide-in-from-bottom duration-500">
             <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mb-8" />
             <div className="space-y-6">
                <input 
                  type="text" 
                  value={localRoomNumber} 
                  onChange={(e) => setLocalRoomNumber(e.target.value)} 
                  placeholder="Room Number" 
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-stone-800 font-bold outline-none focus:ring-2 focus:ring-primary" 
                />
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  placeholder="Notes..." 
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-primary" 
                />
                <button 
                  onClick={() => handleGenericOrder(menuItems.find(i => i.id === showOrderModal))}
                  disabled={isSubmitting}
                  className="w-full bg-button text-white py-5 rounded-2xl font-bold shadow-xl"
                >
                  {isSubmitting ? '...' : 'Confirm'}
                </button>
             </div>
          </div>
        </div>
      )}
    </GuestLayout>
  );
};

export default MenuCategory;
