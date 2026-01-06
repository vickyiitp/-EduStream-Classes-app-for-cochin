
import React, { useState, useEffect } from 'react';
import { Timer, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Flag } from 'lucide-react';

const TestCenter: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const questions = [
    { id: 0, text: "Which of the following is an example of a scalar quantity?", options: ["Velocity", "Acceleration", "Mass", "Force"] },
    { id: 1, text: "What is the SI unit of electric potential difference?", options: ["Ampere", "Volt", "Ohm", "Watt"] },
    { id: 2, text: "The phenomenon of splitting of white light into its seven constituent colors is called?", options: ["Reflection", "Refraction", "Dispersion", "Total Internal Reflection"] },
    { id: 3, text: "A solution turns red litmus blue, its pH is likely to be?", options: ["1", "4", "5", "10"] },
    { id: 4, text: "Which element is the most electro-negative?", options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"] },
  ];

  const handleOptionSelect = (idx: number) => {
    setAnswers({ ...answers, [currentQuestion]: idx });
  };

  const toggleReview = () => {
    if (markedForReview.includes(currentQuestion)) {
      setMarkedForReview(markedForReview.filter(q => q !== currentQuestion));
    } else {
      setMarkedForReview([...markedForReview, currentQuestion]);
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Test Submitted Successfully!</h2>
        <p className="text-slate-500 max-w-md">Your responses have been recorded. You can view your detailed scorecard in the Scoreboard section.</p>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl w-full max-w-md">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Answered</p>
              <p className="text-2xl font-bold">{Object.keys(answers).length} / {questions.length}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Time Spent</p>
              <p className="text-2xl font-bold">{formatTime(1800 - timeLeft)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Test Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 p-2 rounded-lg text-[#5D3FD3]"><AlertCircle size={24} /></div>
          <div>
            <h3 className="font-bold text-slate-900">Physics & Chemistry Chapter 1 Quiz</h3>
            <p className="text-xs text-slate-500">Max Marks: 50 • Total Questions: {questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-lg ${timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
            <Timer size={20} /> {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setIsFinished(true)}
            className="bg-[#5D3FD3] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col min-w-0">
          <div className="p-8 flex-1 overflow-y-auto custom-scrollbar space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#5D3FD3] uppercase tracking-widest">Question {currentQuestion + 1}</span>
              <h4 className="text-2xl font-bold text-slate-900 leading-relaxed">
                {questions[currentQuestion].text}
              </h4>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group ${
                    answers[currentQuestion] === idx 
                      ? 'border-[#5D3FD3] bg-indigo-50/50' 
                      : 'border-slate-50 bg-slate-50/30 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    answers[currentQuestion] === idx ? 'bg-[#5D3FD3] border-[#5D3FD3] text-white' : 'border-slate-300'
                  }`}>
                    <span className="text-[10px] font-bold">{String.fromCharCode(65 + idx)}</span>
                  </div>
                  <span className={`font-bold text-left ${answers[currentQuestion] === idx ? 'text-[#5D3FD3]' : 'text-slate-600'}`}>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-4">
              <button 
                onClick={toggleReview}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  markedForReview.includes(currentQuestion) 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Flag size={18} /> Mark for Review
              </button>
            </div>
            <div className="flex gap-4">
              <button 
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <button 
                disabled={currentQuestion === questions.length - 1}
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-black disabled:opacity-30"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h5 className="font-bold text-slate-900">Question Palette</h5>
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    currentQuestion === idx ? 'ring-2 ring-[#5D3FD3] ring-offset-2' : ''
                  } ${
                    markedForReview.includes(idx) ? 'bg-orange-500 text-white' :
                    answers[idx] !== undefined ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded bg-green-500"></div> Answered
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded bg-orange-500"></div> Marked
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded bg-slate-100"></div> Not Visited
              </div>
            </div>
          </div>

          <div className="bg-[#5D3FD3] p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 text-center space-y-4">
            <Trophy size={48} className="mx-auto text-white/50" />
            <h4 className="font-bold">Aim for 100%</h4>
            <p className="text-indigo-100 text-xs leading-relaxed">Review all marked questions before final submission.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Trophy = ({ size, className }: { size: number, className?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 22V18"/><path d="M14 22V18"/><path d="M18 4H6v7a6 6 0 0 0 12 0V4Z"/></svg>;

export default TestCenter;
