
import React, { useState, useRef } from 'react';
import { AdminLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { MenuItem, Category } from '../../types';

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

  const confirmDelete = () => {
    if (itemToDelete) {
      setMenuItems(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleToggle = (id: string) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item));
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (editingItem.id) {
      setMenuItems(prev => prev.map(item => item.id === editingItem.id ? (editingItem as MenuItem) : item));
    } else {
      const newItem: MenuItem = {
        ...(editingItem as any),
        id: Math.random().toString(36).substr(2, 9),
      };
      setMenuItems(prev => [...prev, newItem]);
    }
    setEditingItem(null);
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

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 animate-in zoom-in duration-200 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Delete Menu Item?</h3>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-stone-800">"{itemToDelete.name.en}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setItemToDelete(null)}
                className="flex-1 px-6 py-3 font-bold text-stone-500 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 animate-in zoom-in duration-200">
            <h3 className="text-2xl font-bold mb-8">{editingItem.id ? 'Edit Dish' : 'Add New Dish'}</h3>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Name (English)</label>
                    <input required type="text" value={editingItem.name?.en} onChange={(e) => setEditingItem({ ...editingItem, name: { ...editingItem.name!, en: e.target.value } })} className="w-full border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1 khmer-text">ឈ្មោះ (ខ្មែរ)</label>
                    <input required type="text" value={editingItem.name?.kh} onChange={(e) => setEditingItem({ ...editingItem, name: { ...editingItem.name!, kh: e.target.value } })} className="w-full border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Category</label>
                    <select value={editingItem.category} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as Category })} className="w-full border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary">
                      {FOOD_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Price ($)</label>
                    <input required type="number" step="0.01" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })} className="w-full border border-stone-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Dish Image</label>
                    <div className="flex gap-4 items-center mt-1">
                      <div className="w-20 h-20 bg-stone-100 rounded-xl border border-stone-200 overflow-hidden shrink-0">
                        <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input 
                          type="file" 
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs font-bold bg-stone-100 text-stone-600 px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors w-full"
                        >
                          Upload Photo
                        </button>
                        <input 
                          type="text" 
                          placeholder="Or paste image URL"
                          value={editingItem.image?.startsWith('data:') ? '' : editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          className="w-full border border-stone-200 rounded-lg p-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Description</label>
                    <textarea value={editingItem.description?.en} onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description!, en: e.target.value } })} className="w-full border border-stone-200 rounded-xl p-3 h-24 outline-none focus:ring-2 focus:ring-primary"></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-stone-100">
                <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-3 font-bold text-stone-500">Cancel</button>
                <button type="submit" className="px-8 py-3 bg-primary text-white rounded-xl font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMenu;
