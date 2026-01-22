
import React, { useState } from 'react';
import { 
  BookOpen, ChevronLeft, Lock, PlayCircle, CheckCircle, 
  FileText, Download, Award, ArrowRight, Sparkles, 
  TrendingUp, ChevronDown, Zap, Star, ShieldAlert, 
  Layers, HardDrive, LayoutGrid, ArrowLeft, Clock,
  Trophy, Target, List, Play, Box, Library
} from 'lucide-react';
import { Subject, Lesson, User, Track } from './types';

interface SubjectDetailViewProps {
  subject: Subject;
  user: User;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

type TabType = 'lessons' | 'exams' | 'files';

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({ subject, user, onBack, onSelectLesson }) => {
  const [tab, setTab] = useState<TabType>('lessons');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(subject.units[0]?.id || null);

  const tabs: { id: TabType, label: string, icon: any }[] = [
    { id: 'files', label: 'المكتبة', icon: HardDrive },
    { id: 'exams', label: 'الاختبارات', icon: Award },
    { id: 'lessons', label: 'المحاضرات', icon: Layers },
  ];

  const activeTabIndex = tabs.findIndex(t => t.id === tab);

  // حساب الإحصائيات الإجمالية للمادة
  const totalLessons = subject.units.reduce((acc, u) => acc + u.lessons.length, 0);
  const completedInSubject = subject.units.reduce((acc, u) => 
    acc + u.lessons.filter(l => user.completedLessons.includes(l.id)).length, 0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedInSubject / totalLessons) * 100) : 0;

  return (
    <div className="min-h-full bg-[#010103] pb-40 animate-in fade-in duration-1000 overflow-x-hidden no-scrollbar font-['Tajawal'] relative selection:bg-cyan-500/30">
      
      {/* Cinematic Hero Header Section */}
      <div className="relative h-[480px] w-full overflow-hidden flex flex-col items-center justify-center pt-20">
        {/* Background Visual Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(34,211,238,0.12)_0%,_transparent_60%)] z-0"></div>
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-transparent via-[#010103]/60 to-[#010103] z-10"></div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-20 left-[-10%] w-72 h-72 bg-cyan-500/5 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-[-10%] w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Back Button - Premium Floating Style */}
        <button 
          onClick={onBack} 
          className="absolute top-12 right-6 z-[100] w-12 h-12 bg-white/5 backdrop-blur-3xl rounded-[20px] border border-white/10 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Majestic Subject Icon & Info */}
        <div className="relative z-20 flex flex-col items-center gap-8 px-6 text-center">
          <div className="relative group">
            {/* Outer Glows */}
            <div className="absolute -inset-6 bg-cyan-500/20 blur-[40px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-[45px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="relative w-32 h-32 bg-[#0A0A1F]/90 backdrop-blur-3xl rounded-[40px] border-2 border-white/10 flex items-center justify-center text-7xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] animate-float">
               {subject.icon}
               <div className="absolute -bottom-3 -right-3 bg-cyan-500 text-black px-4 py-1 rounded-xl font-black text-[10px] shadow-2xl border-4 border-[#010103] uppercase tracking-widest">
                  {user.track}
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {subject.title}
            </h2>
            <div className="flex items-center justify-center gap-4">
               <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                  <BookOpen size={14} className="text-slate-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subject.units.length} وحدات إمبراطورية</span>
               </div>
               <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
                  <TrendingUp size={14} className="text-cyan-400" />
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">الإنجاز {overallProgress}%</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Premium Tab Bar Section */}
      <div className="px-6 -mt-10 relative z-50">
        <div className="bg-[#0A0A1F]/90 backdrop-blur-3xl p-2 rounded-[35px] border border-white/10 flex shadow-[0_30px_70px_rgba(0,0,0,1)] relative overflow-hidden group">
          {/* Inner Gloss Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>

          {/* Sliding Indicator - Precise & Smooth */}
          <div 
            className="absolute top-2 bottom-2 rounded-[28px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 bg-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            style={{ 
              width: `calc(100% / 3 - 4px)`,
              right: `calc(${activeTabIndex} * (100% / 3) + 2px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
          </div>

          {tabs.map((t) => {
            const isActive = tab === t.id;
            const Icon = t.icon;
            return (
              <button 
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-[28px] transition-all duration-500 relative z-10 ${isActive ? 'scale-105' : 'opacity-40 grayscale hover:opacity-70'}`}
              >
                <Icon size={22} className={isActive ? 'text-black drop-shadow-sm' : 'text-slate-500'} />
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-black' : 'text-slate-500'}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Display Area */}
      <div className="px-6 mt-16 pb-20">
        {tab === 'lessons' && (
          <div className="space-y-10">
            {subject.units.map((unit, uIdx) => {
              const isExpanded = expandedUnitId === unit.id;
              const unitProgress = unit.progress;
              const isUnitDone = unitProgress === 100;
              
              return (
                <div key={unit.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                  {/* Unit Panel - Majestic Look */}
                  <div className={`rounded-[45px] border transition-all duration-500 overflow-hidden relative ${isExpanded ? 'bg-[#0A0A1F] border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10 shadow-xl'}`}>
                    
                    {/* Unit Header Section */}
                    <button 
                      onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                      className="w-full p-8 flex items-center justify-between text-right relative group"
                    >
                      <div className="flex items-center gap-6 relative z-10">
                        {/* Unit Number Circle */}
                        <div className={`w-16 h-16 rounded-3xl flex flex-shrink-0 items-center justify-center text-xl font-black transition-all duration-700 ${isExpanded ? 'bg-cyan-500 text-black shadow-lg rotate-6' : 'bg-[#121230] text-slate-500 group-hover:bg-[#1a1a3d]'}`}>
                           {String(uIdx + 1).padStart(2, '0')}
                        </div>
                        
                        <div className="space-y-2">
                           <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">{unit.title}</h3>
                           <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                 <Play size={10} fill="currentColor" /> {unit.lessons.length} محاضرات
                              </div>
                              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                              <div className={`text-[9px] font-black uppercase tracking-widest ${isUnitDone ? 'text-green-500' : 'text-cyan-500'}`}>
                                 {unitProgress}% تم الإنجاز
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-cyan-500/10 text-cyan-400 rotate-180' : 'text-slate-800'}`}>
                         <ChevronDown size={28} />
                      </div>
                      
                      {/* Unit Background Text Detail */}
                      <span className="absolute left-[-20px] bottom-[-20px] text-[120px] font-black text-white/[0.02] pointer-events-none select-none italic">
                        {uIdx + 1}
                      </span>
                    </button>

                    {/* Progress Micro-Bar */}
                    <div className="h-[2px] w-full bg-white/5">
                      <div 
                        className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                        style={{ width: `${unitProgress}%` }}
                      ></div>
                    </div>

                    {/* Lessons Nested Content */}
                    {isExpanded && (
                      <div className="p-4 space-y-3 animate-in slide-in-from-top-4 duration-500 bg-black/20">
                        {unit.lessons.length > 0 ? unit.lessons.map((lesson, lIdx) => {
                          const isCompleted = user.completedLessons.includes(lesson.id);
                          const isFirst = lIdx === 0 && uIdx === 0;
                          const prevId = lIdx > 0 ? unit.lessons[lIdx - 1].id : (uIdx > 0 ? subject.units[uIdx-1].lessons[subject.units[uIdx-1].lessons.length-1]?.id : null);
                          const isUnlocked = isFirst || (prevId && user.completedLessons.includes(prevId));

                          return (
                            <button 
                              key={lesson.id}
                              disabled={!isUnlocked}
                              onClick={() => onSelectLesson(lesson)}
                              className={`w-full p-6 rounded-[32px] border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${isUnlocked ? 'bg-white/[0.02] border-white/5 hover:bg-[#121230] hover:border-cyan-500/30' : 'opacity-20 grayscale pointer-events-none'}`}
                            >
                              <div className="flex items-center gap-5 relative z-10 text-right">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isCompleted ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : (isUnlocked ? 'bg-white/5 text-slate-500 group-hover:bg-cyan-500 group-hover:text-black group-hover:scale-110 shadow-inner' : 'bg-slate-900 text-slate-800')}`}>
                                    {isCompleted ? <CheckCircle size={22} /> : (isUnlocked ? <PlayCircle size={22} /> : <Lock size={18} />)}
                                 </div>
                                 <div className="space-y-1">
                                    <h4 className={`text-base font-black transition-colors ${isCompleted ? 'text-green-400' : 'text-white'} group-hover:text-cyan-400`}>{lesson.title}</h4>
                                    <div className="flex items-center gap-3">
                                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{lesson.duration}</span>
                                       <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                                       <span className="text-[9px] font-black text-cyan-500/60 uppercase tracking-tighter">+{lesson.points} XP GLORY</span>
                                    </div>
                                 </div>
                              </div>
                              {isUnlocked && <ChevronLeft size={20} className="text-slate-800 group-hover:text-white group-hover:-translate-x-1 transition-all" />}
                            </button>
                          );
                        }) : (
                          <div className="py-12 text-center bg-white/5 rounded-[40px] border border-dashed border-white/10">
                             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">لا يوجد محاضرات حالياً</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'exams' && (
          <div className="py-24 text-center space-y-10 animate-in zoom-in duration-500">
             <div className="relative inline-block">
                {/* Decorative Elements */}
                <div className="absolute -inset-12 bg-yellow-500/10 blur-[60px] rounded-full animate-pulse"></div>
                <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-[40px] opacity-20"></div>
                
                <div className="relative w-28 h-28 bg-[#0A0A1F] rounded-[40px] border-2 border-yellow-500/20 flex items-center justify-center text-yellow-500 shadow-2xl">
                   <Target size={54} className="animate-float" />
                </div>
             </div>

             <div className="space-y-4 px-10">
                <h3 className="text-3xl font-black text-white tracking-tight">ساحة الاختبارات السيادية</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                   أثبت جدارتك في المادة بالكامل. الامتحانات الشاملة تفتح تلقائياً فور إنهاء جميع محاضرات المسار بنسبة إنجاز ١٠٠٪.
                </p>
             </div>

             <div className="pt-6">
                <button disabled className="px-12 py-5 bg-white/5 border border-white/10 rounded-[25px] text-slate-700 font-black text-xs uppercase tracking-[0.3em] cursor-not-allowed grayscale">
                   بوابة الاختبارات مقفلة
                </button>
             </div>
          </div>
        )}

        {tab === 'files' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex items-center justify-between px-4 mb-2">
                <div className="flex items-center gap-3 text-cyan-400">
                   {/* Fix: Added missing 'Library' import from 'lucide-react' */}
                   <Library size={22} />
                   <h4 className="text-sm font-black uppercase tracking-[0.2em]">المكتبة الإمبراطورية</h4>
                </div>
                <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">ملفات عالية الجودة</span>
                </div>
             </div>

             <div className="grid grid-cols-1 gap-4">
               {[
                 { title: 'ملخص البدايات الإمبراطوري', size: '2.4 MB', type: 'PDF' },
                 { title: 'بنك أسئلة الوزارة المعتمد', size: '5.1 MB', type: 'PDF' },
                 { title: 'خرائط ذهنية - شاملة', size: '3.8 MB', type: 'JPG' }
               ].map((f, i) => (
                 <div key={i} className="group p-8 bg-[#0A0A1F]/60 backdrop-blur-xl rounded-[40px] border border-white/5 flex items-center justify-between hover:bg-slate-900/80 hover:border-cyan-500/40 transition-all shadow-xl">
                    <div className="flex items-center gap-6 text-right">
                       <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-slate-500 group-hover:bg-cyan-500 group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-xl">
                          <FileText size={28} />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-base font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">{f.title}</h4>
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">{f.type} • {f.size}</span>
                       </div>
                    </div>
                    <button className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 hover:text-white hover:bg-cyan-500/20 transition-all active:scale-90 shadow-inner">
                       <Download size={22} />
                    </button>
                 </div>
               ))}
             </div>

             <div className="mt-12 p-12 bg-gradient-to-br from-[#0A0A1F] to-black rounded-[50px] border border-white/5 text-center space-y-4">
                <Box size={32} className="text-slate-800 mx-auto" />
                <p className="text-[10px] text-slate-600 font-bold leading-relaxed px-10 italic">يتم إضافة مصادر جديدة دورياً لضمان تفوقك الدائم في المسار.</p>
             </div>
          </div>
        )}
      </div>

      {/* Aesthetic Bottom Glow - Softness */}
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full select-none z-0"></div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};
