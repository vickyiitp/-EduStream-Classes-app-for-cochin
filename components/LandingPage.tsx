
import React from 'react';
import { 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  Play, 
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { ViewType } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
  onNavClick: (view: ViewType) => void;
}

const Header: React.FC<{ onLoginClick: () => void; onNavClick: (view: ViewType) => void }> = ({ onLoginClick, onNavClick }) => (
  <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavClick('landing')}>
        <div className="bg-[#5D3FD3] p-1.5 rounded-lg text-white font-bold">E</div>
        <span className="text-2xl font-bold tracking-tight text-[#5D3FD3]">EduStream</span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <button onClick={() => onNavClick('landing')} className="text-sm font-semibold hover:text-[#5D3FD3]">Home</button>
        <button onClick={() => onNavClick('batches')} className="text-sm font-semibold hover:text-[#5D3FD3]">Batches</button>
        <button onClick={() => onNavClick('about')} className="text-sm font-semibold hover:text-[#5D3FD3]">About Us</button>
        <button onClick={() => onNavClick('contact')} className="text-sm font-semibold hover:text-[#5D3FD3]">Contact</button>
      </nav>
      <div className="flex items-center gap-4">
        <button onClick={onLoginClick} className="text-sm font-bold text-slate-600 hover:text-[#5D3FD3]">Login</button>
        <button onClick={onLoginClick} className="bg-[#5D3FD3] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Sign Up</button>
      </div>
    </div>
  </header>
);

const Footer: React.FC<{ onNavClick: (view: ViewType) => void }> = ({ onNavClick }) => (
  <footer className="py-12 border-t border-slate-100 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#5D3FD3] p-1.5 rounded-lg text-white font-bold">E</div>
            <span className="text-xl font-bold tracking-tight text-[#5D3FD3]">EduStream</span>
          </div>
          <p className="text-sm text-slate-500 max-w-xs">Empowering the next generation with world-class education tools and expert-led guidance.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
          <button onClick={() => onNavClick('privacy')} className="hover:text-[#5D3FD3]">Privacy Policy</button>
          <button onClick={() => onNavClick('terms')} className="hover:text-[#5D3FD3]">Terms of Service</button>
          <button onClick={() => onNavClick('help-center')} className="hover:text-[#5D3FD3]">Help Center</button>
          <button onClick={() => onNavClick('about')} className="hover:text-[#5D3FD3]">About Us</button>
          <button onClick={() => onNavClick('contact')} className="hover:text-[#5D3FD3]">Contact</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-50 pt-8 gap-6">
        <p className="text-sm text-slate-400">© 2024 EduStream. All rights reserved.</p>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Follow Us</span>
          <div className="flex gap-3">
            {[
              { icon: Facebook, color: 'hover:bg-blue-600', text: 'text-blue-600' },
              { icon: Twitter, color: 'hover:bg-sky-500', text: 'text-sky-500' },
              { icon: Instagram, color: 'hover:bg-pink-600', text: 'text-pink-600' },
              { icon: Linkedin, color: 'hover:bg-blue-700', text: 'text-blue-700' },
              { icon: Youtube, color: 'hover:bg-red-600', text: 'text-red-600' }
            ].map((social, idx) => (
              <a 
                key={idx}
                href="#" 
                className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${social.text} ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm border border-slate-100`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage: React.FC<LandingPageProps> & { Header: typeof Header; Footer: typeof Footer } = ({ onGetStarted, onLoginClick, onNavClick }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Header onLoginClick={onLoginClick} onNavClick={onNavClick} />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -mr-40 -mt-20 opacity-60"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-[#5D3FD3] rounded-full text-xs font-bold uppercase tracking-wider">Education for the Future</span>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Unlock Your Potential: <span className="text-[#5D3FD3]">Master Class 9 & 10</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0">
              Interactive live classes, personalized study plans, and expert guidance designed specifically for secondary school students in India.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button onClick={() => onNavClick('batches')} className="w-full sm:w-auto bg-[#5D3FD3] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-200 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
                Explore Batches <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-bold text-slate-600 hover:text-[#5D3FD3]">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center">
                  <Play size={18} fill="currentColor" />
                </div>
                Watch Intro Video
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" alt="Student Learning" className="w-full h-full object-cover" />
            </div>
            {/* Float Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 animate-bounce">
              <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Trophy size={20} /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Average Score</p>
                <p className="text-sm font-bold">92% Results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Why Students Love EduStream?</h2>
            <p className="text-slate-500">Everything you need to excel in your board exams, simplified.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Play, title: 'Live Classes', color: 'bg-blue-100 text-blue-600', desc: 'Interact in real-time with top educators across India.' },
              { icon: Users, title: 'Expert Teachers', color: 'bg-purple-100 text-purple-600', desc: 'Learning from the best minds with years of board experience.' },
              { icon: BookOpen, title: 'Study Material', color: 'bg-orange-100 text-orange-600', desc: 'Comprehensive PDF notes, mind maps, and NCERT solutions.' },
              { icon: CheckCircle2, title: 'Quizzes', color: 'bg-green-100 text-green-600', desc: 'Topic-wise interactive assessments to track your progress.' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold leading-tight">Trusted by <span className="text-[#5D3FD3]">50,000+</span> Students Nationwide</h2>
              <p className="text-slate-500">Hear from our students who achieved their dreams with us.</p>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                ))}
                <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-50">+50k</div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Rahul Gupta', score: '98%', text: 'The live classes are incredible. I could ask doubts directly and teachers explained everything with animations.' },
                { name: 'Sneha Verma', score: '96%', text: 'Study materials provided here are more than enough. No need for extra side-books if you follow EduStream.' }
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex text-orange-400 gap-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                  <p className="italic text-slate-700">"{t.text}"</p>
                  <div className="pt-4 flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/s${i}/48/48`} className="w-12 h-12 rounded-full" alt={t.name} />
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-[#5D3FD3] font-bold uppercase">{t.score} in Boards</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#5D3FD3] rounded-[40px] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -ml-32 -mt-32"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold max-w-3xl mx-auto">Ready to Start Your Learning Journey?</h2>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto">Join the most comprehensive learning platform for Class 9-10 today.</p>
            <button onClick={onGetStarted} className="bg-white text-[#5D3FD3] px-12 py-5 rounded-full font-extrabold text-xl shadow-2xl hover:scale-105 transition-transform">
              Sign Up Now - It's Free
            </button>
          </div>
        </div>
      </section>

      <Footer onNavClick={onNavClick} />
    </div>
  );
};

LandingPage.Header = Header;
LandingPage.Footer = Footer;

export default LandingPage;
