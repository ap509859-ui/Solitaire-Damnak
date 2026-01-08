
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { Language } from '../../types';

const CheckoutRequest: React.FC = () => {
  const { lang, addRequest } = useApp();
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState('');
  const [time, setTime] = useState('');
  const [luggage, setLuggage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber) return alert('Room number required');

    addRequest({
      type: 'checkout',
      roomNumber,
      details: `Scheduled for: ${time}. Need luggage help: ${luggage ? 'Yes' : 'No'}`
    });
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (submitted) {
    return (
      <GuestLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-4xl mb-6">🏨</div>
          <h2 className="text-2xl font-bold mb-2">Checkout Requested</h2>
          <p className="text-stone-500">Reception will contact you shortly.</p>
        </div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout title={lang === Language.EN ? 'Check-out Request' : 'ការស្នើសុំចាកចេញ'}>
      <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm mb-6">
        <p className="text-stone-500 mb-6 text-sm leading-relaxed">
          {lang === Language.EN 
            ? 'Please let us know your planned departure time so we can prepare your final bill.' 
            : 'សូមប្រាប់យើងពីពេលវេលាចាកចេញរបស់អ្នក ដើម្បីអោយយើងរៀបចំវិក្កយបត្រចុងក្រោយជូន។'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Room Number</label>
            <input 
              type="text" 
              required
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="302"
              className="w-full border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Planned Time</label>
            <input 
              type="time" 
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl cursor-pointer">
            <input 
              type="checkbox" 
              checked={luggage}
              onChange={(e) => setLuggage(e.target.checked)}
              className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-stone-700">Need help with luggage?</span>
          </label>

          <button 
            type="submit"
            className="w-full bg-button text-white py-4 rounded-xl font-bold mt-4 shadow-lg hover:bg-button-dark transition-colors"
          >
            {lang === Language.EN ? 'Submit Request' : 'ផ្ញើការស្នើសុំ'}
          </button>
        </form>
      </div>

      <div className="text-center">
        <p className="text-xs text-stone-400">
          Standard check-out time is 12:00 PM.
        </p>
      </div>
    </GuestLayout>
  );
};

export default CheckoutRequest;
