
import React, { useState, useEffect } from 'react';
import { Bird, X, Sparkles, Smartphone, BarChart2, Palette, Rocket, Zap } from 'lucide-react';

const MESSAGES = [
  { 
    id: 1, 
    text: "Psst! Did you see the Netflix-style auto-scroller? Your students will love it! 🐦", 
    icon: Sparkles, 
    color: "bg-indigo-600" 
  },
  { 
    id: 2, 
    text: "Hey there! I can add your own coaching logo right here. Pretty cool, right? ✨", 
    icon: Palette, 
    color: "bg-purple-600" 
  },
  { 
    id: 3, 
    text: "This LMS works perfectly on phones too. Students can study anywhere! 📱", 
    icon: Smartphone, 
    color: "bg-blue-600" 
  },
  { 
    id: 4, 
    text: "Hey! This is just a demo. Your real website will be 10x more awesome! 🚀", 
    icon: Rocket, 
    color: "bg-red-600" 
  },
  { 
    id: 5, 
    text: "Quick tip: You can track every student's score in the Admin panel. Want to see? 📊", 
    icon: BarChart2, 
    color: "bg-orange-600" 
  },
  { 
    id: 6, 
    text: "I can change these purple colors to your coaching's brand colors in minutes! 🎨", 
    icon: Palette, 
    color: "bg-emerald-600" 
  }
];

const FloatingBirds: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial bird appears after 15 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setIsVisible(false), 5000);
    }, 15000);

    // Subsequent birds every 15 seconds
    const intervalTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
      setIsVisible(true);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);

    }, 20000); // 15s wait + 5s display = 20s total cycle for a 15s gap between birds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  if (!isVisible) return null;

  const current = MESSAGES[currentIndex];
  const Icon = current.icon;

  return (
    <div className="fixed bottom-24 right-6 z-[9998] w-72 animate-in slide-in-from-right-full duration-700 ease-out">
      <div className="relative bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 group">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-white text-slate-400 p-1.5 rounded-full shadow-lg border border-slate-100 hover:text-slate-900 transition-colors z-10"
          aria-label="Dismiss tip"
        >
          <X size={14} />
        </button>

        <div className="flex items-start gap-4">
          <div className={`${current.color} text-white p-3 rounded-2xl shadow-lg shadow-indigo-100 shrink-0 animate-bounce`}>
            <Bird size={20} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-800 leading-relaxed">
              {current.text}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Icon size={12} className="text-indigo-500" />
              EduStream Demo Guide
            </div>
          </div>
        </div>
        
        {/* Progress timer bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/10 rounded-full overflow-hidden w-full">
          <div className="h-full bg-indigo-500/30 animate-[shrink_5s_linear_forwards]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default FloatingBirds;
