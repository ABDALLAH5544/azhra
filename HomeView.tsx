
import React from 'react';
import { Sparkles, Flame, Trophy, Star, Zap, Crown, ArrowLeft, ChevronLeft, Calendar, BookOpen, Clock, Swords, ShieldAlert } from 'lucide-react';
import { User, Subject, View } from './types';
import { CURRICULUM } from './constants';

interface HomeViewProps {
  user: User;
  onSubjectSelect: (subject: Subject) => void;
  setView: (v: View) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ user, onSubjectSelect, setView }) => {
  const userSubjects = CURRICULUM.filter(s => s.track.includes(user.track));

  return (
    <div className="p-6 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 overflow-x-hidden">
      
      {/* 1. Luxurious Header Section */}
      <section className="flex justify-between items-center py-4 relative">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 mb-1">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">أنت متصل الآن</p>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight">يا أهلاً، {user.name.split(' ')[0]} 👋</h2>
        </div>
        <div className="relative">
           <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-20"></div>
           <button 
            onClick={() => setView('profile')}
            className="relative w-14 h-14 rounded-2xl border border-white/10 p-1 bg-slate-900 shadow-2xl active:scale-90 transition-transform"
           >
              <img src={user.avatar} className="w-full h-full rounded-xl object-cover" alt="Profile" />
           </button>
        </div>
      </section>

      {/* 2. Eye-Friendly Progress Card (The Throne Card) */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[45px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative bg-[#0F0F2D]/60 backdrop-blur-3xl p-8 rounded-[45px] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] translate-x-10 -translate-y-10"></div>
          
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-1">
              <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.4em]">مستواك الإمبراطوري</p>
              <div className="flex items-baseline gap-2">
                 <h3 className="text-5xl font-black text-white">25</h3>
                 <span className="text-xs font-bold text-slate-500">LEVEL</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/5 rounded-[22px] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-all duration-500">
              <Trophy className="text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" size={32} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-1">
               <span className="text-slate-500">التقدم للمستوى 26</span>
               <span className="text-cyan-400">72%</span>
            </div>
            <div className="relative h-3 w-full bg-black/40 rounded-full p-0.5 border border-white/5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-1000" 
                style={{ width: '72%' }}
              ></div>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/5">
               <Clock size={12} className="text-cyan-500" />
               باقي لك 250 نقطة لتصدر الأوائل هذا الأسبوع
            </div>
          </div>
        </div>
      </section>

      {/* 3. Daily Pulse (Stats) */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'سلسلة', value: user.streak, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/5' },
          { label: 'نقاط', value: user.points, icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/5' },
          { label: 'الرتبة', value: `#${user.rank}`, icon: Crown, color: 'text-purple-500', bg: 'bg-purple-500/5' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-[35px] border border-white/5 flex flex-col items-center gap-3 transition-all active:scale-95 shadow-lg backdrop-blur-sm ${stat.bg} hover:border-white/10`}>
            <div className={`p-2.5 rounded-xl bg-black/20 ${stat.color}`}>
               <stat.icon size={18} strokeWidth={2.5} />
            </div>
            <div className="text-center">
               <p className="text-lg font-black text-white">{stat.value}</p>
               <p className="text-[8px] text-slate-600 font-black uppercase tracking-tighter mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Imperial Journey (Subject Grid) */}
      <section className="space-y-8">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
             <h3 className="text-2xl font-black text-white tracking-tight">بوابات العلم</h3>
             <p className="text-[10px] text-slate-500 font-bold">اختر المادة التي تود غزوها اليوم</p>
          </div>
          <button 
            onClick={() => setView('learn')} 
            className="group flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-400/5 px-4 py-2 rounded-2xl border border-cyan-400/10 hover:bg-cyan-400/10 transition-all"
          >
            عرض الكل <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {userSubjects.slice(0, 3).map((subject, idx) => (
            <div 
              key={subject.id} 
              onClick={() => onSubjectSelect(subject)}
              className="relative bg-[#0A0A1F] p-6 rounded-[40px] border border-white/5 active:scale-95 transition-all group hover:bg-slate-900 shadow-xl overflow-hidden cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
                  {subject.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors tracking-tight leading-tight">{subject.title}</h4>
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{subject.units.length} وحدات</span>
                     <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                     <span className="text-[9px] text-cyan-500/70 font-black uppercase tracking-widest">مستعد؟</span>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-[20px] bg-white/5 flex items-center justify-center text-slate-800 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI Intelligence Advisor (Floating Glass) */}
      <div 
        onClick={() => setView('community')}
        className="relative group cursor-pointer"
      >
         <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[40px] blur opacity-40 group-hover:opacity-100 transition duration-700"></div>
         <div className="relative bg-[#121230]/40 backdrop-blur-2xl border border-cyan-500/20 p-8 rounded-[40px] flex items-center gap-6 shadow-2xl transition-all group-hover:border-cyan-500/40">
           <div className="relative w-16 h-16 bg-black rounded-3xl flex items-center justify-center flex-shrink-0 border border-cyan-500/30 overflow-hidden">
             <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
             <Sparkles size={32} className="text-cyan-400 fill-cyan-400 relative z-10 animate-bounce" />
           </div>
           <div className="space-y-2">
             <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">AZHRT AI</span>
                <span className="text-[8px] bg-cyan-400 text-black px-2 py-0.5 rounded-full font-black">ACTIVE</span>
             </div>
             <p className="text-[12px] text-white/90 font-bold leading-relaxed italic">"هل لديك سؤال في المنهج؟ اضغط هنا لنتحدث فوراً وبذكاء خارق!"</p>
           </div>
         </div>
      </div>

      {/* 6. NEW: Imperial Contests Section (JABARA) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
             <h3 className="text-2xl font-black text-white tracking-tight">ساحات المعركة</h3>
             <p className="text-[10px] text-slate-500 font-bold">تحدى زملاءك واكسب جوائز إمبراطورية</p>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[40px] blur opacity-10 group-hover:opacity-30 transition-opacity"></div>
           <div className="relative bg-[#0A0A1F] p-8 rounded-[40px] border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-inner">
                       <Swords size={28} />
                    </div>
                    <div>
                       <h4 className="text-lg font-black text-white tracking-tight leading-none">ماراثون الجمعة الأكبر</h4>
                       <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest">جائزة 10,000 نقطة</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="block text-[10px] font-black text-pink-500 uppercase tracking-tighter mb-1">ينتهي في</span>
                    <span className="text-xs font-black text-white bg-white/5 px-3 py-1 rounded-lg">02:45:12</span>
                 </div>
              </div>
              
              <button 
                onClick={() => setView('contests')}
                className="w-full py-5 rounded-[25px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-sm shadow-xl shadow-purple-900/20 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn"
              >
                دخول ساحة المنافسة
                <ChevronLeft size={18} className="group-hover/btn:-translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>

      {/* 7. Footer Decorative Info */}
      <div className="bg-gradient-to-b from-slate-900/20 to-transparent p-10 text-center space-y-3 opacity-30">
         <ShieldAlert size={20} className="mx-auto text-slate-500" />
         <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em]">أزهرت - بروتوكول المجد v3.5</p>
      </div>

    </div>
  );
};
