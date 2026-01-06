
import React from 'react';
import { Play, Clock, ArrowRight } from 'lucide-react';
import { Batch, LiveClass } from '../types';

interface DashboardProps {
  onBatchClick: (id?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBatchClick }) => {
  // Fix: Added missing required 'price' property to Batch objects
  const batches: Batch[] = [
    { id: '1', name: 'Lakshya JEE 2026', subject: 'Class 10 • Science & Math', progress: 45, image: 'https://picsum.photos/seed/physics/300/150', price: '₹4,499' },
    { id: '2', name: 'Abhyas Board Special', subject: 'Class 10 • All Subjects', progress: 12, image: 'https://picsum.photos/seed/math/300/150', price: '₹3,499' },
    { id: '3', name: 'English Excellence', subject: 'Grammar & Writing', progress: 85, image: 'https://picsum.photos/seed/english/300/150', price: '₹1,499' },
  ];

  const liveClasses: LiveClass[] = [
    { id: 'l1', subject: 'Mathematics', topic: 'Quadratic Equations - Lecture 4', teacher: 'P.K. Sharma', isLive: true },
    { id: 'l2', subject: 'Physics', topic: 'Light Reflection & Refraction', teacher: 'Anjali Gupta', isLive: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Aryan! 👋</h1>
          <p className="text-slate-500">Let's continue your learning journey for Class 10.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Learning Streak</p>
            <p className="text-sm font-bold text-slate-900">12 Days 🔥</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Continue Learning</h2>
            <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View History <ArrowRight size={14} />
            </button>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all group cursor-pointer" onClick={() => onBatchClick('1')}>
            <div className="relative w-full md:w-64 h-40 rounded-xl overflow-hidden shrink-0">
              <img src="https://picsum.photos/seed/video/500/300" alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-500" style={{ width: '65%' }}></div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit uppercase">Physics</span>
              <h3 className="text-xl font-bold text-slate-900">Magnetism & Electric Current</h3>
              <p className="text-slate-500 text-sm">Chapter 12 • Lesson 4 of 12 • Remaining: 15m 20s</p>
              <div className="mt-2 flex items-center gap-3">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Resume Lesson
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Now */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Live Now</h2>
          <div className="space-y-3">
            {liveClasses.map((live) => (
              <div key={live.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
                  </div>
                  <span className="text-xs text-slate-400">2.4k Watching</span>
                </div>
                <h4 className="font-bold text-slate-900 line-clamp-1">{live.topic}</h4>
                <p className="text-xs text-slate-500 mb-4">{live.subject} • {live.teacher}</p>
                <button className="w-full py-2 bg-slate-50 text-indigo-600 font-bold rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm">
                  Join Class
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">My Batches</h2>
          <button className="text-indigo-600 text-sm font-semibold">View All Batches</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all" onClick={() => onBatchClick(batch.id)}>
              <div className="h-32 overflow-hidden relative">
                <img src={batch.image} alt={batch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-700">CLASS 10</div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{batch.name}</h3>
                  <p className="text-xs text-slate-500">{batch.subject}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>PROGRESS</span>
                    <span>{batch.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${batch.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 gap-3 group cursor-pointer hover:bg-slate-50 transition-all">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
              <Play size={20} />
            </div>
            <p className="text-sm font-bold text-slate-500 group-hover:text-indigo-600">Explore New Batches</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
