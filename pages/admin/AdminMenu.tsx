
import React, { useState, useRef } from 'react';
import { AdminLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { MenuItem, Category } from '../../types';
import { supabase } from '../../services/supabase';

const AdminMenu: React.FC = () => {
  const { menuItems, setMenuItems } = useApp();
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const FOOD_CATEGORIES = [
    Category.ROOM_SERVICE,
    Category.POOLSIDE,
    Category.BREAKFAST,
    Category.RESTAURANT
  ];

  const filteredMenuItems = menuItems.filter(item => FOOD_CATEGORIES.includes(item.category));

  const confirmDelete = async () => {
    if (itemToDelete) {
      await supabase.from('menu_items').delete().eq('id', itemToDelete.id);
      setMenuItems(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleToggle = async (id: string) => {
    const item = menuItems.find(i => i.id === id);
    if (item) {
      const updated = { ...item, available: !item.available };
      await supabase.from('menu_items').update({ data: updated }).eq('id', id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const finalItem: MenuItem = editingItem.id 
      ? (editingItem as MenuItem) 
      : { ...(editingItem as any), id: Math.random().toString(36).substr(2, 9) };

    await supabase.from('menu_items').upsert({ id: finalItem.id, data: finalItem });
    setEditingItem(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem(prev => prev ? { ...prev, image: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout title="Menu (Food & Beverage)">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50/50">
          <h2 className="text-lg font-bold">Restaurant & Room Service</h2>
          <button 
            onClick={() => setEditingItem({
              name: { en: '', kh: '' },
              description: { en: '', kh: '' },
              price: 0,
              category: Category.ROOM_SERVICE,
              available: true,
              image: 'https://picsum.photos/400/300'
            })}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors"
          >
            + Add New Dish
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 text-stone-400 text-xs uppercase font-bold tracking-wider">
              <th className="px-6 py-4">Dish</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredMenuItems.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-stone-800">{item.name.en}</p>
                      <p className="text-xs text-stone-400 khmer-text">{item.name.kh}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-stone-600">{item.category}</td>
                <td className="px-6 py-4 font-mono font-bold text-stone-700">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleToggle(item.id)} className={`px-3 py-1 rounded-full text-xs font-bold ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingItem(item)} className="p-2 text-stone-400 hover:text-primary transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                    <button onClick={() => setItemToDelete(item)} className="p-2 text-stone-400 hover:text-red-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 animate-in zoom-in duration-200 shadow-2xl">
            <h3 className="text-xl font-bold mb-2 text-center">Delete Dish?</h3>
            <div className="flex gap-3">
              <button onClick={() => setItemToDelete(null)} className="flex-1 px-6 py-3 font-bold text-stone-500 bg-stone-100 rounded-xl">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-6 py-3 font-bold text-white bg-red-500 rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 animate-in zoom-in duration-200">
             <form onSubmit={handleSave} className="space-y-6">
               <h3 className="text-2xl font-bold">{editingItem.id ? 'Edit Dish' : 'Add New Dish'}</h3>
               <div className="grid grid-cols-2 gap-4">
                 <input required type="text" placeholder="Name (EN)" value={editingItem.name?.en} onChange={(e) => setEditingItem({ ...editingItem, name: { ...editingItem.name!, en: e.target.value } })} className="border p-3 rounded-xl" />
                 <input required type="text" placeholder="ឈ្មោះ (KH)" value={editingItem.name?.kh} onChange={(e) => setEditingItem({ ...editingItem, name: { ...editingItem.name!, kh: e.target.value } })} className="border p-3 rounded-xl khmer-text" />
               </div>
               <div className="flex justify-end gap-3">
                 <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-2 text-stone-500">Cancel</button>
                 <button type="submit" className="bg-primary text-white px-8 py-2 rounded-xl font-bold">Save dish to Supabase</button>
               </div>
             </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMenu;
