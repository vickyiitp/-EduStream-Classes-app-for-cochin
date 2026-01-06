
import React from 'react';
import { Users, Clock, Star, Play, MessageCircle, ArrowRight, Upload, Radio } from 'lucide-react';
import { Batch } from '../types';

interface TeacherDashboardProps {
  onUploadClick: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onUploadClick }) => {
  // Fix: Added missing required 'price' property to Batch objects
  const teacherBatches: Batch[] = [
    { id: '1', name: 'Lakshya JEE 2026', subject: 'Class 10 • Physics', enrolledStudents: 1240, progress: 65, image: 'https://picsum.photos/seed/physics/300/150', price: '₹4,499' },
    { id: '2', name: 'Abhyas Board Special', subject: 'Class 10 • Science', enrolledStudents: 850, progress: 32, image: 'https://picsum.photos/seed/science/300/150', price: '₹3,499' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teacher Workspace 🍎</h1>
          <p className="text-slate-500">Manage your classes, students, and curriculum content.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onUploadClick}
            className="bg-[#5D3FD3] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <Upload size={18} /> New Content
          </button>
          <button className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2 shadow-lg shadow-red-100">
            <Radio size={18} /> Go Live
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Enrolled Students', value: '2,090', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Hours Taught', value: '450h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Avg. Rating', value: '4.9/5.0', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Batches */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Your Active Batches</h2>
            <button className="text-[#5D3FD3] text-sm font-bold">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherBatches.map(batch => (
              <div key={batch.id} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden group hover:shadow-xl transition-all">
                <div className="h-32 overflow-hidden relative">
                  <img src={batch.image} className="w-full h-full object-cover" alt={batch.name} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-[#5D3FD3] px-6 py-2 rounded-xl font-bold text-sm">Enter Classroom</button>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{batch.name}</h3>
                    <p className="text-xs text-slate-500">{batch.subject} • {batch.enrolledStudents} Students</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Clock size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Next: Today, 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doubts & Notifications */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Student Doubts</h2>
          <div className="bg-white rounded-[32px] border border-slate-100 p-6 space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 group cursor-pointer border-b border-slate-50 last:border-0 pb-4">
                <img src={`https://picsum.photos/seed/${i + 10}/40/40`} className="w-10 h-10 rounded-full" alt="Student" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900">Deepak Kumar</h4>
                    <span className="text-[8px] font-bold text-slate-400">12m ago</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">Sir, I have a doubt in Question 4 of the assignment...</p>
                  <button className="mt-2 text-[10px] font-bold text-[#5D3FD3] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Reply Now <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all text-xs">
              View All Doubt Forum
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Recent Content Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Topic</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Laws of Motion - Lecture 5', type: 'Video', status: 'Published' },
                { title: 'Algebra Equations PDF', type: 'Notes', status: 'Scheduled' },
                { title: 'Weekly Quiz - Motion', type: 'Quiz', status: 'Published' },
              ].map((item, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-slate-900">{item.title}</td>
                  <td className="px-8 py-5 text-sm text-slate-500">{item.type}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      item.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-[#5D3FD3] hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
