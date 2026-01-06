
import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, ChevronLeft, Github, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLogin: (role: any) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [view, setView] = useState<'auth' | 'forgot'>('auth');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  if (view === 'forgot') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
        <button 
          onClick={() => setView('auth')}
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#5D3FD3] font-bold"
        >
          <ChevronLeft size={20} /> Back to Login
        </button>

        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100 space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-indigo-50 text-[#5D3FD3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Forgot Password?</h2>
              <p className="text-slate-500">No worries, it happens! Enter your email to recover access.</p>
            </div>

            {forgotStep === 1 ? (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setForgotStep(2); }}>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="email" placeholder="email@example.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50" required />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-[#5D3FD3] text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  Send Recovery Link <ArrowRight size={20} />
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-4 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                   <Mail size={40} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 text-lg">Check Your Inbox</h3>
                   <p className="text-sm text-slate-500 mt-2 leading-relaxed">We have sent a 6-digit verification code to your email. Please enter it below.</p>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-slate-50 border border-slate-200 rounded-xl"></div>)}
                </div>
                <button 
                  onClick={() => setView('auth')}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black"
                >
                  Confirm & Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#5D3FD3] font-bold"
      >
        <ChevronLeft size={20} /> Back Home
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 mb-4">
             <div className="bg-[#5D3FD3] w-10 h-10 rounded-lg text-white font-bold flex items-center justify-center text-xl">E</div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p className="text-slate-500">Continue your journey with EduStream</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100">
          {/* Role Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            <button 
              onClick={() => setRole('student')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'student' ? 'bg-white text-[#5D3FD3] shadow-md' : 'text-slate-500'}`}
            >
              Student
            </button>
            <button 
              onClick={() => setRole('teacher')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'teacher' ? 'bg-white text-[#5D3FD3] shadow-md' : 'text-slate-500'}`}
            >
              Teacher
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'admin' ? 'bg-white text-[#5D3FD3] shadow-md' : 'text-slate-500'}`}
            >
              Admin
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleAuthSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5D3FD3] transition-colors" size={18} />
                  <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" required />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5D3FD3] transition-colors" size={18} />
                <input type="email" placeholder="email@example.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" onClick={() => setView('forgot')} className="text-xs font-bold text-[#5D3FD3] hover:underline">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5D3FD3] transition-colors" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <User size={18} />
                </button>
              </div>
            </div>

            {!isLogin && role === 'student' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Current Class</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-[#5D3FD3] outline-none transition-all appearance-none cursor-pointer">
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="w-full py-4 bg-[#5D3FD3] text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:translate-y-[-2px] transition-all">
              {isLogin ? 'Login Now' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm">
                <Github size={18} /> GitHub
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#5D3FD3] font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
