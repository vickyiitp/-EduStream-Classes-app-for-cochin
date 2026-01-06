
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Search, 
  Plus,
  BookOpen,
  Edit,
  Trash2,
  Headphones,
  ChevronRight,
  Star
} from 'lucide-react';
import BatchForm from './BatchForm';
import UserManagement from './UserManagement';
import { Batch } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'users' | 'batches'>('batches');
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  // Initial Mock State for Batches
  const [batches, setBatches] = useState<Batch[]>([
    { id: '1', name: 'Board Crusher 2025', subject: 'Math & Science', class: '10th', examType: 'Boards', language: 'Hinglish', price: '₹3,499', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e51afb?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 12000, isNew: true, isFeatured: true },
    { id: '2', name: 'Foundation Pro Max', subject: 'Science & Math', class: '9th', examType: 'Foundation', language: 'English', price: '₹5,999', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 8500, isPopular: true },
  ]);

  const handleDeleteBatch = (id: string) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      setBatches(batches.filter(b => b.id !== id));
    }
  };

  const handleSaveBatch = (batchData: any) => {
    if (editingBatch) {
      setBatches(batches.map(b => b.id === editingBatch.id ? { ...b, ...batchData } : b));
    } else {
      const newBatch: Batch = {
        ...batchData,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        enrolledStudents: 0
      };
      setBatches([newBatch, ...batches]);
    }
    setShowBatchForm(false);
    setEditingBatch(null);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Command Center 🛡️</h1>
          <p className="text-slate-500">Platform-wide overview and curriculum control.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setEditingBatch(null); setShowBatchForm(true); }}
            className="bg-[#5D3FD3] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <Plus size={18} /> Create New Batch
          </button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹4.5L', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Total Users', value: '12,400', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
          { label: 'Active Batches', value: batches.length.toString(), icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Support Queue', value: '2', icon: Headphones, color: 'text-orange-600', bg: 'bg-orange-100' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {/* Toggle View */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 w-fit">
          <button 
            onClick={() => setActiveView('batches')}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeView === 'batches' ? 'bg-[#5D3FD3] text-white shadow-lg' : 'text-slate-500'}`}
          >
            Batch Management
          </button>
          <button 
            onClick={() => setActiveView('users')}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeView === 'users' ? 'bg-[#5D3FD3] text-white shadow-lg' : 'text-slate-500'}`}
          >
            User Management
          </button>
        </div>

        {activeView === 'batches' ? (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Curriculum Inventory</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search batches" className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Batch Details</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Spotlight</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch) => (
                    <tr key={batch.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-5 flex items-center gap-4">
                        <img src={batch.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{batch.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{batch.class} • {batch.language}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">{batch.subject}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-slate-900">{batch.price}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2 flex-wrap max-w-[150px]">
                          {batch.isFeatured && (
                             <span className="text-[8px] font-black bg-indigo-50 text-[#5D3FD3] px-2 py-0.5 rounded uppercase flex items-center gap-1 border border-indigo-100">
                               <Star size={8} fill="currentColor" /> Hero
                             </span>
                          )}
                          {batch.isNew && <span className="text-[8px] font-black bg-slate-50 text-slate-500 px-2 py-0.5 rounded uppercase">New</span>}
                          {batch.isPopular && <span className="text-[8px] font-black bg-orange-50 text-orange-500 px-2 py-0.5 rounded uppercase">Popular</span>}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setEditingBatch(batch); setShowBatchForm(true); }}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteBatch(batch.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <UserManagement />
        )}
      </div>

      {showBatchForm && (
        <BatchForm 
          batch={editingBatch} 
          onSave={handleSaveBatch} 
          onClose={() => { setShowBatchForm(false); setEditingBatch(null); }} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;