
import React from 'react';
import { Trophy, Star, TrendingUp, Medal, Search, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const topThree = [
    { rank: 2, name: 'Sanya Gupta', score: 4850, image: 'https://picsum.photos/seed/s1/80/80', class: '10-C' },
    { rank: 1, name: 'Rahul Aryan', score: 5240, image: 'https://picsum.photos/seed/s2/80/80', class: '10-A' },
    { rank: 3, name: 'Vikram Singh', score: 4620, image: 'https://picsum.photos/seed/s3/80/80', class: '10-B' },
  ];

  const rankings = [
    { rank: 4, name: 'Megha V.', score: 4510, class: '10-D', trend: 'up' },
    { rank: 5, name: 'Rohit K.', score: 4480, class: '10-B', trend: 'down' },
    { rank: 6, name: 'Amit J.', score: 4320, class: '10-A', trend: 'steady' },
    { rank: 7, name: 'Sneha P.', score: 4210, class: '10-C', trend: 'up' },
    { rank: 8, name: 'Priya M.', score: 4150, class: '10-B', trend: 'up' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">EduStream Hall of Fame 🏆</h1>
          <p className="text-slate-500">Celebrating our top achievers and consistent learners.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Find student..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-50 outline-none shadow-sm transition-all" />
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 pt-12 max-w-4xl mx-auto">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center gap-4 relative animate-in slide-in-from-bottom-8 duration-700 delay-100">
           <div className="absolute -top-6 bg-slate-100 text-slate-500 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-xl shadow-lg">2</div>
           <img src={topThree[0].image} className="w-20 h-20 rounded-full border-4 border-indigo-50" alt="" />
           <div className="text-center">
             <h4 className="font-bold text-slate-900">{topThree[0].name}</h4>
             <p className="text-xs text-slate-400">Class {topThree[0].class}</p>
           </div>
           <div className="bg-indigo-50 text-[#5D3FD3] px-6 py-2 rounded-full font-black text-sm">{topThree[0].score} pts</div>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 bg-gradient-to-br from-[#5D3FD3] to-purple-600 p-10 rounded-[48px] shadow-2xl shadow-indigo-200 flex flex-col items-center gap-6 relative z-10 transform scale-110 animate-in zoom-in-95 duration-700">
           <Crown className="absolute -top-12 text-yellow-400 w-20 h-20 drop-shadow-lg" />
           <div className="absolute -top-6 bg-yellow-400 text-white w-14 h-14 rounded-full border-4 border-[#5D3FD3] flex items-center justify-center font-bold text-2xl shadow-lg">1</div>
           <img src={topThree[1].image} className="w-28 h-28 rounded-full border-4 border-white/30" alt="" />
           <div className="text-center text-white">
             <h4 className="font-bold text-xl">{topThree[1].name}</h4>
             <p className="text-xs text-indigo-100 opacity-80 uppercase tracking-widest mt-1">Class {topThree[1].class}</p>
           </div>
           <div className="bg-white text-[#5D3FD3] px-8 py-3 rounded-full font-black text-lg shadow-xl">{topThree[1].score} pts</div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 md:order-3 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center gap-4 relative animate-in slide-in-from-bottom-8 duration-700 delay-200">
           <div className="absolute -top-6 bg-orange-100 text-orange-500 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-xl shadow-lg">3</div>
           <img src={topThree[2].image} className="w-20 h-20 rounded-full border-4 border-indigo-50" alt="" />
           <div className="text-center">
             <h4 className="font-bold text-slate-900">{topThree[2].name}</h4>
             <p className="text-xs text-slate-400">Class {topThree[2].class}</p>
           </div>
           <div className="bg-indigo-50 text-[#5D3FD3] px-6 py-2 rounded-full font-black text-sm">{topThree[2].score} pts</div>
        </div>
      </div>

      {/* Full Rankings List */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mt-12">
        <div className="p-8 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">National Rankings</h3>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global • Updated Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Rank</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Batch</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Points</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Trend</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((user) => (
                <tr key={user.rank} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-300 group-hover:text-[#5D3FD3] transition-colors">#{user.rank}</span>
                  </td>
                  <td className="px-8 py-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">{user.name.charAt(0)}</div>
                    <span className="font-bold text-slate-900">{user.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500">{user.class}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-black text-slate-900">{user.score}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {user.trend === 'up' ? <TrendingUp size={18} className="text-green-500 ml-auto" /> : 
                     user.trend === 'down' ? <TrendingUp size={18} className="text-red-400 ml-auto rotate-180" /> : 
                     <span className="text-slate-300 font-bold ml-auto">--</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User's Sticky Personal Rank */}
      <div className="sticky bottom-6 left-0 right-0 bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl flex items-center justify-between mx-4 border border-white/10">
         <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-xl text-yellow-400"><Medal size={24} /></div>
            <div>
               <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Your Current Position</p>
               <h4 className="font-bold">24th Rank Nationwide</h4>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Total Points</p>
               <p className="font-black text-xl">3,420</p>
            </div>
            <button className="bg-[#5D3FD3] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-900/40 hover:translate-y-[-2px] transition-all">
              View Profile
            </button>
         </div>
      </div>
    </div>
  );
};

export default Leaderboard;
