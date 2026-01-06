
import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Sparkles, Star } from 'lucide-react';
import { Batch } from '../types';

interface BatchFormProps {
  batch: Batch | null;
  onSave: (data: any) => void;
  onClose: () => void;
}

const BatchForm: React.FC<BatchFormProps> = ({ batch, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    price: '₹',
    class: '10th',
    examType: 'Boards',
    language: 'Hinglish',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e51afb?q=80&w=400&h=250&fit=crop',
    isNew: false,
    isPopular: false,
    isFeatured: false
  });

  useEffect(() => {
    if (batch) {
      setFormData({
        name: batch.name,
        subject: batch.subject,
        price: batch.price,
        class: batch.class || '10th',
        examType: batch.examType || 'Boards',
        language: batch.language || 'Hinglish',
        image: batch.image,
        isNew: !!batch.isNew,
        isPopular: !!batch.isPopular,
        isFeatured: !!batch.isFeatured
      });
    }
  }, [batch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 text-[#5D3FD3] p-2.5 rounded-xl">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{batch ? 'Edit Existing Batch' : 'Create New Batch'}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Batch Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Lakshya JEE 2026"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Main Subject</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                placeholder="e.g. Physics & Math"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Grade/Class</label>
              <select 
                value={formData.class}
                onChange={e => setFormData({...formData, class: e.target.value as any})}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all cursor-pointer"
              >
                <option value="9th">Class 9th</option>
                <option value="10th">Class 10th</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Enrollment Price</label>
              <input 
                type="text" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                placeholder="₹4,499"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-black text-indigo-600" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Medium</label>
              <select 
                value={formData.language}
                onChange={e => setFormData({...formData, language: e.target.value as any})}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all cursor-pointer"
              >
                <option value="Hinglish">Hinglish</option>
                <option value="English">English Only</option>
                <option value="Hindi">Hindi Medium</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Cover Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-xs" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
             <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isNew} 
                  onChange={e => setFormData({...formData, isNew: e.target.checked})}
                  className="w-5 h-5 rounded-lg accent-[#5D3FD3]"
                />
                <span className="text-[10px] font-black text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-widest">New</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isPopular} 
                  onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                  className="w-5 h-5 rounded-lg accent-orange-500"
                />
                <span className="text-[10px] font-black text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-widest">Popular</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isFeatured} 
                  onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                  className="w-5 h-5 rounded-lg accent-indigo-600"
                />
                <span className="text-[10px] font-black text-[#5D3FD3] group-hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Hero Featured
                </span>
             </label>
          </div>
        </form>

        <div className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-white">
          <button onClick={onClose} className="px-8 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors">Cancel</button>
          <button 
            onClick={handleSubmit}
            className="bg-[#5D3FD3] text-white px-10 py-3 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Save size={18} /> {batch ? 'Update Batch' : 'Create Batch'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchForm;