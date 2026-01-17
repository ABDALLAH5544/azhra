
import React, { useRef } from 'react';
import { Trophy, Crown, Medal, Star, Flame, Zap, TrendingUp, Award, ChevronUp, ShieldCheck, Sparkles, Diamond, Sword, ArrowUpCircle } from 'lucide-react';
import { User, View } from './types';
import { LEADERBOARD_DATA } from './constants';

interface LeaderboardViewProps {
  currentUser: User;
  setView: (v: View) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentUser, setView }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generating extended data for 20 ranks
  const extendedData = [
    ...LEADERBOARD_DATA,
    { name: 'ليلى أحمد', points: 3400, avatar: 'https://picsum.photos/seed/p6/100', rank: 6 },
    { name: 'زياد حسن', points: 3200, avatar: 'https://picsum.photos/seed/p7/100', rank: 7 },
    { name: 'نور الدين', points: 3100, avatar: 'https://picsum.photos/seed/p8/100', rank: 8 },
    { name: 'فاطمة الزهراء', points: 2950, avatar: 'https://picsum.photos/seed/p9/100', rank: 9 },
    { name: 'عبد الرحمن', points: 2800, avatar: 'https://picsum.photos/seed/p10/100', rank: 10 },
    { name: 'خديجة محمد', points: 2650, avatar: 'https://picsum.photos/seed/p11/100', rank: 11 },
    { name: 'مصطفى محمود', points: 2500, avatar: 'https://picsum.photos/seed/p12/100', rank: 12 },
    { name: 'سلمى علي', points: 2400, avatar: 'https://picsum.photos/seed/p13/100', rank: 13 },
    { name: 'حمزة إدريس', points: 2300, avatar: 'https://picsum.photos/seed/p14/100', rank: 14 },
    { name: 'عائشة بكر', points: 2200, avatar: 'https://picsum.photos/seed/p15/100', rank: 15 },
    { name: 'ياسر عمار', points: 2100, avatar: 'https://picsum.photos/seed/p16/100', rank: 16 },
    { name: 'حبيبة وائل', points: 2000, avatar: 'https://picsum.photos/seed/p17/100', rank: 17 },
    { name: 'براء كمال', points: 1950, avatar: 'https://picsum.photos/seed/p18/100', rank: 18 },
    { name: 'ريم سعيد', points: 1800, avatar: 'https://picsum.photos/seed/p19/100', rank: 19 },
    { name: 'أنس جابر', points: 1700, avatar: 'https://picsum.photos/seed/p20/100', rank: 20 },
  ].sort((a, b) => b.points - a.points);

  const podium = extendedData.slice(0, 3);
  const royalGuard = extendedData.slice(3, 10);
  const eliteWarriors = extendedData.slice(10, 20);

  const playerAbove = extendedData.find(p => p.points > currentUser.points) || null;
  const pointsToNext = playerAbove ? playerAbove.points - currentUser.points : 0;

  return (
    <div className="relative min-h-full bg-[#030308] pb-12 animate-in fade-in duration-1000 overflow-x-hidden">
      
      {/* --- COSMIC BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[200%] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-cyan-600/5 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* --- PODIUM OF EMPERORS --- */}
      <section className="relative pt-12 pb-16 px-6">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-6 backdrop-blur-2xl shadow-2xl">
            <Sparkles size={14} className="text-yellow-500 animate-spin-slow" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">قاعة الخلود</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4">أباطرة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">أزهرت</span></h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
        </div>

        <div className="relative flex justify-center items-end gap-1 h-[360px] z-10">
          {/* Rank 2 */}
          <div className="flex flex-col items-center w-[30%] animate-in slide-in-from-right-20 duration-1000">
            <div className="relative mb-6">
               <div className="relative p-1 rounded-[22px] bg-gradient-to-b from-slate-200 to-slate-500 shadow-2xl">
                 <img src={podium[1]?.avatar} className="w-16 h-16 rounded-[19px] object-cover border-2 border-[#030308]" />
               </div>
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-950 p-1 rounded-lg font-black text-[10px] shadow-xl">٢</div>
            </div>
            <div className="w-full bg-white/5 border-t border-x border-white/10 rounded-t-3xl pt-6 pb-4 px-2 text-center backdrop-blur-md">
                <p className="text-[9px] font-black text-slate-400 truncate w-full">{podium[1]?.name}</p>
                <p className="text-sm font-black text-white mt-1">{podium[1]?.points.toLocaleString()}</p>
            </div>
          </div>

          {/* Rank 1 - THE SUPREME */}
          <div className="flex flex-col items-center w-[40%] z-20 -translate-y-8 animate-in zoom-in duration-1000">
            <div className="relative mb-8 group">
               <div className="absolute -inset-10 bg-yellow-500/10 blur-[50px] rounded-full animate-pulse"></div>
               <Crown size={54} className="absolute -top-16 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,1)] animate-bounce" />
               <div className="relative p-1.5 rounded-[35px] bg-gradient-to-b from-yellow-300 via-yellow-600 to-orange-800 shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-transform group-hover:scale-105 duration-500">
                 <img src={podium[0]?.avatar} className="w-24 h-24 rounded-[30px] object-cover border-[4px] border-[#030308]" />
               </div>
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-[8px] font-black shadow-2xl uppercase tracking-widest whitespace-nowrap">الإمبراطور الأكبر</div>
            </div>
            <div className="w-full h-44 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent rounded-t-[45px] border-t border-x border-yellow-500/20 backdrop-blur-xl flex flex-col items-center pt-8 text-center px-2 shadow-2xl">
                <p className="text-xs font-black text-white mb-1 truncate w-full">{podium[0]?.name}</p>
                <p className="text-2xl font-black text-yellow-500 leading-none">{podium[0]?.points.toLocaleString()}</p>
                <div className="flex gap-1 mt-4">
                   {[1,2,3,4,5].map(s => <Star key={s} size={8} className="text-yellow-500 fill-yellow-500" />)}
                </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center w-[30%] animate-in slide-in-from-left-20 duration-1000">
            <div className="relative mb-6">
               <div className="relative p-1 rounded-[22px] bg-gradient-to-b from-orange-500 to-orange-900 shadow-2xl">
                 <img src={podium[2]?.avatar} className="w-16 h-16 rounded-[19px] object-cover border-2 border-[#030308]" />
               </div>
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-700 text-white p-1 rounded-lg font-black text-[10px] shadow-xl">٣</div>
            </div>
            <div className="w-full bg-white/5 border-t border-x border-white/10 rounded-t-3xl pt-6 pb-4 px-2 text-center backdrop-blur-md">
                <p className="text-[9px] font-black text-orange-300 truncate w-full">{podium[2]?.name}</p>
                <p className="text-sm font-black text-white mt-1">{podium[2]?.points.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROYAL GUARD (4-10) --- */}
      <section className="px-6 mb-12">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-cyan-500/30"></div>
           <div className="flex items-center gap-2">
             <ShieldCheck size={14} className="text-cyan-400" />
             <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">الحرس الملكي</h3>
           </div>
           <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-cyan-500/30"></div>
        </div>

        <div className="space-y-3">
          {royalGuard.map((player) => (
            <div key={player.rank} className="group relative bg-[#0A0A1F] p-4 rounded-[25px] border border-white/5 hover:border-cyan-500/30 transition-all hover:translate-x-[-4px] shadow-xl flex items-center justify-between overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center font-black text-xs text-cyan-400">
                   {player.rank}
                </div>
                <div className="relative">
                  <img src={player.avatar} className="w-12 h-12 rounded-2xl object-cover border-2 border-white/10" />
                  <div className="absolute -top-1 -right-1 bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0A0A1F]">
                    <Zap size={8} className="text-white fill-white" />
                  </div>
                </div>
                <div>
                   <h4 className="text-sm font-black text-white">{player.name}</h4>
                   <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">حارس المعرفة المخلص</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-white leading-none">{player.points.toLocaleString()}</p>
                <span className="text-[7px] text-slate-700 font-black">X-POWER</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ELITE WARRIORS (11-20) --- */}
      <section className="px-6 mb-16">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-slate-800"></div>
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">محاربو النخبة</h3>
           <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {eliteWarriors.map((player) => (
            <div key={player.rank} className="flex items-center justify-between p-4 bg-slate-900/20 rounded-[20px] border border-white/5 hover:bg-slate-900/40 transition-colors group">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-700 group-hover:text-slate-500 w-5">#{player.rank}</span>
                <img src={player.avatar} className="w-10 h-10 rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                <h4 className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{player.name}</h4>
              </div>
              <p className="text-sm font-black text-slate-600 group-hover:text-cyan-400">{player.points.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- THE IMPERIAL SEAL (USER CARD AT THE FLOW END) --- */}
      <section className="px-6 pb-24">
        <div className="relative group p-[2px] rounded-[42px] bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
          <div className="relative bg-[#0F0F2D] p-8 rounded-[40px] overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] -translate-y-20 translate-x-20"></div>
            
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-5">
                   <div className="relative w-20 h-20 rounded-[30px] p-[2px] bg-white/10 group-hover:bg-cyan-400/50 transition-colors duration-500">
                      <img src={currentUser.avatar} className="w-full h-full rounded-[28px] object-cover border-4 border-[#0F0F2D]" />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-500 p-2 rounded-xl shadow-xl border-4 border-[#0F0F2D]">
                        <Sword size={16} className="text-slate-900" strokeWidth={3} />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">مقامك الإمبراطوري</span>
                      </div>
                      <h3 className="text-3xl font-black text-white">المركز #{currentUser.rank}</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{currentUser.level}</p>
                   </div>
                </div>
                
                <div className="text-right">
                  <div className="inline-block p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-2xl font-black text-white">{currentUser.points.toLocaleString()}</p>
                    <p className="text-[8px] text-slate-500 font-black uppercase text-center mt-1">نقطة مجد</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center px-1">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تقدمك للمركز التالي</span>
                   <span className="text-[10px] font-black text-green-400 uppercase tracking-tighter flex items-center gap-1">
                     <ChevronUp size={12} className="animate-bounce" />
                     {pointsToNext} نقطة تفصلك عن القمة
                   </span>
                 </div>
                 <div className="h-3 w-full bg-slate-800/50 rounded-full p-1 border border-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-1000" style={{ width: '74%' }}></div>
                 </div>
              </div>

              {/* ASPIRE TO THE TOP BUTTON - NOW NAVIGATES TO LEARN VIEW */}
              <button 
                onClick={() => setView('learn')}
                className="w-full group/btn relative mt-4 py-5 rounded-3xl overflow-hidden transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover/btn:from-cyan-400 group-hover/btn:to-blue-500 transition-colors"></div>
                <div className="absolute inset-0 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] animate-shimmer opacity-20"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <ArrowUpCircle size={20} className="text-white animate-bounce" />
                  <span className="text-sm font-black text-white uppercase tracking-[0.2em]">اطمح للقمة الآن</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
};
