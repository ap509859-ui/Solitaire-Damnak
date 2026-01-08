
import React from 'react';
import { AdminLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { RequestItem } from '../../types';
import Icons from '../../components/Icons';

const AdminRequests: React.FC = () => {
  const { requests, updateRequestStatus } = useApp();

  const getStatusColor = (status: RequestItem['status']) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'follow_up': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-stone-100 text-stone-600';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const getRequestIcon = (type: RequestItem['type']) => {
    switch(type) {
      case 'order': return 'room-service';
      case 'checkout': return 'checkout';
      case 'feedback': return 'rating';
      case 'service': return 'housekeeping';
      default: return 'stats';
    }
  };

  return (
    <AdminLayout title="Requests & Orders">
      <div className="space-y-6">
        {requests.length === 0 ? (
          <div className="bg-white p-20 text-center rounded-2xl border border-stone-200 text-stone-400">
            No requests found yet.
          </div>
        ) : (
          requests.map(request => (
            <div key={request.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-50 text-stone-400 rounded-xl flex items-center justify-center shrink-0">
                  <Icons name={getRequestIcon(request.type)} className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-stone-800 text-lg">Room {request.roomNumber}</span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm mb-2">
                    {request.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || request.type.toUpperCase()}
                  </p>
                  <p className="text-stone-400 text-xs italic">
                    {request.details}
                  </p>
                  <p className="text-[10px] text-stone-300 mt-2 font-mono">
                    {new Date(request.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {request.status === 'pending' && (
                  <button 
                    onClick={() => updateRequestStatus(request.id, 'confirmed')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                  >
                    Confirm
                  </button>
                )}
                {(request.status === 'pending' || request.status === 'confirmed') && (
                  <button 
                    onClick={() => updateRequestStatus(request.id, 'follow_up')}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors"
                  >
                    Follow Up
                  </button>
                )}
                {(request.status === 'confirmed' || request.status === 'pending' || request.status === 'follow_up') && (
                  <button 
                    onClick={() => updateRequestStatus(request.id, 'completed')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors"
                  >
                    Mark Done
                  </button>
                )}
                {request.status !== 'completed' && request.status !== 'cancelled' && (
                  <button 
                    onClick={() => updateRequestStatus(request.id, 'cancelled')}
                    className="bg-stone-100 text-stone-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-stone-200 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;
