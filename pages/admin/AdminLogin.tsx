
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../App';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const { setIsAdmin } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple simulation
      setIsAdmin(true);
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-sm rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto text-white text-3xl font-serif font-bold mb-4">L</div>
          <h1 className="text-2xl font-bold text-stone-800">Staff Portal</h1>
          <p className="text-stone-500 text-sm">Access the hotel management system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase mb-2 tracking-widest">Access Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-stone-100 py-3 focus:border-primary outline-none text-center text-2xl tracking-widest transition-colors"
              placeholder="••••••"
              autoFocus
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-button text-white py-4 rounded-2xl font-bold hover:bg-button-dark transition-all transform hover:-translate-y-1"
          >
            Authorize Access
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs text-stone-400">
          Authorized personnel only. Sessions are monitored.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
