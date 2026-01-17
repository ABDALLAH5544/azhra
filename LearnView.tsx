
import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, Lock, PlayCircle, CheckCircle, FileText, Download, MessageSquare, Award, ArrowRight, Star, GraduationCap } from 'lucide-react';
import { Subject, Unit, Lesson, User, View } from './types';
import { CURRICULUM } from './constants';
import { LessonView } from './LessonView';

interface LearnViewProps {
  user: User;
  setView: (v: View) => void;
  selectedSubject?: Subject | null;
}

export const LearnView: React.FC<LearnViewProps> = ({ user, setView, selectedSubject: initialSubject }) => {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(initialSubject || null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [tab, setTab] = useState<'lessons' | 'exams' | 'files'>('lessons');

  // Logic to scroll to top within sub-views
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeSubject, activeLesson]);

  const subjects = CURRICULUM.filter(s => s.track.includes(user.track));

  if (activeLesson) {
    return (
      <LessonView 
        lesson={activeLesson} 
        onBack={() => setActiveLesson(null)} 
        onComplete={(score) => { console.log("Lesson score:", score); }}
        setView={setView}
      />
    );
  }

  if (activeSubject) {
    return (
      <div className="min-h-full bg-[#030308] pb-32 animate-in slide-in-from-left duration-500 overflow-x-hidden">
        {/* Cinematic Subject Header */}
        <div className="relative h-72 flex items-end p-6 md:p-10 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-[#030308]/60 to-transparent z-10"></div>
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] -z-10 rounded-full animate-pulse"></div>
           <button onClick={() => setActiveSubject(null)} className="absolute top-10 right-4 z-20 w-10 h-10 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-2xl active:scale-90 transition-all">
              <ArrowRight size={20} />
           </button>
           <div className="relative z-20 space-y-3">
              <span className="text-6xl mb-2 block drop-shadow-2xl">{activeSubject.icon}</span>
              <h2 className="text-3xl font-black text-white leading-tight">{activeSubject.title}</h2>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">مسار {user.track} • {activeSubject.units.length} وحدات</p>
           </div>
        </div>

        {/* Tab Switcher - Mobile Optimized */}
        <div className="px-6 mb-10 sticky top-0 z-40 py-4 bg-[#030308]/90 backdrop-blur-md">
           <div className="bg-[#0A0A1F] p-1.5 rounded-[25px] border border-white/5 flex gap-1 shadow-2xl">
              {[
                { id: 'lessons', label: 'الخطة', icon: BookOpen },
                { id: 'exams', label: 'الامتحانات', icon: Award },
                { id: 'files', label: 'المكتبة', icon: FileText }
              ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[20px] transition-all ${tab === t.id ? 'bg-cyan-500 text-black font-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 font-bold'}`}
                >
                  <t.icon size={14} />
                  <span className="text-[10px]">{t.label}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="px-6 space-y-10">
          {tab === 'lessons' && activeSubject.units.map((unit, uIdx) => (
            <div key={unit.id} className="space-y-4">
               <div className="flex justify-between items-center px-2">
                  <h3 className="text-xs font-black text-slate-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center text-[9px]">{uIdx + 1}</span>
                    {unit.title}
                  </h3>
                  {!unit.isUnlocked && <Lock size={12} className="text-slate-800" />}
               </div>
               
               <div className="space-y-3">
                 {unit.lessons.map((lesson) => (
                   <button 
                    key={lesson.id}
                    disabled={!lesson.isUnlocked}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full p-5 rounded-[30px] border transition-all flex items-center justify-between group relative overflow-hidden ${lesson.isUnlocked ? 'bg-[#0A0A1F] border-white/5 hover:bg-slate-900' : 'bg-slate-950 border-transparent opacity-30 grayscale'}`}
                   >
                     <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${lesson.isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 group-hover:bg-cyan-500 group-hover:text-black shadow-inner'}`}>
                           {lesson.isCompleted ? <CheckCircle size={24} /> : <PlayCircle size={24} />}
                        </div>
                        <div className="text-right">
                           <h4 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">{lesson.title}</h4>
                           <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">{lesson.duration} • {lesson.points} نقطة</p>
                        </div>
                     </div>
                     {!lesson.isUnlocked ? <Lock size={16} className="text-slate-800" /> : <ChevronLeft size={18} className="text-slate-700" />}
                   </button>
                 ))}
               </div>
            </div>
          ))}

          {tab === 'exams' && (
            <div className="py-20 text-center space-y-6 bg-white/5 rounded-[40px] border border-white/5 px-8">
               <Award size={48} className="text-yellow-500/20 mx-auto" />
               <h4 className="text-white font-black text-sm">الاختبارات الشاملة</h4>
               <p className="text-slate-500 font-bold text-[10px] leading-relaxed">هذا القسم يفتح تلقائياً عند إكمال جميع دروس الوحدة بنسبة نجاح تفوق 80% في الاختبارات القصيرة.</p>
            </div>
          )}

          {tab === 'files' && (
            <div className="grid grid-cols-1 gap-4">
               {['ملخص قواعد النحو م1', 'خريطة ذهنية للوحدة الأولى', 'أسئلة بنك المعرفة'].map((file, i) => (
                 <div key={i} className="p-5 bg-[#0A0A1F] rounded-[30px] border border-white/5 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center"><FileText size={20} /></div>
                       <span className="text-xs font-black text-white">{file}</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-cyan-400 border border-white/5">
                       <Download size={18} />
                    </button>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#030308] p-6 pt-12 animate-in fade-in duration-1000">
      <div className="mb-12 space-y-4">
         <div className="inline-flex items-center gap-2 bg-cyan-400/10 px-4 py-1.5 rounded-full border border-cyan-400/20">
            <GraduationCap size={14} className="text-cyan-400" />
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">الأكاديمية الإمبراطورية</span>
         </div>
         <h2 className="text-4xl font-black text-white tracking-tighter leading-none">أكاديمية <span className="text-cyan-400">المجد</span></h2>
         <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-[240px]">تعلم، اختبر، وتصدر لوحة الشرف مع أقوى نظام تعليمي في مصر.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-20">
        {subjects.map((subject) => (
          <button 
            key={subject.id}
            onClick={() => setActiveSubject(subject)}
            className="group relative bg-[#0A0A1F] p-8 rounded-[45px] border border-white/5 overflow-hidden transition-all hover:bg-slate-900 hover:border-cyan-500/20 active:scale-95 text-right flex items-center justify-between shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[80px] -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>
            <div className="flex items-center gap-6">
               <span className="text-5xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">{subject.icon}</span>
               <div className="space-y-1">
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">{subject.title}</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{subject.units.length} وحدات</span>
                     <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                     <span className="text-[9px] text-cyan-500/70 font-black uppercase tracking-widest">جاهز للبدء</span>
                  </div>
               </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-800 group-hover:bg-cyan-500 group-hover:text-black transition-all group-hover:-translate-x-1">
               <ChevronLeft size={22} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
