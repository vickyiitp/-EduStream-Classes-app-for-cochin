
import React from 'react';
import { TrendingUp, Award, Clock, FileText, ChevronRight, Search } from 'lucide-react';

const Scoreboard: React.FC = () => {
  const testHistory = [
    { id: 1, name: 'Science Half Yearly', date: '12 Oct, 2024', score: 88, max: 100, rank: 12 },
    { id: 2, name: 'Math Algebra Unit 1', date: '05 Oct, 2024', score: 95, max: 100, rank: 3 },
    { id: 3, name: 'English Grammar Weekly', date: '28 Sep, 2024', score: 42, max: 50, rank: 25 },
    { id: 4, name: 'Physics Motion Quiz', date: '15 Sep, 2024', score: 72, max: 80, rank: 8 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Performance Portfolio 📊</h1>
          <p className="text-slate-500">Track your progress and excel in your learning journey.</p>
        </div>
        <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
          Download Full Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: TrendingUp, label: 'Overall Percent', value: '88.4%', color: 'text-green-600', bg: 'bg-green-100' },
          { icon: Award, label: 'Current Rank', value: '24th', color: 'text-indigo-600', bg: 'bg-indigo-100' },
          { icon: Clock, label: 'Tests Taken', value: '12', color: 'text-orange-600', bg: 'bg-orange-100' },
          { icon: FileText, label: 'Assignments', value: '96%', color: 'text-blue-600', bg: 'bg-blue-100' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`${s.bg} ${s.color} p-4 rounded-2xl`}>
              <s.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Graph Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Performance Over Time</h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-4 py-1.5 text-xs font-bold bg-white text-indigo-600 rounded-md shadow-sm">Monthly</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500">Yearly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[65, 45, 78, 85, 92, 70, 88].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
                <div 
                  className="w-full bg-indigo-50 group-hover:bg-[#5D3FD3] transition-all rounded-t-xl duration-500" 
                  style={{ height: `${h}%` }}
                ></div>
                <div className="mt-4 text-center text-[10px] font-bold text-slate-400 uppercase">Test {i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject-wise Radar/Bars */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Subject Analysis</h3>
          <div className="space-y-6 pt-4">
            {[
              { subject: 'Mathematics', score: 95, color: 'bg-indigo-500' },
              { subject: 'Physics', score: 82, color: 'bg-blue-500' },
              { subject: 'Chemistry', score: 78, color: 'bg-green-500' },
              { subject: 'English', score: 91, color: 'bg-orange-500' },
              { subject: 'History', score: 64, color: 'bg-red-500' },
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-600">{s.subject}</span>
                  <span className="text-slate-900">{s.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Detailed Test History</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search tests..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Test Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Score</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Rank</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {testHistory.map((test) => (
                <tr key={test.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-900">{test.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Class 10-A</p>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{test.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${test.score > 80 ? 'text-green-600' : 'text-orange-600'}`}>{test.score}/{test.max}</span>
                      <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${test.score > 80 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${(test.score/test.max)*100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">AIR {test.rank}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#5D3FD3] hover:bg-white rounded-lg transition-all group-hover:shadow-md">
                      <ChevronRight size={20} />
                    </button>
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

export default Scoreboard;
