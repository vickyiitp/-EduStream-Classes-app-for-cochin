
import React, { useState, useMemo } from 'react';
import { Search, Filter, Check, ArrowRight, BookOpen, Star, Sparkles, X, RotateCcw } from 'lucide-react';
import { Batch } from '../types';

interface BatchCatalogProps {
  onBatchSelect: (id: string) => void;
}

const ALL_MOCK_DATA: Batch[] = [
  { id: '1', name: 'Board Crusher 2025', subject: 'Math & Science', class: '10th', examType: 'Boards', language: 'Hinglish', price: '₹3,499', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e51afb?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 12000 },
  { id: '2', name: 'Foundation Pro Max', subject: 'Science & Math', class: '9th', examType: 'Foundation', language: 'English', price: '₹5,999', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 8500 },
  { id: '3', name: 'Math Alpha 10th', subject: 'Mathematics', class: '10th', examType: 'Boards', language: 'Hindi', price: '₹2,199', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 4200 },
  { id: '4', name: 'Science Zenith 9th', subject: 'Science', class: '9th', examType: 'Foundation', language: 'Hinglish', price: '₹4,200', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 5600 },
  { id: '5', name: 'English Excellence', subject: 'English Language', class: '10th', examType: 'Boards', language: 'English', price: '₹1,499', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 3100 },
  { id: '6', name: 'SST Warriors', subject: 'History & Geography', class: '9th', examType: 'Boards', language: 'Hinglish', price: '₹1,999', image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 2900 },
  { id: '7', name: 'Physics Masterclass', subject: 'Physics', class: '10th', examType: 'Olympiad', language: 'English', price: '₹2,799', image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=400&h=250&fit=crop', progress: 0, enrolledStudents: 1500 },
];

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
    <div className="space-y-1">{children}</div>
  </div>
);

const FilterCheckbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <button 
    onClick={onChange} 
    className="flex items-center justify-between w-full group py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors"
  >
    <span className={`text-sm font-bold transition-colors ${checked ? 'text-[#5D3FD3]' : 'text-slate-500 group-hover:text-slate-900'}`}>
      {label}
    </span>
    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
      checked ? 'bg-[#5D3FD3] border-[#5D3FD3] text-white' : 'border-slate-200 bg-white group-hover:border-slate-300'
    }`}>
      {checked && <Check size={12} strokeWidth={4} />}
    </div>
  </button>
);

const BatchCatalog: React.FC<BatchCatalogProps> = ({ onBatchSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    classes: [] as string[],
    exams: [] as string[],
    languages: [] as string[],
    subjects: [] as string[],
    maxPrice: 10000
  });

  const triggerLoad = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  const toggleListFilter = (category: 'classes' | 'exams' | 'languages' | 'subjects', value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [category]: updated };
    });
    triggerLoad();
  };

  const filteredBatches = useMemo(() => {
    return ALL_MOCK_DATA.filter(batch => {
      const matchesSearch = batch.name.toLowerCase().includes(search.toLowerCase()) || 
                           batch.subject.toLowerCase().includes(search.toLowerCase());
      
      const matchesClass = filters.classes.length === 0 || (batch.class && filters.classes.includes(batch.class));
      const matchesExam = filters.exams.length === 0 || (batch.examType && filters.exams.includes(batch.examType));
      const matchesLang = filters.languages.length === 0 || (batch.language && filters.languages.includes(batch.language));
      
      // Multi-subject check: matches if any selected subject is a substring of batch.subject
      const matchesSubject = filters.subjects.length === 0 || filters.subjects.some(s => batch.subject.toLowerCase().includes(s.toLowerCase()));
      
      const priceNum = parseInt(batch.price.replace(/[^0-9]/g, '')) || 0;
      const matchesPrice = priceNum <= filters.maxPrice;

      return matchesSearch && matchesClass && matchesExam && matchesLang && matchesSubject && matchesPrice;
    });
  }, [search, filters]);

  const resetFilters = () => {
    setFilters({ classes: [], exams: [], languages: [], subjects: [], maxPrice: 10000 });
    setSearch('');
    triggerLoad();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-4 min-h-screen animate-in fade-in duration-500">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm sticky top-24 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Filter size={18} className="text-[#5D3FD3]" /> Refine Results
            </h3>
            <button 
              onClick={resetFilters}
              className="p-2 hover:bg-indigo-50 rounded-xl text-[#5D3FD3] transition-all"
              title="Reset All"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <FilterSection title="Grade / Class">
              <FilterCheckbox label="Class 9th" checked={filters.classes.includes('9th')} onChange={() => toggleListFilter('classes', '9th')} />
              <FilterCheckbox label="Class 10th" checked={filters.classes.includes('10th')} onChange={() => toggleListFilter('classes', '10th')} />
            </FilterSection>

            <FilterSection title="Subjects">
              <FilterCheckbox label="Mathematics" checked={filters.subjects.includes('Math')} onChange={() => toggleListFilter('subjects', 'Math')} />
              <FilterCheckbox label="Science" checked={filters.subjects.includes('Science')} onChange={() => toggleListFilter('subjects', 'Science')} />
              <FilterCheckbox label="Social Science" checked={filters.subjects.includes('History') || filters.subjects.includes('Geography')} onChange={() => toggleListFilter('subjects', 'History')} />
              <FilterCheckbox label="English" checked={filters.subjects.includes('English')} onChange={() => toggleListFilter('subjects', 'English')} />
            </FilterSection>

            <FilterSection title="Exam Type">
              <FilterCheckbox label="Board Exams" checked={filters.exams.includes('Boards')} onChange={() => toggleListFilter('exams', 'Boards')} />
              <FilterCheckbox label="Foundation (IIT/NEET)" checked={filters.exams.includes('Foundation')} onChange={() => toggleListFilter('exams', 'Foundation')} />
              <FilterCheckbox label="Olympiads" checked={filters.exams.includes('Olympiad')} onChange={() => toggleListFilter('exams', 'Olympiad')} />
            </FilterSection>

            <FilterSection title="Medium">
              <FilterCheckbox label="English" checked={filters.languages.includes('English')} onChange={() => toggleListFilter('languages', 'English')} />
              <FilterCheckbox label="Hinglish" checked={filters.languages.includes('Hinglish')} onChange={() => toggleListFilter('languages', 'Hinglish')} />
              <FilterCheckbox label="Hindi" checked={filters.languages.includes('Hindi')} onChange={() => toggleListFilter('languages', 'Hindi')} />
            </FilterSection>

            <FilterSection title="Budget">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] font-bold text-slate-500">Up to</span>
                <span className="text-xs font-black text-[#5D3FD3]">₹{filters.maxPrice.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="10000" 
                step="500" 
                value={filters.maxPrice} 
                onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})} 
                onMouseUp={triggerLoad}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5D3FD3]" 
              />
            </FilterSection>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-6 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5D3FD3] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by batch name, topic, or teacher..." 
              value={search} 
              onChange={(e) => { setSearch(e.target.value); triggerLoad(); }} 
              className="w-full pl-12 pr-10 py-4 bg-white border border-slate-100 rounded-[24px] outline-none focus:ring-4 focus:ring-indigo-50 shadow-sm transition-all text-sm font-medium" 
            />
            {search && (
              <button 
                onClick={() => { setSearch(''); triggerLoad(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-slate-100 shadow-sm shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort:</span>
            <select className="bg-transparent text-xs font-black text-slate-900 outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Most Popular</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Applied Filters Badges */}
        {(filters.classes.length > 0 || filters.exams.length > 0 || filters.languages.length > 0 || filters.subjects.length > 0) && (
          <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2">
            {[...filters.classes, ...filters.exams, ...filters.languages, ...filters.subjects].map((tag, i) => (
              <span key={i} className="flex items-center gap-2 bg-indigo-50 text-[#5D3FD3] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                {tag}
              </span>
            ))}
            <button onClick={resetFilters} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase ml-2">Clear All</button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-[32px] border border-slate-50 h-[380px] p-6 space-y-4 animate-pulse">
                <div className="h-44 bg-slate-100 rounded-[24px]"></div>
                <div className="h-6 bg-slate-100 w-3/4 rounded-lg"></div>
                <div className="h-4 bg-slate-100 w-1/2 rounded-lg"></div>
                <div className="h-10 bg-slate-100 w-full rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBatches.map(batch => (
              <div key={batch.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">
                <div className="h-44 relative overflow-hidden">
                  <img src={batch.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={batch.name} />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#5D3FD3] shadow-sm">
                      {batch.class}
                    </span>
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                      {batch.language}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                      <Star size={12} fill="currentColor" /> <span className="text-[10px] text-slate-400 font-black">4.9</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#5D3FD3] transition-colors line-clamp-1">{batch.name}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{batch.subject} • {batch.examType}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-50 text-[#5D3FD3] p-1.5 rounded-lg"><BookOpen size={14} /></div>
                      <span className="text-[10px] font-black text-slate-600">{batch.enrolledStudents?.toLocaleString()}+ Enrolled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-50 text-orange-600 p-1.5 rounded-lg"><Sparkles size={14} /></div>
                      <span className="text-[10px] font-black text-slate-600">Premium</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Enrollment Fee</p>
                      <p className="text-2xl font-black text-slate-900">{batch.price}</p>
                    </div>
                    <button 
                      onClick={() => onBatchSelect(batch.id)} 
                      className="bg-[#5D3FD3] text-white p-4 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 group-hover:scale-105 active:scale-95 transition-all"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center space-y-6 border border-slate-100 shadow-sm animate-in zoom-in-95">
            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200">
              <Search size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">No batches match your criteria</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">Try broadening your search or resetting all filters to see our full list of courses.</p>
            </div>
            <button 
              onClick={resetFilters} 
              className="bg-indigo-50 text-[#5D3FD3] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-100 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BatchCatalog;
