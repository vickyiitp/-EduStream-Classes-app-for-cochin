
import React from 'react';
import { 
  CreditCard, TrendingUp, DollarSign, ArrowUpRight, 
  ArrowDownRight, Download, Filter, Calendar, PieChart
} from 'lucide-react';

const RevenueReports: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Insights 💸</h1>
          <p className="text-slate-500">Track subscriptions, revenue, and teacher payouts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
          <div className="bg-white border border-slate-200 p-1 rounded-xl flex">
            <button className="px-4 py-1.5 text-xs font-bold bg-[#5D3FD3] text-white rounded-lg shadow-lg shadow-indigo-100">Daily</button>
            <button className="px-4 py-1.5 text-xs font-bold text-slate-500">Weekly</button>
            <button className="px-4 py-1.5 text-xs font-bold text-slate-500">Monthly</button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹14.2L', trend: '+14.5%', isUp: true, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Subscribers', value: '4,520', trend: '+8.2%', isUp: true, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-100' },
          { label: 'Teacher Payouts', value: '₹5.8L', trend: '-2.1%', isUp: false, icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-100' },
          { label: 'Refunds', value: '₹12k', trend: '+0.5%', isUp: false, icon: PieChart, color: 'text-red-600', bg: 'bg-red-100' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4 group hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-[10px] font-black ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Revenue Trends</h3>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div> New Sales
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div> Renewals
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-3 px-2 border-b border-slate-100">
            {[40, 65, 55, 85, 75, 95, 60, 45, 80, 90, 100, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="w-full flex flex-col-reverse h-full rounded-t-lg overflow-hidden">
                   <div className="w-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-all" style={{ height: `${h * 0.4}%` }}></div>
                   <div className="w-full bg-indigo-500 group-hover:bg-indigo-600 transition-all" style={{ height: `${h * 0.6}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Upcoming Payouts</h3>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
            {[
              { name: 'Dr. Neha G.', amount: '₹1,45,000', date: 'Oct 30', status: 'Approved' },
              { name: 'Amit Verma', amount: '₹82,400', date: 'Oct 31', status: 'Pending' },
              { name: 'Sonia Mehta', amount: '₹64,000', date: 'Nov 02', status: 'Pending' },
              { name: 'Vikram J.', amount: '₹12,000', date: 'Oct 30', status: 'Approved' },
              { name: 'Priya K.', amount: '₹55,000', date: 'Nov 05', status: 'Pending' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 group hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{p.amount}</p>
                  <p className={`text-[10px] font-bold ${p.status === 'Approved' ? 'text-green-500' : 'text-orange-500'}`}>{p.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all text-xs">
            Review All Payouts
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueReports;
