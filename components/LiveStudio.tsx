
import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, Mic, MicOff, VideoOff, Settings, Users, 
  MessageCircle, Send, Radio, StopCircle, Share2, 
  Monitor, Shield, Activity, Clock, Copy, Check,
  Trash2, Ban, BarChart2, MoreVertical, Wifi
} from 'lucide-react';

const LiveStudio: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('chat');
  const [bitrate, setBitrate] = useState(4500);
  const [copied, setCopied] = useState<string | null>(null);
  
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sanya Gupta', text: 'Sir, can you repeat the Lens Formula?', time: '12:05', role: 'student' },
    { id: 2, user: 'Rahul Aryan', text: 'Screen is clear now, thanks!', time: '12:06', role: 'student' },
    { id: 3, user: 'SpamBot99', text: 'CLICK HERE FOR FREE GIFTS!!!', time: '12:07', role: 'student' },
  ]);

  // Mock Bitrate fluctuation
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setBitrate(prev => prev + Math.floor(Math.random() * 200 - 100));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500">
      
      {/* Top Stats Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-800 rounded-2xl border border-slate-700">
            <Users size={18} className="text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Live Students</span>
              <span className="text-sm font-black">2,482</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-800 rounded-2xl border border-slate-700">
            <Activity size={18} className="text-green-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Bitrate</span>
              <span className="text-sm font-black">{bitrate} kbps</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-800 rounded-2xl border border-slate-700">
            <Clock size={18} className="text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Duration</span>
              <span className="text-sm font-black">01:24:05</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-slate-800 rounded-xl">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             Healthy Connection
          </div>
          {isLive && (
            <div className="flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest animate-pulse shadow-lg shadow-red-600/20">
              <Radio size={14} /> Recording Live
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Main Content Side */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          
          {/* Large Video Preview */}
          <div className="relative aspect-video bg-black rounded-[40px] overflow-hidden border-4 border-slate-800 shadow-2xl group">
             <img 
               src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
               className="w-full h-full object-cover opacity-90"
               alt="Teacher Main Preview"
             />
             
             {/* Local Mute/Camera Overlays */}
             {isVideoOff && (
               <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-4 z-20">
                 <VideoOff size={64} className="text-slate-600" />
                 <p className="text-slate-400 font-bold">Camera Preview Paused</p>
               </div>
             )}

             {/* Dynamic On-screen Controls */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl p-3 rounded-[32px] border border-white/10 shadow-2xl z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-2xl ${isMuted ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'} transition-all`}>
                   {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-2xl ${isVideoOff ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'} transition-all`}>
                   {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                </button>
                <div className="w-px h-8 bg-white/10 mx-2"></div>
                <button 
                  onClick={() => setIsLive(!isLive)}
                  className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all ${isLive ? 'bg-white text-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
                >
                  {isLive ? <><StopCircle size={24} /> End Stream</> : <><Radio size={24} /> Start Stream</>}
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stream Config Card */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
               <div className="flex items-center justify-between">
                 <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                   <Wifi size={20} className="text-indigo-500" /> Stream Setup
                 </h3>
                 <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-all">Regenerate Key</button>
               </div>
               
               <div className="space-y-4">
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RTMP Server URL</label>
                   <div className="relative group">
                     <input 
                       readOnly 
                       value="rtmp://live.edustream.com/app" 
                       className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-xs font-mono text-slate-600 outline-none"
                     />
                     <button 
                       onClick={() => copyToClipboard('rtmp://live.edustream.com/app', 'url')}
                       className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600"
                     >
                       {copied === 'url' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                     </button>
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stream Key</label>
                   <div className="relative group">
                     <input 
                       readOnly 
                       type="password"
                       value="es_live_839210_9281_private" 
                       className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-xs font-mono text-slate-600 outline-none"
                     />
                     <button 
                       onClick={() => copyToClipboard('es_live_839210_9281_private', 'key')}
                       className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600"
                     >
                       {copied === 'key' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                     </button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Quick Actions & Live Tools */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Live Classroom Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 border border-indigo-100 rounded-[32px] text-[#5D3FD3] hover:bg-indigo-100 transition-all gap-2 group">
                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                       <BarChart2 size={24} />
                    </div>
                    <span className="text-xs font-bold">Launch Poll</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-[32px] text-slate-600 hover:bg-slate-100 transition-all gap-2 group">
                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                       <Monitor size={24} />
                    </div>
                    <span className="text-xs font-bold">Share Screen</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-[32px] text-slate-600 hover:bg-slate-100 transition-all gap-2 group">
                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                       <Share2 size={24} />
                    </div>
                    <span className="text-xs font-bold">Invite Guest</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-[32px] text-slate-600 hover:bg-slate-100 transition-all gap-2 group">
                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                       <Settings size={24} />
                    </div>
                    <span className="text-xs font-bold">Cam Config</span>
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Moderator Sidebar */}
        <div className="w-full lg:w-96 flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-red-600 p-2 rounded-xl">
                  <Shield size={20} />
                </div>
                <h3 className="font-black text-slate-900">Moderator View</h3>
              </div>
              <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <Settings size={20} />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((m) => (
                <div key={m.id} className="group relative">
                  <div className="flex justify-between items-start mb-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.time}</span>
                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => deleteMessage(m.id)}
                          className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100" 
                          title="Delete Message"
                        >
                          <Trash2 size={12} />
                        </button>
                        <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200" title="Ban User">
                          <Ban size={12} />
                        </button>
                        <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">
                          <MoreVertical size={12} />
                        </button>
                     </div>
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.text.includes('FREE') ? 'bg-red-50 border border-red-100 text-red-700' : 'bg-slate-50 text-slate-700'}`}>
                    <span className="font-black mr-2 text-slate-900">{m.user}:</span>
                    {m.text}
                  </div>
                </div>
              ))}
           </div>

           <div className="p-6 bg-slate-50/80 border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Announce to class..." 
                  className="w-full pl-5 pr-12 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5D3FD3] text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition-all">
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-4">
                You are interacting as Moderator
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStudio;
