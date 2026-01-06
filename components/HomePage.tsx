
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Sparkles, TrendingUp, ChevronRight, Play, Star, Clock, Trophy, ArrowRight, Info } from 'lucide-react';
import { Batch } from '../types';

interface HomePageProps {
  onBatchClick: (id: string) => void;
}

const MOCK_DATA: Batch[] = [
  { 
    id: 'b1', 
    name: 'Board Crusher 2025', 
    subject: 'Science & Math', 
    price: '₹3,499', 
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e51afb?q=80&w=600&h=900&auto=format&fit=crop', 
    isNew: true, 
    progress: 0,
    isFeatured: true
  },
  { id: 'b2', name: 'Foundation Pro Max', subject: 'IIT-JEE Prep', price: '₹5,999', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&h=900&auto=format&fit=crop', isPopular: true, progress: 0 },
  { id: 'b3', name: 'Olympiad Gold', subject: 'Mathematics', price: '₹2,999', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&h=900&auto=format&fit=crop', isNew: true, isPopular: true, progress: 0 },
  { id: 'b4', name: 'English Alpha', subject: 'Grammar', price: '₹1,499', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&h=900&auto=format&fit=crop', isPopular: true, progress: 0 },
  { id: 'b5', name: 'SST Warriors', subject: 'History & Civics', price: '₹1,999', image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=600&h=900&auto=format&fit=crop', isNew: true, progress: 0 },
  { id: 'b6', name: 'Physics Zenith', subject: 'Class 10 Prep', price: '₹4,200', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&h=900&auto=format&fit=crop', isPopular: true, progress: 0 },
];

const PortraitCard: React.FC<{ batch: Batch; onClick: (id: string) => void }> = ({ batch, onClick }) => (
  <div 
    onClick={() => onClick(batch.id)}
    className="relative aspect-[2/3] rounded-[24px] md:rounded-[32px] overflow-hidden group cursor-pointer shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-500"
  >
    <img src={batch.image} alt={batch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80"></div>
    
    <div className="absolute top-4 left-4 flex flex-col gap-2">
      {batch.isNew && (
        <span className="bg-[#5D3FD3] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">New</span>
      )}
      {batch.isPopular && (
        <span className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <TrendingUp size={10} /> Popular
        </span>
      )}
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
      <h3 className="text-white font-black text-lg md:text-xl leading-tight drop-shadow-md">{batch.name}</h3>
      <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider">{batch.subject}</p>
      
      <div className="flex items-center justify-between pt-3 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
        <span className="text-white font-black text-base">{batch.price}</span>
        <button className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-[10px] shadow-xl flex items-center gap-1.5 hover:bg-indigo-50 transition-colors">
          View <ArrowRight size={12} />
        </button>
      </div>
    </div>
  </div>
);

const BatchCarousel: React.FC<{ title: string; icon: React.ReactNode; batches: Batch[]; onClick: (id: string) => void }> = ({ title, icon, batches, onClick }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between px-2">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3">
        {icon} {title}
      </h2>
      <button className="text-[#5D3FD3] font-bold text-sm flex items-center gap-1 group">
        Explore All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
    
    <div className="mask-linear-edge -mx-4 px-4 overflow-visible">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1.3}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1440: { slidesPerView: 5.5 }
        }}
        className="!pb-12"
      >
        {batches.map((batch) => (
          <SwiperSlide key={batch.id}>
            <PortraitCard batch={batch} onClick={onClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onBatchClick }) => {
  const newBatches = MOCK_DATA.filter(b => b.isNew);
  const popularBatches = MOCK_DATA.filter(b => b.isPopular);
  
  // Dynamic Hero Batch selection
  const featuredBatch = MOCK_DATA.find(b => b.isFeatured) || newBatches[0] || MOCK_DATA[0];

  return (
    <div className="space-y-16 py-4 pb-20 animate-in fade-in duration-700">
      {/* Dynamic Netflix-style Hero Section */}
      <div className="relative rounded-[40px] md:rounded-[48px] overflow-hidden shadow-2xl min-h-[450px] md:min-h-[550px] flex flex-col justify-center border-4 border-white group">
        <img 
          src={featuredBatch.image} 
          alt={featuredBatch.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        <div className="relative z-10 max-w-3xl p-8 md:p-20 space-y-8 animate-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-3">
            <span className="bg-[#5D3FD3] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl border border-white/20">
              <Sparkles size={14} /> Spotlight Batch
            </span>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
              <Clock size={14} className="text-indigo-400" /> Enrollment Open
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl">
              {featuredBatch.name.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-indigo-400' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-indigo-100/80 text-lg md:text-xl font-medium leading-relaxed max-w-xl drop-shadow-md">
              Master your curriculum with India's most loved {featuredBatch.subject} program. Join {featuredBatch.enrolledStudents?.toLocaleString() || '12,000+'} top achievers today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
             <button 
              onClick={() => onBatchClick(featuredBatch.id)}
              className="bg-white text-slate-900 px-10 py-5 rounded-[28px] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-indigo-50 hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
             >
               <Play size={20} fill="currentColor" /> Enroll Now
             </button>
             <button 
              onClick={() => onBatchClick(featuredBatch.id)}
              className="bg-black/20 backdrop-blur-xl text-white border-2 border-white/20 px-8 py-5 rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
             >
                <Info size={20} /> More Info
             </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em] mb-1">Price</span>
              <span className="text-2xl font-black text-white">{featuredBatch.price}</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em] mb-1">Subject</span>
              <span className="text-xl font-black text-white">{featuredBatch.subject.split('•')[0]}</span>
            </div>
          </div>
        </div>

        {/* Floating Accent for Admin visibility */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">EduStream Exclusive</span>
        </div>
      </div>

      <BatchCarousel 
        title="Newly Launched Batches" 
        icon={<Sparkles className="text-indigo-500" size={24} />} 
        batches={newBatches} 
        onClick={onBatchClick}
      />

      <BatchCarousel 
        title="Popular Among Students" 
        icon={<Star className="text-orange-500" fill="currentColor" size={24} />} 
        batches={popularBatches} 
        onClick={onBatchClick}
      />

      <div className="bg-white rounded-[40px] border border-slate-100 p-10 flex flex-wrap items-center justify-around gap-8 shadow-sm">
        {[
          { label: '50k+ Active', text: 'Daily Learners', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: '4.9 Star', text: 'Avg Satisfaction', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: '100+ Masters', text: 'Top Educators', icon: Trophy, color: 'text-blue-600', bg: 'bg-blue-50' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-5">
            <div className={`${item.bg} ${item.color} p-4 rounded-2xl`}>
              <item.icon size={28} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 leading-none">{item.label}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;