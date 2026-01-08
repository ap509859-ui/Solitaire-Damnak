
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { Language } from '../../types';

const FeedbackForm: React.FC = () => {
  const { lang, addFeedback } = useApp();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber) return alert('Room number required');
    
    addFeedback({
      roomNumber,
      rating,
      comment
    });
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (submitted) {
    return (
      <GuestLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-6">🙏</div>
          <h2 className={`text-2xl font-bold mb-2 ${lang === Language.KH ? 'khmer-text' : ''}`}>
            {lang === Language.EN ? 'Thank You!' : 'សូមអរគុណ!'}
          </h2>
          <p className="text-stone-500">
            {lang === Language.EN ? 'Your feedback helps us improve.' : 'មតិរបស់អ្នកជួយយើងអោយកាន់តែប្រសើរឡើង។'}
          </p>
        </div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout title={lang === Language.EN ? 'Share Your Experience' : 'ចែករំលែកបទពិសោធន៍របស់អ្នក'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-center text-stone-500 mb-4">
            {lang === Language.EN ? 'How was your stay so far?' : 'តើការស្នាក់នៅរបស់អ្នកយ៉ាងណាដែរ?'}
          </p>
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform active:scale-125 ${star <= rating ? 'grayscale-0' : 'grayscale'}`}
              >
                ⭐
              </button>
            ))}
          </div>

          <div className="space-y-4">
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
              <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Your Comments</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={lang === Language.EN ? "Tell us more..." : "ប្រាប់យើងបន្ថែម..."}
                className="w-full border border-stone-200 rounded-xl p-3 h-32 outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-button text-white py-4 rounded-xl font-bold shadow-lg hover:bg-button-dark transition-colors"
        >
          {lang === Language.EN ? 'Submit Feedback' : 'ផ្ញើមតិកែលម្អ'}
        </button>
      </form>
    </GuestLayout>
  );
};

export default FeedbackForm;
