
import React from 'react';
import { PieChart, Calendar, Clock, BookOpen, Target, ChevronRight } from 'lucide-react';

const StudentAnalytics: React.FC = () => {
  // Simulate activity heatmap data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityData = [
    [10, 30, 0, 50, 20, 0, 40],
    [5, 45, 10, 0, 35, 60, 25],
    [20, 10, 40, 30, 5, 15, 50],
    [40, 0, 25, 60, 20, 45, 10]
  ];

  const getColor = (val: number) => {
    if (val === 0) return 'bg-slate-100';
    if (val < 20) return 'bg-indigo-200';
    if (val < 40) return 'bg-indigo-400';
    return 'bg-indigo-600';
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Learning Analytics 📈</h1>
          <p className="text-slate-500">Visualize your study patterns and academic growth.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          <button className="px-6 py-2 rounded-xl text-sm font-bold bg-[#5D3FD3] text-white shadow-lg">Weekly</button>
          <button className="px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50">Monthly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Heatmap */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar size={20} className="text-indigo-500" /> Study Heatmap
            </h3>
            <span className="text-xs text-slate-400 font-medium">Daily Engagement (Hours)</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase">
              {days.map(d => <span key={d} className="w-8 text-center">{d}</span>)}
            </div>
            <div className="flex flex-col gap-2">
              {activityData.map((week, wi) => (
                <div key={wi} className="flex justify-between">
                  {week.map((val, di) => (
                    <div 
                      key={di} 
                      className={`w-8 h-8 rounded-lg ${getColor(val)} transition-all hover:scale-110 cursor-help relative group`}
                      title={`${val} mins`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {val} mins
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4 text-[10px] font-bold text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded bg-slate-100"></div>
              <div className="w-3 h-3 rounded bg-indigo-200"></div>
              <div className="w-3 h-3 rounded bg-indigo-400"></div>
              <div className="w-3 h-3 rounded bg-indigo-600"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Quick Stats Column */}
        <div className="space-y-6">
          {[
            { label: 'Time Spent', value: '18h 45m', trend: '+12%', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Courses Active', value: '4 Courses', trend: 'Steady', icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Goals Met', value: '85%', trend: '+5%', icon: Target, color: 'text-green-600', bg: 'bg-green-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                {stat.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Progress Breakdown */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Syllabus Progress Breakdown</h3>
          <button className="text-sm font-bold text-indigo-600">View Detailed Report</button>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { subject: 'Mathematics', current: 'Calculus', progress: 75 },
            { subject: 'Physics', current: 'Optics', progress: 42 },
            { subject: 'Chemistry', current: 'Organic', progress: 90 },
            { subject: 'Biology', current: 'Genetics', progress: 28 }
          ].map((item, i) => (
            <div key={i} className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{item.subject}</h4>
                  <p className="text-xs text-slate-400 mt-1">Current: <span className="text-slate-600 font-semibold">{item.current}</span></p>
                </div>
                <div className="text-sm font-black text-indigo-600">{item.progress}%</div>
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
