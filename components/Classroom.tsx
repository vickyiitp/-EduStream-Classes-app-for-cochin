
import React, { useState } from 'react';
import { 
  PlayCircle, 
  FileText, 
  MessageCircle, 
  FileCheck, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2,
  Lock,
  Download,
  Share2,
  Video,
  Folder,
  Radio,
  Clock,
  Layout,
  Trophy,
  Activity
} from 'lucide-react';
import { Chapter } from '../types';

interface ClassroomProps {
  batchId: string;
}

const Classroom: React.FC<ClassroomProps> = ({ batchId }) => {
  const [activeTab, setActiveTab] = useState<'lectures' | 'notes' | 'assignments'>('lectures');
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [expandedChapter, setExpandedChapter] = useState<string | null>('c1');
  const [isClassLive, setIsClassLive] = useState(true);

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

  const chapters: Chapter[] = [
    {
      id: 'c1',
      title: 'Real Numbers & Foundations',
      lessons: [
        { id: 'l1', title: 'Introduction to Real Numbers', duration: '45:00', isCompleted: true, type: 'video' },
        { id: 'l2', title: 'Euclids Division Lemma', duration: '32:15', isCompleted: true, type: 'video' },
        { id: 'l3', title: 'NCERT Solution - Ex 1.1', duration: '15:00', isCompleted: false, type: 'pdf' },
      ]
    },
    {
      id: 'c2',
      title: 'Polynomials & Algebra',
      lessons: [
        { id: 'l4', title: 'Geometrical Meaning', duration: '38:40', isCompleted: false, type: 'video' },
        { id: 'l5', title: 'Relationship between Zeroes', duration: '50:20', isCompleted: false, type: 'video' },
        { id: 'l6', title: 'Polynomials DPP #1', duration: '2.4 MB', isCompleted: false, type: 'pdf' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Subject Header Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex bg-white p-1.5 rounded-[32px] border border-slate-100 shadow-sm w-full md:w-auto overflow-x-auto scrollbar-hide">
          {subjects.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-8 py-3 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeSubject === sub ? 'bg-[#5D3FD3] text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm">
          <Activity size={18} className="text-indigo-500" />
          <span className="text-xs font-black text-slate-900">45% Course Complete</span>
          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      {/* Conditional Live Class Card */}
      {isClassLive && (
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 rounded-[40px] text-white shadow-2xl shadow-red-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-[28px] flex items-center justify-center backdrop-blur-md animate-pulse">
              <Radio size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white text-red-600 px-2 py-0.5 rounded">Live Now</span>
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Physics Unit 4</span>
              </div>
              <h3 className="text-2xl font-black">Magnetism: Electromagnets & Applications</h3>
              <p className="text-sm opacity-80 font-medium">Join 2.4k students in the session by Dr. Neha Gupta</p>
            </div>
          </div>
          <button className="bg-white text-red-600 px-10 py-4 rounded-[32px] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform active:scale-95 z-10">
            Enter Live Class
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Course Content Sidebar (The Tree) */}
        <div className="w-full lg:w-96 shrink-0 space-y-4">
          <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full sticky top-24">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layout size={20} className="text-[#5D3FD3]" />
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Curriculum</h3>
              </div>
              <button className="text-slate-400"><Folder size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="rounded-[32px] overflow-hidden">
                  <button 
                    onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                    className={`w-full p-6 flex items-center justify-between transition-colors ${
                      expandedChapter === chapter.id ? 'bg-[#5D3FD3] text-white shadow-lg' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`transition-transform ${expandedChapter === chapter.id ? 'rotate-90' : ''}`}>
                        <ChevronRight size={18} />
                      </div>
                      <span className="font-bold text-sm text-left">{chapter.title}</span>
                    </div>
                  </button>
                  
                  {expandedChapter === chapter.id && (
                    <div className="p-4 space-y-2 bg-slate-50/50">
                      {chapter.lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer group ${
                            lesson.isCompleted ? 'bg-white border border-green-100' : 'hover:bg-white'
                          }`}
                        >
                          <div className="mt-1">
                            {lesson.isCompleted ? (
                              <CheckCircle2 size={18} className="text-green-500" />
                            ) : (
                              lesson.type === 'video' ? <Video size={18} className="text-slate-300 group-hover:text-indigo-500" /> : <FileText size={18} className="text-slate-300 group-hover:text-orange-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className={`text-xs font-bold leading-relaxed ${lesson.isCompleted ? 'text-slate-400' : 'text-slate-700'}`}>
                              {lesson.title}
                            </h5>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{lesson.type}</span>
                              <span className="text-[10px] text-slate-300">•</span>
                              <span className="text-[10px] text-slate-400 font-bold">{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          
          {/* Active Content Preview */}
          <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden p-8 space-y-8 flex flex-col">
            <div className="bg-black aspect-video rounded-[40px] overflow-hidden relative group shadow-2xl">
              <img 
                src="https://picsum.photos/seed/lecture-hq/1280/720" 
                alt="Lecture Preview" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-24 h-24 bg-[#5D3FD3] text-white rounded-[32px] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border-4 border-white/20">
                  <PlayCircle size={48} fill="currentColor" />
                </button>
              </div>
              <div className="absolute top-6 left-6 flex items-center gap-2">
                 <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10">Now Playing: Lesson 4</div>
              </div>
            </div>

            <div className="space-y-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 leading-tight">L4: Geometrical Meaning of the Zeroes</h2>
                  <p className="text-slate-500 font-bold mt-1">Mathematics • Unit 2: Polynomials</p>
                </div>
                <div className="flex items-center gap-3">
                   <button className="p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all"><Share2 size={24} /></button>
                   <button className="p-4 bg-slate-50 text-slate-400 hover:text-orange-600 rounded-2xl transition-all"><Download size={24} /></button>
                </div>
              </div>
              
              {/* Interaction Tabs */}
              <div className="flex border-b border-slate-100 pt-8 gap-12">
                {[
                  { id: 'lectures', label: 'Overview', icon: Layout },
                  { id: 'notes', label: 'PDF Notes', icon: FileText },
                  { id: 'assignments', label: 'Assignments', icon: FileCheck },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative pb-4 text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id ? 'text-[#5D3FD3]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <tab.icon size={16} />
                      {tab.label}
                    </div>
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#5D3FD3] rounded-t-full"></div>}
                  </button>
                ))}
              </div>

              <div className="py-8">
                {activeTab === 'lectures' && (
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed font-medium">In this lecture, we explore the graphical representation of linear and quadratic polynomials. We discuss how the zeroes correspond to the points where the graph intersects the X-axis.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-2">
                          <h4 className="font-bold text-slate-900 flex items-center gap-2"><Clock size={16} className="text-indigo-500" /> Key Timestamps</h4>
                          <ul className="text-xs text-slate-500 font-bold space-y-2">
                             <li className="flex justify-between"><span>Introduction</span> <span>02:15</span></li>
                             <li className="flex justify-between"><span>Linear Graphs</span> <span>12:45</span></li>
                             <li className="flex justify-between"><span>Quadratic Parabolas</span> <span>22:10</span></li>
                          </ul>
                       </div>
                       <div className="p-6 bg-indigo-50 rounded-[32px] border border-indigo-100 space-y-3 flex flex-col justify-center text-center">
                          <Trophy size={32} className="text-indigo-500 mx-auto" />
                          <h4 className="font-bold text-indigo-900 text-sm">Practice Quiz Available</h4>
                          <button className="bg-indigo-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Start Now</button>
                       </div>
                    </div>
                  </div>
                )}
                {activeTab === 'notes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white border-2 border-slate-50 rounded-[36px] shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-50 text-orange-600 p-4 rounded-2xl group-hover:scale-110 transition-transform"><FileText size={24} /></div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Chapter 2 Notes.pdf</h4>
                          <p className="text-[10px] text-slate-400 font-bold">2.4 MB • High Quality</p>
                        </div>
                      </div>
                      <Download size={20} className="text-slate-300 group-hover:text-indigo-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
