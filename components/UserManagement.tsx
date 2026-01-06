
import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, MoreVertical, 
  ShieldCheck, ShieldAlert, CheckCircle, XCircle, 
  Mail, Calendar, Edit, Trash2, X, Save
} from 'lucide-react';
import { UserRole } from '../types';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Blocked' | 'Pending';
  batch: string;
  joined: string;
}

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'teacher' | 'student' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: 'Vikram Singh', email: 'vikram.s@gmail.com', role: 'student', status: 'Active', batch: 'Lakshya 2026', joined: '12 Oct 2024' },
    { id: 2, name: 'Dr. Anjali Verma', email: 'anjali.phy@edu.com', role: 'teacher', status: 'Active', batch: 'Physics Dept', joined: '05 Oct 2024' },
    { id: 3, name: 'Rahul Khanna', email: 'rahul.k@gmail.com', role: 'student', status: 'Blocked', batch: 'Abhyas Board', joined: '28 Sep 2024' },
    { id: 4, name: 'Sonia Mehta', email: 'sonia.m@gmail.com', role: 'teacher', status: 'Pending', batch: 'Math Dept', joined: '15 Oct 2024' },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as UserRole,
      status: formData.get('status') as any,
      batch: formData.get('batch') as string,
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...data } : u));
    } else {
      const newUser: UserData = {
        id: Date.now(),
        ...data,
        joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setUsers([newUser, ...users]);
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesTab = activeTab === 'all' || u.role === activeTab || (activeTab === 'pending' && u.status === 'Pending');
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management Center 👤</h1>
          <p className="text-slate-500">Monitor and manage access across all user roles.</p>
        </div>
        <button 
          onClick={() => { setEditingUser(null); setShowModal(true); }}
          className="bg-[#5D3FD3] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
        >
          <UserPlus size={20} /> Add New User
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
          {[
            { id: 'all', label: 'All Users' },
            { id: 'teacher', label: 'Teachers' },
            { id: 'student', label: 'Students' },
            { id: 'pending', label: 'Pending' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id ? 'bg-white text-[#5D3FD3] shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-indigo-50 outline-none"
            />
          </div>
          <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role/Batch</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5D3FD3] font-black uppercase">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1"><Mail size={10} /> {user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        user.role === 'teacher' ? 'text-purple-600 bg-purple-50' : 'text-blue-600 bg-blue-50'
                      }`}>
                        {user.role}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{user.batch}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {user.status === 'Active' ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : user.status === 'Blocked' ? (
                        <XCircle size={16} className="text-red-400" />
                      ) : (
                        <ShieldAlert size={16} className="text-orange-400" />
                      )}
                      <span className={`text-xs font-bold ${
                        user.status === 'Active' ? 'text-green-600' : 
                        user.status === 'Blocked' ? 'text-red-500' : 'text-orange-500'
                      }`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Calendar size={14} /> {user.joined}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingUser(user); setShowModal(true); }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <form onSubmit={handleSaveUser} className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-xl">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input name="name" defaultValue={editingUser?.name} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input name="email" type="email" defaultValue={editingUser?.email} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</label>
                  <select name="role" defaultValue={editingUser?.role || 'student'} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                  <select name="status" defaultValue={editingUser?.status || 'Active'} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50">
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch/Dept</label>
                <input name="batch" defaultValue={editingUser?.batch} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50" />
              </div>
            </div>
            <div className="p-8 border-t border-slate-100 flex justify-end gap-3 bg-white">
              <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 font-bold text-slate-400">Cancel</button>
              <button type="submit" className="bg-[#5D3FD3] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100">
                <Save size={18} /> {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
