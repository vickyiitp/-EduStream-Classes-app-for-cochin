
import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Users, Play, Download, 
  Star, Shield, ArrowRight, Share2, BookOpen, 
  Sparkles, MessageCircle, ChevronDown, ChevronRight,
  ShieldCheck, Smartphone, Target, HelpCircle, FileText, Radio
} from 'lucide-react';
import { generateSmartSummary } from '../lib/gemini';

interface BatchDetailsProps {
  onPurchase: () => void;
  onBack: () => void;
}

const BatchDetails: React.FC<BatchDetailsProps> = ({ onPurchase, onBack }) => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>('c1');

  const batchData = {
    title: "Class 10 Board Accelerator: Foundation Batch",
    desc: "The most comprehensive foundation course for students aiming for IIT-JEE/NEET with a strong focus on Class 10 Board Excellence. Join 12,000+ high achievers.",
    mrp: 8999,
    price: 4499,
    rating: 4.9,
    reviews: 2450
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateSmartSummary(batchData.title, batchData.desc);
      setAiSummary(summary || '');
    } catch (e) {
      console.error(e);
      alert("AI summary failed. Please check connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const faqs = [
    { q: "Can I watch recordings if I miss a live class?", a: "Yes, all live classes are recorded and uploaded within 2 hours of the session completion." },
    { q: "Is this course valid for ICSE students?", a: "While the core focus is NCERT (CBSE), the concepts cover 95% of the ICSE syllabus as well." },
    { q: "How do I ask doubts?", a: "You can use our 24/7 Doubt Forum or ask directly in the chat during live classes." }
  ];

  const syllabus = [
    { id: 'c1', title: 'Physics: Electricity & Magnetism', topics: ['Ohm\'s Law', 'Resistance', 'Magnetic Fields', 'Electromagnets'] },
    { id: 'c2', title: 'Mathematics: Quadratic Equations', topics: ['Roots', 'Discriminant', 'Word Problems', 'Nature of Roots'] },
    { id: 'c3', title: 'Chemistry: Carbon and its Compounds', topics: ['Bonding', 'IUPAC Nomenclature', 'Ethanol', 'Soaps'] }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#5D3FD3] transition-colors">
        <ArrowRight className="rotate-180" size={20} /> Back to Catalog
      </button>

      {/* Hero Section */}
      <div className="relative rounded-[48px] overflow-hidden bg-slate-900 text-white p-8 md:p-16 flex flex-col lg:flex-row gap-12 border-4 border-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5D3FD3] rounded-full blur-[150px] opacity-20 -mr-64 -mt-64"></div>
        
        <div className="flex-1 space-y-8 relative z-10">
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#5D3FD3] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl border border-white/20">
              <Star size={12} fill="currentColor" /> Class 10 Special
            </span>
            <button 
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="bg-indigo-500/20 hover:bg-indigo-500/40 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2 transition-colors"
            >
              <Sparkles size={12} /> {isGenerating ? 'AI Summarizing...' : 'AI Smart Summary'}
            </button>
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            {batchData.title}
          </h1>

          {aiSummary && (
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3 animate-in zoom-in-95">
              <h4 className="text-xs font-black text-indigo-300 uppercase tracking-[0.2em]">Expected Learning Outcomes</h4>
              <div className="text-sm text-indigo-50 leading-relaxed whitespace-pre-line">
                {aiSummary}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="font-bold">{batchData.rating}/5.0 <span className="text-indigo-200 opacity-60 font-medium">({batchData.reviews} Reviews)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-indigo-300" size={20} />
              <span className="font-bold">12k+ Enrolled</span>
            </div>
          </div>

          <p className="text-lg text-indigo-100 opacity-80 max-w-xl leading-relaxed">
            {batchData.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <div className="bg-white p-6 rounded-[32px] text-slate-900 shadow-xl flex flex-col min-w-[200px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-through">MRP: ₹{batchData.mrp}</p>
              <h2 className="text-4xl font-black text-[#5D3FD3]">₹{batchData.price}</h2>
              <p className="text-[10px] font-black text-green-500 uppercase mt-1">50% Discount Applied</p>
            </div>
            <button 
              onClick={onPurchase}
              className="w-full sm:w-auto bg-[#5D3FD3] text-white px-12 py-6 rounded-[32px] font-black text-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Buy Now <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0 relative z-10">
          <div className="bg-white p-6 rounded-[48px] shadow-2xl text-slate-900 border border-slate-100 h-full flex flex-col justify-between space-y-6">
            <div className="aspect-video bg-slate-100 rounded-[32px] relative overflow-hidden group cursor-pointer border-2 border-slate-50 shadow-inner">
              <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-700" alt="Preview" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#5D3FD3] text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase whitespace-nowrap">Watch Course Trailer</div>
            </div>
            
            <div className="space-y-4 px-2">
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Included in this Batch:</h4>
              {[
                { icon: Play, text: '350+ Live & Recorded Lectures', color: 'text-blue-500' },
                { icon: BookOpen, text: 'Expert Curated PDF Notes', color: 'text-purple-500' },
                { icon: ShieldCheck, text: 'Weekly AIR Test Series', color: 'text-green-500' },
                { icon: MessageCircle, text: '24/7 Priority Doubt Forum', color: 'text-orange-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                  <item.icon size={18} className={item.color} /> {item.text}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-50 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enrollment ends in 2 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Live Classes", desc: "Interact with teachers daily in real-time.", icon: Radio, bg: "bg-red-50", text: "text-red-600" },
          { title: "Doubt Support", desc: "Get answers within 15 mins on forum.", icon: HelpCircle, bg: "bg-indigo-50", text: "text-indigo-600" },
          { title: "Weekly Tests", desc: "Simulate real boards with our test center.", icon: Target, bg: "bg-green-50", text: "text-green-600" },
          { title: "Smart Notes", desc: "Color-coded mindmaps for fast revision.", icon: FileText, bg: "bg-orange-50", text: "text-orange-600" },
        ].map((h, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4 hover:translate-y-[-4px] transition-all">
            <div className={`${h.bg} ${h.text} w-16 h-16 rounded-[24px] flex items-center justify-center`}>
              <h.icon size={28} />
            </div>
            <h4 className="text-xl font-black text-slate-900">{h.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">{h.desc}</p>
          </div>
        ))}
      </section>

      {/* Main Details & Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          
          {/* Syllabus Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                <BookOpen size={32} className="text-[#5D3FD3]" /> Course Syllabus
              </h2>
              <span className="text-xs font-bold text-slate-400">3 Major Modules</span>
            </div>
            <div className="space-y-4">
              {syllabus.map((s) => (
                <div key={s.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setExpandedChapter(expandedChapter === s.id ? null : s.id)}
                    className="w-full p-8 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-black text-slate-900 text-lg">{s.title}</span>
                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedChapter === s.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedChapter === s.id && (
                    <div className="px-8 pb-8 pt-2 animate-in slide-in-from-top-4 duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {s.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-2 h-2 rounded-full bg-[#5D3FD3]"></div>
                            <span className="text-sm font-bold text-slate-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Teacher Profiles */}
          <section className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
              <Users size={32} className="text-[#5D3FD3]" /> Master Educators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Dr. Neha Gupta', role: 'Physics Expert', exp: '15+ Years', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop' },
                { name: 'Amit Verma', role: 'Mathematics Master', exp: '10+ Years', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop' },
              ].map((t, i) => (
                <div key={i} className="flex flex-col gap-6 p-8 bg-white rounded-[48px] border border-slate-100 shadow-sm group">
                  <div className="relative">
                    <img src={t.img} className="w-full h-56 rounded-[36px] object-cover group-hover:scale-[1.02] transition-transform" alt={t.name} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-[#5D3FD3]">Featured</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{t.name}</h4>
                    <p className="text-sm text-[#5D3FD3] font-black uppercase mt-1">{t.role}</p>
                    <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">Pioneered advanced teaching methodologies for board preparations. Helped 5,000+ students secure 95%+ scores.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Benefits & FAQ Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#5D3FD3] p-10 rounded-[48px] text-white shadow-2xl shadow-indigo-100 space-y-8 text-center sticky top-24">
            <div className="space-y-2">
              <h3 className="text-2xl font-black">Student Benefits</h3>
              <p className="text-indigo-100 text-xs font-medium">Why choose Accelerator Batch?</p>
            </div>
            
            <div className="space-y-4 text-left">
              {[
                "Chapter-wise Performance Analysis",
                "Personalized Roadmap to 100%",
                "Mock Interviews & Strategy",
                "Board Toppers Mentorship",
                "Mobile Offline Access"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-indigo-50 leading-tight">{benefit}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={onPurchase}
              className="w-full py-5 bg-white text-[#5D3FD3] rounded-[32px] font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
