
import React, { useMemo } from 'react';
import { Sparkles, Flame, Trophy, Star, Zap, Crown, ArrowLeft, ChevronLeft, Swords, Gamepad2, Target, CheckCircle, TrendingUp, BookOpen, ShieldCheck, Layers } from 'lucide-react';
import { User, Subject, View, UserRole } from './types';
import { CURRICULUM } from './constants';
import { getAllUsers } from './database';

interface HomeViewProps {
  user: User;
  onSubjectSelect: (subject: Subject) => void;
  setView: (v: View) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ user, onSubjectSelect, setView }) => {
  const userSubjects = CURRICULUM.filter(s => s.track.includes(user.track));

  const totalLessons = useMemo(() => {
    return userSubjects.reduce((acc, sub) => acc + sub.units.reduce((uAcc, unit) => uAcc + unit.lessons.length, 0), 0);
  }, [userSubjects]);
  
  const progressPercent = Math.round((user.completedLessons.length / totalLessons) * 100);

  const isStaff = user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR;

  return (
    <div className="p-6 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-40 overflow-x-hidden">
      
      {/* قسم الترحيب السحري */}
      <section className="flex justify-between items-center py-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></div>
             <p className="text-[11px] font-black text-cyan-400/80 uppercase tracking-[0.3em]">أكاديمية أزهرت الإمبراطورية</p>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight">مستعد للغزو، <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{user.name.split(' ')[0]}</span>؟</h2>
        </div>
      </section>

      {/* Staff Quick Actions - NEW */}
      {isStaff && (
        <section className="grid grid-cols-2 gap-4 animate-in zoom-in duration-500">
           {user.role === UserRole.ADMIN && (
             <button 
              onClick={() => setView('admin')}
              className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-[35px] flex flex-col items-center gap-2 active:scale-95 transition-all shadow-xl shadow-yellow-500/5"
             >
                <ShieldCheck size={28} className="text-yellow-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">إدارة المنصة</span>
             </button>
           )}
           <button 
            onClick={() => setView('moderator')}
            className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-[35px] flex flex-col items-center gap-2 active:scale-95 transition-all shadow-xl shadow-cyan-500/5"
           >
              <Layers size={28} className="text-cyan-400" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">إدارة المحتوى</span>
           </button>
        </section>
      )}

      {/* بطاقة التقدم الإمبراطورية */}
      <section className="relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-[40px] blur-xl opacity-20 group-hover:opacity-50 transition-all duration-1000"></div>
        <div className="relative bg-[#08081a]/90 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl overflow-hidden">
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 blur-[80px] rounded-full"></div>
           <div className="flex justify-between items-end mb-8">
              <div className="space-y-2">
                 <h3 className="text-lg font-black text-white flex items-center gap-3">
                    <TrendingUp size={22} className="text-cyan-400" /> إنجازاتك
                 </h3>
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">لقد أنهيت {user.completedLessons.length} معارك علمية</p>
              </div>
              <div className="relative">
                 <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{progressPercent}%</span>
              </div>
           </div>
           <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-6 p-1 border border-white/5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full transition-all duration-1000 shadow-[0_0_20px_#22d3ee]" style={{ width: `${progressPercent}%` }}></div>
           </div>
           <div className="flex justify-around pt-2">
              <div className="text-center">
                 <p className="text-[9px] font-black text-slate-500 uppercase">النقاط</p>
                 <p className="text-sm font-black text-cyan-400">{user.points}</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                 <p className="text-[9px] font-black text-slate-500 uppercase">الالتزام</p>
                 <p className="text-sm font-black text-orange-500">{user.streak} يوم</p>
              </div>
           </div>
        </div>
      </section>

      {/* بوابات العلم (المواد) */}
      <section className="space-y-8">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-2 text-right">
             <h3 className="text-2xl font-black text-white tracking-tight">بوابات <span className="text-cyan-400">العلم</span></h3>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">اختر تخصصك وابدأ رحلة المجد</p>
          </div>
          <button onClick={() => setView('learn')} className="group flex items-center gap-3 text-[11px] font-black text-cyan-400 uppercase bg-cyan-400/5 px-6 py-3 rounded-2xl border border-cyan-400/10 active:scale-95 transition-all">
            المكتبة <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-5">
          {userSubjects.slice(0, 4).map((subject) => (
            <div 
              key={subject.id} 
              onClick={() => onSubjectSelect(subject)}
              className="relative bg-[#0A0A1F]/60 backdrop-blur-xl p-8 rounded-[45px] border border-white/5 active:scale-95 transition-all group hover:bg-slate-900/80 shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer flex items-center justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-[#121230] rounded-[30px] flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/5">
                  {subject.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-xl text-white group-hover:text-cyan-400 transition-colors tracking-tight">{subject.title}</h4>
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{subject.units.length} وحدات</span>
                     <div className="flex items-center gap-1 text-[9px] text-green-400 font-black">
                        <CheckCircle size={10} /> جاهز
                     </div>
                  </div>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-700 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-inner">
                <ArrowLeft size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* المهام اليومية (مبسطة وأنيقة) */}
      <section className="bg-white/5 rounded-[45px] border border-white/5 p-8 space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-widest">
               <Target size={20} className="text-cyan-400" /> مهام الأبطال
            </h3>
            <span className="text-[10px] font-black text-yellow-500 bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">تتجدد يومياً</span>
         </div>
         <div className="space-y-4">
            {user.dailyQuests.map(quest => (
              <div key={quest.id} className="flex items-center justify-between p-4 bg-black/20 rounded-3xl border border-white/5 group hover:border-cyan-500/30 transition-all">
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quest.isCompleted ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'bg-slate-800 text-slate-500'}`}>
                       {quest.isCompleted ? <CheckCircle size={20} /> : <BookOpen size={20} />}
                    </div>
                    <span className={`text-xs font-black ${quest.isCompleted ? 'text-green-400 line-through opacity-50' : 'text-white'}`}>{quest.title}</span>
                 </div>
                 <span className="text-[10px] font-black text-cyan-400">+{quest.reward} XP</span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};
