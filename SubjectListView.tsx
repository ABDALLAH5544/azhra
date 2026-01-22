
import React from 'react';
import { GraduationCap, Sparkles, ArrowRight, Target, BookOpen, Crown, Library, ChevronLeft } from 'lucide-react';
import { Subject, Track } from './types';

interface SubjectListViewProps {
  subjects: Subject[];
  userTrack: Track;
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
}

export const SubjectListView: React.FC<SubjectListViewProps> = ({ subjects, userTrack, onSelectSubject, onBack }) => {
  return (
    <div className="min-h-full bg-[#010103] p-6 pt-12 animate-in fade-in duration-700 overflow-x-hidden no-scrollbar font-['Tajawal'] relative pb-40">
      
      {/* هيدر التحكم العلوي */}
      <div className="flex items-center justify-between mb-8 sticky top-0 z-[100] bg-[#010103]/80 backdrop-blur-xl py-4 border-b border-white/5 px-2">
         <button 
           onClick={onBack} 
           className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all shadow-2xl"
         >
            <ArrowRight size={24} className="rotate-0" />
         </button>
         <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
               <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">أكاديمية أزهرت</span>
               <Sparkles size={12} className="text-cyan-400" />
            </div>
            <h2 className="text-lg font-black text-white">بوابات المعرفة</h2>
         </div>
      </div>

      {/* بطاقة المسار الحالية */}
      <div className="mb-8 relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[35px] blur-xl opacity-50"></div>
         <div className="relative bg-[#0A0A1F] border border-white/10 p-6 rounded-[35px] flex items-center justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center gap-4">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl ${userTrack === Track.AZHAR ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20'}`}>
                  <Crown size={28} />
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">أنت تتبع مسار</p>
                  <h3 className="text-xl font-black text-white">التعليم {userTrack}</h3>
               </div>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">
               <span className="text-[10px] font-black text-slate-400">{subjects.length} مادة</span>
            </div>
         </div>
      </div>

      {/* شبكة المواد بتصميم مكثف وأنيق */}
      <div className="grid grid-cols-1 gap-4 relative z-10">
        {subjects.length > 0 ? subjects.map((subject, index) => {
          const isAzharOnly = subject.track.length === 1 && subject.track[0] === Track.AZHAR;
          
          return (
            <button 
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className="group relative w-full text-right outline-none active:scale-[0.98] transition-all duration-300"
            >
              <div className="relative bg-[#0A0A1F]/60 backdrop-blur-xl p-5 rounded-[30px] border border-white/5 overflow-hidden flex items-center justify-between shadow-lg hover:bg-slate-900/80 hover:border-cyan-500/30 transition-all">
                
                <div className="flex items-center gap-5 relative z-10">
                   {/* أيقونة المادة */}
                   <div className="relative">
                      <div className="w-14 h-14 bg-[#121230] rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                         {subject.icon}
                      </div>
                      {isAzharOnly && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 text-black px-1.5 py-0.5 rounded-md text-[7px] font-black border-2 border-[#0A0A1F] shadow-lg">
                           أزهري
                        </div>
                      )}
                   </div>

                   <div className="space-y-1">
                      <h3 className="text-base font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">{subject.title}</h3>
                      <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase">
                            <Library size={10} />
                            <span>{subject.units.length} وحدات</span>
                         </div>
                         <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                         <div className="flex items-center gap-1 text-[9px] text-green-500 font-bold uppercase">
                            <Target size={10} />
                            <span>متاح</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* سهم الدخول */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-800 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-inner">
                   <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        }) : (
          <div className="py-20 text-center space-y-4 opacity-30">
             <Library size={64} className="mx-auto" />
             <p className="text-xs font-black">لا توجد مواد متاحة لهذا المسار حالياً</p>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
