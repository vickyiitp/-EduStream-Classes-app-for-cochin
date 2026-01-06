
import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle, 
  Search, 
  Filter, 
  Plus, 
  User, 
  Image as ImageIcon, 
  X,
  Send,
  MessageCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface Doubt {
  id: number;
  user: string;
  subject: string;
  title: string;
  text: string;
  upvotes: number;
  replies: number;
  isResolved: boolean;
  time: string;
  hasUpvoted?: boolean;
}

const DoubtForum: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for doubts list
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: 1,
      user: 'Rohan Mehra',
      subject: 'Physics',
      title: 'Doubt in Lens Formula derivation',
      text: 'I am getting confused with the sign convention when the object is placed between F and O. Can someone explain with a diagram?',
      upvotes: 12,
      replies: 4,
      isResolved: true,
      time: '2h ago'
    },
    {
      id: 2,
      user: 'Sneha Jain',
      subject: 'Mathematics',
      title: 'Quadratic Equation help!',
      text: 'How to find the nature of roots without calculating the actual roots? Does discriminant rule apply everywhere?',
      upvotes: 8,
      replies: 2,
      isResolved: false,
      time: '5h ago'
    },
    {
      id: 3,
      user: 'Aryan S.',
      subject: 'Chemistry',
      title: 'Valency of Carbon in CO',
      text: 'Is it 2 or 4? My textbook says something about coordinate bonding. Please clarify.',
      upvotes: 15,
      replies: 7,
      isResolved: true,
      time: '1d ago'
    },
    {
      id: 4,
      user: 'Priya Verma',
      subject: 'Biology',
      title: 'Difference between Mitosis and Meiosis',
      text: 'Can someone provide a quick summary of the main differences? Specifically the number of daughter cells.',
      upvotes: 5,
      replies: 1,
      isResolved: false,
      time: '3h ago'
    }
  ]);

  const categories = ['All', 'Physics', 'Mathematics', 'Chemistry', 'Biology'];

  // Filtered and searched doubts
  const filteredDoubts = useMemo(() => {
    return doubts.filter(d => {
      const matchesFilter = filter === 'All' || d.subject === filter;
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           d.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [doubts, filter, searchQuery]);

  const handleUpvote = (id: number) => {
    setDoubts(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          upvotes: d.hasUpvoted ? d.upvotes - 1 : d.upvotes + 1,
          hasUpvoted: !d.hasUpvoted
        };
      }
      return d;
    }));
  };

  const handlePostDoubt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDoubt: Doubt = {
      id: doubts.length + 1,
      user: 'Current User', // Mock user
      subject: formData.get('subject') as string,
      title: formData.get('title') as string,
      text: formData.get('description') as string,
      upvotes: 0,
      replies: 0,
      isResolved: false,
      time: 'Just now'
    };
    setDoubts([newDoubt, ...doubts]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            Doubt Forum <MessageSquare className="text-[#5D3FD3]" />
          </h1>
          <p className="text-slate-500 font-medium">Clear your concepts with the community and expert teachers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D3FD3] text-white px-8 py-4 rounded-[24px] font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} /> Post a Doubt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Categories & Stats */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
              <Filter size={18} className="text-[#5D3FD3]" /> Categories
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-left px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-between group ${
                    filter === cat 
                      ? 'bg-indigo-50 text-[#5D3FD3]' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat}
                  <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all ${filter === cat ? 'opacity-100 translate-x-1' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-[#5D3FD3] p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-100 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h4 className="font-black text-lg flex items-center gap-2 relative z-10">
              <Award size={20} className="text-yellow-400" /> Top Solvers
            </h4>
            <div className="space-y-5 relative z-10">
              {[
                { name: 'Dr. Neha Gupta', score: 450, role: 'Physics Expert' },
                { name: 'Amit Verma', score: 320, role: 'Math Teacher' },
                { name: 'Priya Kapoor', score: 280, role: 'Biology Faculty' }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">{s.name}</p>
                      <p className="text-[10px] opacity-70 font-medium">{s.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">{s.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/20">
              View Leaderboard
            </button>
          </div>
        </div>

        {/* Main Content - Search & Doubt List */}
        <div className="lg:col-span-3 space-y-8">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-[#5D3FD3] transition-colors" size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search for topics, keywords or specific questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-6 bg-white border border-slate-100 rounded-[32px] focus:ring-8 focus:ring-indigo-50 outline-none shadow-sm transition-all text-lg font-medium placeholder:text-slate-300"
            />
          </div>

          {/* Doubt List */}
          <div className="space-y-6">
            {filteredDoubts.length > 0 ? (
              filteredDoubts.map(doubt => (
                <div key={doubt.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#5D3FD3] transition-all duration-300">
                        <User size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="font-black text-xl text-slate-900 group-hover:text-[#5D3FD3] transition-colors">{doubt.title}</h4>
                          {doubt.isResolved && (
                            <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest border border-green-100">
                              <CheckCircle size={12} /> Resolved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-[#5D3FD3] uppercase tracking-widest">{doubt.subject}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-bold text-slate-400">{doubt.user}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {doubt.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed font-medium text-lg mb-8">
                    {doubt.text}
                  </p>

                  <div className="flex items-center gap-8 pt-6 border-t border-slate-50">
                    <button 
                      onClick={() => handleUpvote(doubt.id)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        doubt.hasUpvoted 
                          ? 'bg-[#5D3FD3] text-white shadow-lg shadow-indigo-100' 
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <ThumbsUp size={16} fill={doubt.hasUpvoted ? "currentColor" : "none"} /> {doubt.upvotes} Upvotes
                    </button>
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#5D3FD3] transition-colors uppercase tracking-widest">
                      <MessageSquare size={16} /> {doubt.replies} Replies
                    </button>
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#5D3FD3] transition-colors uppercase tracking-widest ml-auto">
                      View Discussion <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[48px] p-20 text-center border border-slate-100 shadow-sm animate-in zoom-in-95">
                <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200 mb-6">
                  <Search size={48} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">No doubts found</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-medium mt-2">Try adjusting your filters or search terms to find what you're looking for.</p>
                <button 
                  onClick={() => {setFilter('All'); setSearchQuery('');}}
                  className="mt-8 bg-indigo-50 text-[#5D3FD3] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-100 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post a Doubt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 text-[#5D3FD3] p-3 rounded-2xl">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Post a Doubt</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ask the EduStream Community</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-all">
                <X size={28} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handlePostDoubt} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Subject</label>
                  <select 
                    name="subject"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all cursor-pointer font-bold text-slate-700 appearance-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Priority</label>
                  <div className="flex gap-2">
                     <span className="flex-1 py-4 bg-indigo-50 text-[#5D3FD3] border border-indigo-100 rounded-2xl text-center text-xs font-black uppercase">Normal</span>
                     <span className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl text-center text-xs font-black uppercase cursor-not-allowed">Urgent 💎</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Doubt Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. Help with Laws of Motion Problem"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold text-slate-700" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Detailed Description</label>
                <textarea 
                  name="description"
                  rows={4} 
                  placeholder="Describe your doubt in detail. Mention the specific step where you are stuck..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none font-medium text-slate-600"
                  required
                ></textarea>
              </div>

              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                <div className="bg-white p-4 rounded-2xl text-slate-400 border border-dashed border-slate-200 cursor-pointer hover:border-indigo-300 hover:text-indigo-500 transition-all flex flex-col items-center gap-1 group">
                   <ImageIcon size={24} />
                   <span className="text-[10px] font-black uppercase">Attach Image</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Attaching a clear picture of the question or your current solution helps our experts understand the doubt better.</p>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)} 
                  className="px-8 py-4 text-slate-400 font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="bg-[#5D3FD3] text-white px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3"
                >
                  <Send size={18} /> Post My Doubt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtForum;
