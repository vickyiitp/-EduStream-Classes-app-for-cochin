
import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for courses, lessons..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Aryan Sharma</p>
            <p className="text-xs text-slate-500">Class 10-A</p>
          </div>
          <button className="flex items-center gap-1 group">
            <img 
              src="https://picsum.photos/seed/student/40/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-indigo-100 group-hover:border-indigo-500 transition-all"
            />
            <ChevronDown size={16} className="text-slate-400 group-hover:text-indigo-500 transition-all" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
