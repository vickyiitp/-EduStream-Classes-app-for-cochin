
import React from 'react';
import { Target, Users, BookOpen, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <span className="text-[#5D3FD3] font-black uppercase tracking-widest text-sm">Our Mission</span>
          <h1 className="text-5xl font-black text-slate-900 leading-tight">Empowering Students Through Quality Education.</h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            EduStream was founded with a single goal: to make high-quality board exam preparation accessible to every student in India. We combine technology with top-tier educators to create a learning environment that is effective, engaging, and affordable.
          </p>
        </div>
        <div className="flex-1">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" className="rounded-[48px] shadow-2xl" alt="Our Team" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Happy Students', value: '50,000+' },
            { label: 'Expert Teachers', value: '100+' },
            { label: 'Video Lectures', value: '5,000+' },
            { label: 'Test Results', value: '98%' },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <h3 className="text-4xl font-black text-[#5D3FD3]">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-900">Our Core Values</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">We stand by our principles to ensure the best for our learners.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Target, title: 'Student First', desc: 'Every decision we make starts with how it benefits the student.' },
            { icon: Users, title: 'Collaboration', desc: 'We believe in learning together as a community.' },
            { icon: BookOpen, title: 'Excellence', desc: 'We never settle for "good enough" in our curriculum.' },
            { icon: ShieldCheck, title: 'Integrity', desc: 'Honest and transparent education for everyone.' },
          ].map((v, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <div className="bg-indigo-50 text-[#5D3FD3] w-12 h-12 rounded-2xl flex items-center justify-center">
                <v.icon size={24} />
              </div>
              <h4 className="font-bold text-slate-900">{v.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
