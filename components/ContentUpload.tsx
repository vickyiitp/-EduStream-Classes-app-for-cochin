
import React, { useState } from 'react';
import { Upload, FileText, Video, HelpCircle, CheckCircle, ChevronRight, X, Sparkles, Wand2 } from 'lucide-react';
import { generateAIQuiz } from '../lib/gemini';

const ContentUpload: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'video' | 'pdf' | 'quiz'>('video');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiQuestions, setAiQuestions] = useState<any[]>([]);

  const handleMagicGenerate = async () => {
    if (!topic) return alert("Please enter a topic first!");
    setIsGenerating(true);
    try {
      const qs = await generateAIQuiz(topic, "Science");
      setAiQuestions(qs);
      setStep(2); // Jump to details view if questions are ready
    } catch (e) {
      console.error(e);
      alert("AI generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-slate-50 px-10 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step === i ? 'bg-[#5D3FD3] text-white' : 
                  step > i ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {step > i ? <CheckCircle size={16} /> : i}
                </div>
                {i < 3 && <div className="w-12 h-1 bg-slate-200 rounded-full"></div>}
              </div>
            ))}
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-10">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-extrabold text-slate-900">What are you uploading today?</h2>
                <p className="text-slate-500">Select the type of content to add to your batch.</p>
              </div>
              
              <div className="space-y-2 max-w-md mx-auto mb-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lecture/Topic Title</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Chemical Bonding Part 2" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'video', label: 'Video Lecture', icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { id: 'pdf', label: 'PDF Study Material', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { id: 'quiz', label: 'Interactive Quiz', icon: HelpCircle, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setType(item.id as any)}
                    className={`p-8 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 ${
                      type === item.id ? 'border-[#5D3FD3] bg-indigo-50/30' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`${item.bg} ${item.color} p-5 rounded-2xl`}>
                      <item.icon size={32} />
                    </div>
                    <span className="font-bold text-slate-900">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
                {type === 'quiz' && (
                  <button 
                    onClick={handleMagicGenerate}
                    disabled={isGenerating || !topic}
                    className="bg-indigo-50 text-[#5D3FD3] px-8 py-3 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-100 transition-all disabled:opacity-50"
                  >
                    <Sparkles size={20} /> {isGenerating ? 'AI Thinking...' : 'Generate with EduStream AI'}
                  </button>
                )}
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#5D3FD3] text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                >
                  Manual Upload <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Upload Content Details</h3>
                <p className="text-sm text-slate-500">Provide the details for your {type}: <span className="font-black text-indigo-600 uppercase">{topic}</span></p>
              </div>
              
              {aiQuestions.length > 0 && (
                <div className="p-6 bg-indigo-50 rounded-[32px] border border-indigo-100 space-y-4">
                  <h4 className="font-bold text-[#5D3FD3] flex items-center gap-2">
                    <Sparkles size={16} /> AI Generated Questions Preview
                  </h4>
                  <div className="space-y-2">
                    {aiQuestions.map((q, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl text-xs font-medium text-slate-600 border border-indigo-50">
                        {idx + 1}. {q.question}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div className="border-4 border-dashed border-slate-100 rounded-[32px] p-12 text-center space-y-4 hover:border-indigo-100 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                    <Upload size={32} />
                  </div>
                  <p className="text-slate-500 font-bold">Drag and drop your {type} file here, or browse files</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Max File Size: 500MB</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex justify-between">
                <button onClick={() => setStep(1)} className="text-slate-400 font-bold px-6 py-4">Go Back</button>
                <button 
                  onClick={() => setStep(3)}
                  className="bg-[#5D3FD3] text-white px-12 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100"
                >
                  Publish to Batch
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95">
              <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={64} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Content Published!</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Your students can now access this {type} in their Classroom section.</p>
              <button onClick={() => setStep(1)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all">
                Return to Workspace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentUpload;
