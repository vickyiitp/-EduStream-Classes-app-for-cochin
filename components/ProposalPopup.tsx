
import React, { useState, useEffect } from 'react';
import { X, Rocket, Zap, MessageCircle, Sparkles, ArrowRight, CheckCircle2, Monitor } from 'lucide-react';

const ProposalPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenProposal');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll Lock logic
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const closeOverlay = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenProposal', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop with intense blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-700" 
        onClick={closeOverlay}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-[0_35px_60px_-15px_rgba(93,63,211,0.3)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-20 duration-500 ease-out">
        {/* Dynamic Header Gradient */}
        <div className="h-2 bg-gradient-to-r from-[#5D3FD3] via-purple-500 to-indigo-600"></div>
        
        {/* Close Button */}
        <button 
          onClick={closeOverlay}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all z-20"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-14 space-y-8">
          {/* Main Visuals */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#5D3FD3] to-indigo-700 text-white rounded-[32px] flex items-center justify-center relative shadow-xl shadow-indigo-200">
                <Rocket size={44} className="animate-bounce" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Welcome to Your Future <br />
                <span className="text-[#5D3FD3]">Digital Coaching!</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-lg mx-auto">
                This is a live demo designed specifically for coaching institutes. Explore how your students will watch lectures, take tests, and track progress effortlessly.
              </p>
            </div>
          </div>

          {/* Value Props Grid */}
          <div className="bg-slate-50 rounded-[32px] p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600 border border-indigo-50">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Custom Branding</p>
                <p className="text-xs text-slate-500 mt-0.5">Your logo, your colors, your identity.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600 border border-indigo-50">
                <Monitor size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Student First UX</p>
                <p className="text-xs text-slate-500 mt-0.5">Mobile-first, high-speed learning engine.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button 
                onClick={closeOverlay}
                className="w-full sm:flex-1 bg-[#5D3FD3] text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-indigo-300 hover:translate-y-[-4px] hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Let's Explore <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:hello@edustream.com?subject=Custom Demo Inquiry'}
                className="w-full sm:w-auto px-8 py-5 text-slate-600 font-bold hover:text-[#5D3FD3] transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> 
                Contact for Customization
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 font-medium italic">
              "I can customize every feature, color, and logo to match your coaching brand."
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 opacity-40">
            <div className="h-px w-8 bg-slate-300"></div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
              Premium EdTech Solutions
            </p>
            <div className="h-px w-8 bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalPopup;
