
import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, GraduationCap, Lock, Bell, Moon, Globe, Trash2 } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'notifications'>('info');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[40px]"></div>
        <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <img 
              src="https://picsum.photos/seed/student/120/120" 
              className="w-32 h-32 rounded-[32px] border-8 border-white shadow-2xl" 
              alt="Avatar" 
            />
            <button className="absolute bottom-2 right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-indigo-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
              <Camera size={18} />
            </button>
          </div>
          <div className="pb-4 space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900">Aryan Sharma</h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
              <span className="flex items-center gap-1"><Mail size={14} /> aryan.sharma@example.com</span>
              <span className="flex items-center gap-1"><GraduationCap size={14} /> Class 10th-A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 flex flex-col lg:flex-row gap-8">
        {/* Navigation */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          {[
            { id: 'info', label: 'Personal Info', icon: GraduationCap },
            { id: 'security', label: 'Password & Security', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#5D3FD3] text-white shadow-xl shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-white hover:text-slate-800'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-200 mt-4">
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all">
              <Trash2 size={20} /> Delete Account
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm min-h-[500px]">
          {activeTab === 'info' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Public Profile</h3>
                <button className="text-sm font-bold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-lg">Save Changes</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">First Name</label>
                  <input type="text" defaultValue="Aryan" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Last Name</label>
                  <input type="text" defaultValue="Sharma" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="tel" defaultValue="+91 98765-43210" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" defaultValue="New Delhi, India" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
              <form className="max-w-md space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" />
                </div>
                <button className="bg-[#5D3FD3] text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-xl font-bold text-slate-900">Notification Settings</h3>
              <div className="space-y-6">
                {[
                  { title: 'In-app Notifications', desc: 'Alerts about live classes and assignments.' },
                  { title: 'Email Alerts', desc: 'Weekly summary and performance reports.' },
                  { title: 'SMS Messages', desc: 'Critical alerts about test dates.' }
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900">{n.title}</h4>
                      <p className="text-xs text-slate-500">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#5D3FD3]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
