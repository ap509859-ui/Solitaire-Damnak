
import React from 'react';
import { AdminLayout } from '../../components/Layout';
import { useApp } from '../../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icons, { IconName } from '../../components/Icons';

const AdminDashboard: React.FC = () => {
  const { requests, feedbacks, hotelSettings } = useApp();

  const activeStatuses = ['pending', 'confirmed', 'follow_up'];

  const stats = [
    { label: 'Total Requests', value: requests.length, icon: 'stats' as IconName, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Orders', value: requests.filter(r => activeStatuses.includes(r.status)).length, icon: 'active' as IconName, color: 'bg-amber-50 text-amber-600' },
    { label: 'Completed', value: requests.filter(r => r.status === 'completed').length, icon: 'completed' as IconName, color: 'bg-green-50 text-green-600' },
    { label: 'Avg Rating', value: feedbacks.length ? (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1) : 'N/A', icon: 'rating' as IconName, color: 'bg-purple-50 text-purple-600' },
  ];

  // Dummy chart data
  const chartData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 30 },
    { name: 'Sat', value: 45 },
    { name: 'Sun', value: 38 },
  ];

  const pieData = [
    { name: 'Room Service', value: 40 },
    { name: 'Housekeeping', value: 30 },
    { name: 'Wellness', value: 15 },
    { name: 'Other', value: 15 },
  ];

  const COLORS = [hotelSettings.primaryColor, '#1C1C1C', '#D4D4D8', '#71717A'];

  return (
    <AdminLayout title="Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <Icons name={stat.icon} className="w-6 h-6" />
            </div>
            <div>
              <p className="text-stone-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Service Volume (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f5f5f4'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill={hotelSettings.primaryColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Request Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-stone-600">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
