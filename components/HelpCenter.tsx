
import React, { useState, useRef, useEffect } from 'react';
import { 
  LifeBuoy, 
  HelpCircle, 
  FileText, 
  Send, 
  ChevronDown, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  X, 
  User, 
  Headphones, 
  Clock, 
  History, 
  AlertCircle,
  Search,
  ArrowRight
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  date: string;
}

const HelpCenter: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'faqs' | 'history'>('faqs');

  // Mock Ticket History Data
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'TKT-9281', subject: 'Class 10 Physics Video Not Loading', category: 'Technical', status: 'Resolved', priority: 'High', date: '22 Oct 2024' },
    { id: 'TKT-9304', subject: 'Refund Query for Batch upgrade', category: 'Billing', status: 'In Progress', priority: 'Normal', date: '24 Oct 2024' },
    { id: 'TKT-9311', subject: 'Unable to download Math DPP PDF', category: 'Content', status: 'Open', priority: 'Normal', date: 'Just now' },
  ]);

  const [chatHistory, setChatHistory] = useState([
    { role: 'agent', text: 'Hello Aryan! I am Sarah from EduStream Support. How can I assist you with your Class 10 preparation today?', time: '10:00 AM' }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { q: "How to access live classes?", a: "Go to your Dashboard and look for the 'Live Now' section. If a class is active, you'll see a Join button with a blinking indicator." },
    { q: "What to do if my payment fails?", a: "If your payment is debited but the course is not unlocked, please wait 24 hours for bank reconciliation. If it persists, raise a 'Billing' ticket in the history tab." },
    { q: "How can I download PDF notes?", a: "Within the Classroom page, navigate to the specific chapter and click on the 'PDF Notes' tab located below the video player." },
    { q: "Is there a mobile app?", a: "Yes, EduStream is available on both Play Store and App Store. You can sync your progress across devices seamlessly." },
    { q: "Can I change my batch?", a: "Batch changes are allowed within the first 7 days of enrollment. Please contact support via live chat for processing." }
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isLiveChatOpen]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg = { role: 'user', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory([...chatHistory, newMsg]);
    setChatMessage('');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'agent', text: 'I am looking into this for you. Just a moment...', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTicket: Ticket = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: formData.get('subject') as string,
      category: formData.get('category') as string,
      status: 'Open',
      priority: 'Normal',
      date: 'Just now'
    };
    setTickets([newTicket, ...tickets]);
    setActiveTab('history');
    alert("Support Ticket Raised Successfully!");
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'In Progress': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#5D3FD3] to-purple-700 p-12 md:p-20 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-md mb-4">
            <LifeBuoy size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">Help & Support <br />Center</h1>
          <p className="text-indigo-100 text-lg font-medium opacity-90">
            We're here to ensure your learning experience is seamless. Browse FAQs or get in touch with our expert support team.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setIsLiveChatOpen(true)}
              className="bg-white text-[#5D3FD3] px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <MessageSquare size={20} /> Live Chat Now
            </button>
            <button className="bg-white/10 border border-white/20 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
              <Phone size={20} /> Call Us: 1800-EDU-ST
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Navigation & Stats */}
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('faqs')}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'faqs' ? 'bg-indigo-50 text-[#5D3FD3] shadow-inner' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <HelpCircle size={20} /> Knowledge Base
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-indigo-50 text-[#5D3FD3] shadow-inner' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <History size={20} /> Ticket History
            </button>
          </div>

          {/* Quick Contact Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Instant Support</h3>
            {[
              { label: 'Live Assistance', text: 'Sarah is online to help', icon: Headphones, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Documentation', text: '500+ Help Articles', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group cursor-pointer hover:shadow-lg transition-all">
                <div className={`${item.bg} ${item.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.label}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.text}</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-slate-200 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Workspace */}
        <div className="lg:col-span-2 space-y-12">
          
          {activeTab === 'faqs' ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h3>
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input type="text" placeholder="Search FAQs..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-50 rounded-[28px] overflow-hidden transition-all shadow-sm hover:shadow-md">
                      <button 
                        onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                        className={`w-full flex items-center justify-between p-6 transition-colors text-left ${activeFAQ === i ? 'bg-[#5D3FD3] text-white' : 'bg-white text-slate-800'}`}
                      >
                        <span className="font-bold text-sm md:text-base">{faq.q}</span>
                        <ChevronDown size={20} className={`transition-transform duration-300 ${activeFAQ === i ? 'rotate-180 opacity-100' : 'opacity-40'}`} />
                      </button>
                      {activeFAQ === i && (
                        <div className="p-6 bg-slate-50 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Raise Ticket Form */}
              <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-50 text-[#5D3FD3] p-3 rounded-2xl">
                    <AlertCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Raise a Support Ticket</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Typical response time: 2-4 Hours</p>
                  </div>
                </div>
                <form className="space-y-8" onSubmit={handleTicketSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Issue Category</label>
                      <select name="category" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-700 cursor-pointer">
                        <option>Technical Issue</option>
                        <option>Billing & Payment</option>
                        <option>Course Content</option>
                        <option>App Performance</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Subject</label>
                      <input name="subject" required type="text" placeholder="Short summary of issue" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Detailed Description</label>
                    <textarea required rows={4} placeholder="Describe your problem in detail..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all resize-none font-medium text-slate-600"></textarea>
                  </div>
                  <button className="bg-[#5D3FD3] text-white px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-indigo-100 hover:translate-y-[-2px] active:scale-95 transition-all flex items-center gap-3">
                    Submit Support Ticket <CheckCircle2 size={24} />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Ticket History Table */
            <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-500">
              <div className="p-10 bg-slate-50/50 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600">
                    <History size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Your Support History</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tickets.length} Active Tickets</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket ID</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                        <td className="px-10 py-8">
                          <span className="text-sm font-black text-indigo-600">{t.id}</span>
                        </td>
                        <td className="px-10 py-8">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{t.subject}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{t.category}</p>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(t.status)}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                            <Clock size={14} /> {t.date}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button className="text-xs font-black text-[#5D3FD3] hover:underline uppercase tracking-widest flex items-center justify-end gap-1 ml-auto">
                            View <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tickets.length === 0 && (
                <div className="p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <History size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">No support history yet</h4>
                  <p className="text-slate-500 text-sm">Once you raise a ticket, it will appear here for tracking.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Live Support Drawer Overlay */}
      {isLiveChatOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsLiveChatOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="bg-[#5D3FD3] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                   <Headphones size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Live Support</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Sarah is Online</p>
                </div>
              </div>
              <button onClick={() => setIsLiveChatOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
               {chatHistory.map((msg, i) => (
                 <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.time}</span>
                      {msg.role === 'agent' && <span className="text-[10px] font-black text-[#5D3FD3] uppercase">Support</span>}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${
                      msg.role === 'user' ? 'bg-[#5D3FD3] text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               ))}
               <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative group">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..." 
                  className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5D3FD3] text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
