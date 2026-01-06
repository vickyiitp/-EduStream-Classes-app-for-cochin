
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Batch } from '../types';

interface BatchesListingProps {
  onBatchSelect: (batchId: string) => void;
}

const BatchesListing: React.FC<BatchesListingProps> = ({ onBatchSelect }) => {
  const [filter, setFilter] = useState('All');

  // Fix: Added missing required 'price' property to Batch objects
  const batches: Batch[] = [
    { id: '1', name: 'Lakshya JEE 2026', subject: 'Class 10 • Physics & Maths', progress: 0, enrolledStudents: 12000, image: 'https://picsum.photos/seed/physics/400/200', price: '₹4,499' },
    { id: '2', name: 'Abhyas Board Special', subject: 'Class 10 • All Subjects', progress: 0, enrolledStudents: 8500, image: 'https://picsum.photos/seed/math/400/200', price: '₹3,499' },
    { id: '3', name: 'English Excellence', subject: 'Grammar & Writing', progress: 0, enrolledStudents: 4200, image: 'https://picsum.photos/seed/english/400/200', price: '₹1,499' },
    { id: '4', name: 'Science Explorer', subject: 'Class 9 • Biology & Chem', progress: 0, enrolledStudents: 3100, image: 'https://picsum.photos/seed/bio/400/200', price: '₹2,499' },
    { id: '5', name: 'Math Wizard 9th', subject: 'Class 9 • Mathematics', progress: 0, enrolledStudents: 2900, image: 'https://picsum.photos/seed/wizard/400/200', price: '₹2,199' },
  ];

  const filtered = batches.filter(b => filter === 'All' || b.subject.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Explore Batches</h1>
          <p className="text-slate-500 mt-2">Find the perfect batch to start your preparation.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search for batches..." className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 w-full md:w-64" />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {['All', 'Class 10', 'Class 9', 'JEE', 'English'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
              filter === cat ? 'bg-[#5D3FD3] text-white shadow-xl shadow-indigo-100' : 'bg-white border border-slate-100 text-slate-500 hover:border-indigo-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(batch => (
          <div key={batch.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img src={batch.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={batch.name} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-indigo-600">Enrollment Open</div>
            </div>
            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase">4.9 (2k+)</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#5D3FD3] transition-colors">{batch.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{batch.subject}</p>
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-slate-50">
                <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
                  <BookOpen size={16} />
                </div>
                <span className="text-xs font-bold text-slate-600">{batch.enrolledStudents}+ Students enrolled</span>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Price Starts from</p>
                  <p className="text-lg font-black text-slate-900">{batch.price} <span className="text-xs text-slate-400 font-bold line-through ml-1">₹7,000</span></p>
                </div>
                <button 
                  onClick={() => onBatchSelect(batch.id)}
                  className="bg-[#5D3FD3] text-white p-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchesListing;
