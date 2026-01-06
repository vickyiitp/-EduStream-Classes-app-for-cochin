
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  BarChart3, 
  Upload, 
  Users, 
  ShieldCheck, 
  CreditCard,
  MessageSquare,
  Trophy,
  PieChart,
  LifeBuoy
} from 'lucide-react';
import { ViewType, UserRole } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar, onLogout, userRole }) => {
  const getNavItems = () => {
    if (userRole === 'admin') {
      return [
        { id: 'admin-dashboard', label: 'Admin Panel', icon: ShieldCheck },
        { id: 'user-management', label: 'Users', icon: Users },
        { id: 'revenue', label: 'Revenue', icon: CreditCard },
        { id: 'batches', label: 'Manage Batches', icon: BookOpen },
        { id: 'help-center', label: 'Support Tickets', icon: LifeBuoy },
        { id: 'profile', label: 'Settings', icon: User },
      ];
    }
    if (userRole === 'teacher') {
      return [
        { id: 'teacher-dashboard', label: 'Teacher Hub', icon: LayoutDashboard },
        { id: 'content-upload', label: 'Upload Content', icon: Upload },
        { id: 'batches', label: 'My Batches', icon: BookOpen },
        { id: 'doubt-forum', label: 'Doubts Forum', icon: MessageSquare },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'profile', label: 'Profile', icon: User },
      ];
    }
    return [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'batches', label: 'My Batches', icon: BookOpen },
      { id: 'doubt-forum', label: 'Doubt Forum', icon: MessageSquare },
      { id: 'tests', label: 'Tests & Quizzes', icon: GraduationCap },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
      { id: 'analytics', label: 'My Progress', icon: PieChart },
      { id: 'help-center', label: 'Help & Support', icon: LifeBuoy },
      { id: 'profile', label: 'Settings', icon: User },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className={`bg-[#5D3FD3] text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between">
        <div className={`flex items-center gap-2 overflow-hidden ${!isOpen && 'hidden'}`}>
          <div className="bg-white p-1 rounded-lg">
            <div className="w-6 h-6 bg-[#5D3FD3] rounded-sm flex items-center justify-center font-bold text-white">E</div>
          </div>
          <span className="text-xl font-bold whitespace-nowrap">EduStream</span>
        </div>
        <button onClick={toggleSidebar} className="p-1 hover:bg-indigo-500 rounded-md">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-white text-indigo-700 shadow-lg' 
                : 'hover:bg-indigo-500 text-indigo-100'
            }`}
          >
            <item.icon size={20} className={currentView === item.id ? 'text-indigo-600' : ''} />
            {isOpen && <span className="font-medium whitespace-nowrap text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-indigo-400/30">
        <div className={`mb-4 px-4 flex flex-col gap-1 ${!isOpen && 'hidden'}`}>
           <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Logged in as</span>
           <span className="text-sm font-bold capitalize">{userRole}</span>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500 transition-colors text-indigo-100 hover:text-white"
        >
          <LogOut size={20} />
          {isOpen && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
