
import React, { useMemo } from 'react';
import { 
  Trophy, Crown, Star, Zap, ShieldCheck, Sparkles, 
  Sword, ChevronUp, Medal, Target, TrendingUp, Flame, ArrowUpRight, ChevronLeft
} from 'lucide-react';
import { User, View } from './types';
import { getAllUsers } from './database';

interface LeaderboardViewProps {
  currentUser: User;
  setView: (v: View) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentUser, setView }) => {
  const sortedChampions = useMemo(() => {
    return getAllUsers();
  }, []);

  const userRank = sortedChampions.findIndex(u => u.phone === currentUser.phone) + 1;
  const playerAbove = userRank > 1 ? sortedChampions[userRank - 2] : null;
  const pointsToNext = playerAbove ? playerAbove.points - currentUser.points : 0;

  const podium = sortedChampions.slice(0, 3);
  const others = sortedChampions.slice(3);

  const getRankBadge = (rank: number) => {
    if (rank <= 5) return <div className="bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-md text-[7px] font-black border border-yellow-500/20">نخبة</div>;
    if (rank <= 10) return <div className="bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded-md text-[7px] font-black border border-cyan-500/20">فارس</div>;
    return <div className="bg-slate-500/10 text-slate-500 px-2 py-0.5 rounded-md text-[7px] font-black border border-slate-500/20">مقاتل</div>;
  };

  return (
    <div className="relative min-h-full bg-[#030308] pb-56 animate-in fade-in duration-1000 overflow-x-hidden no-scrollbar">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(circle_at_center,_#22d3ee15_0%,_transparent_70%)] blur-[120px]"></div>
        <div className="absolute top-20 right-[-10%] w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-12 pb-4 px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 mb-6 backdrop-blur-xl">
          <Sparkles size={14} className="text-yellow-500 animate-pulse" />
          <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">قاعة أساطير أزهرت</span>
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter mb-2">أباطرة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">المجد</span></h2>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em] opacity-60">المعركة تشتعل بين {sortedChampions.length} بطلاً</p>
      </section>

      {/* Podium Visualization */}
      <section className="relative h-[450px] px-4 flex items-end justify-center gap-1 z-20 mb-10">
        
        {/* Rank 2 - Silver */}
        <div className="flex flex-col items-center w-[30%] animate-in slide-in-from-right-20 duration-1000 delay-200">
           <div className="relative mb-6">
              <div className="p-1 rounded-[28px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-2xl relative z-10">
                <img src={podium[1]?.avatar} className="w-20 h-20 rounded-[24px] border-2 border-[#030308] bg-black object-cover" alt="Silver" />
              </div>
              <div className="absolute -top-3 -right-3 w-9 h-9 bg-slate-200 text-black flex items-center justify-center rounded-2xl font-black text-sm shadow-xl z-20 border-2 border-[#030308]">٢</div>
           </div>
           <div className="w-full bg-[#0A0A1F]/60 backdrop-blur-xl border-t border-x border-white/10 rounded-t-[35px] p-5 text-center h-36 flex flex-col justify-start">
              <p className="text-[10px] font-black text-white truncate mb-2">{podium[1]?.name.split(' ')[0]}</p>
              <div className="flex items-center justify-center gap-1.5 text-cyan-400">
                 <Zap size={12} fill="currentColor" />
                 <span className="text-lg font-black">{podium[1]?.points.toLocaleString()}</span>
              </div>
           </div>
        </div>

        {/* Rank 1 - Emperor (Gold) */}
        <div className="flex flex-col items-center w-[40%] z-30 animate-in zoom-in duration-1000">
           <div className="relative mb-8 group">
              <div className="absolute -inset-10 bg-yellow-500/20 blur-[50px] rounded-full animate-pulse"></div>
              <Crown size={54} className="absolute -top-16 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow-[0_0_20px_#eab308] animate-bounce" />
              <div className="p-1.5 rounded-[40px] bg-gradient-to-b from-yellow-300 via-yellow-600 to-orange-800 shadow-[0_0_60px_rgba(234,179,8,0.4)] relative z-10">
                <img src={podium[0]?.avatar} className="w-28 h-28 rounded-[32px] border-4 border-[#030308] bg-black object-cover" alt="Gold" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-5 py-1.5 rounded-full text-[9px] font-black shadow-2xl whitespace-nowrap tracking-widest z-20 uppercase border-2 border-[#030308]">الإمبراطور</div>
           </div>
           <div className="w-full bg-gradient-to-b from-yellow-500/10 via-[#0A0A1F]/80 to-transparent border-t border-x border-yellow-500/30 rounded-t-[45px] p-6 text-center backdrop-blur-2xl h-56 flex flex-col justify-start pt-8">
              <p className="text-sm font-black text-white truncate mb-2">{podium[0]?.name.split(' ')[0]}</p>
              <div className="flex items-center justify-center gap-2 text-yellow-500">
                 <Flame size={20} fill="currentColor" />
                 <span className="text-3xl font-black">{podium[0]?.points.toLocaleString()}</span>
              </div>
           </div>
        </div>

        {/* Rank 3 - Bronze */}
        <div className="flex flex-col items-center w-[30%] animate-in slide-in-from-left-20 duration-1000 delay-300">
           <div className="relative mb-6">
              <div className="p-1 rounded-[28px] bg-gradient-to-b from-orange-400 via-orange-600 to-orange-900 shadow-2xl relative z-10">
                <img src={podium[2]?.avatar} className="w-20 h-20 rounded-[24px] border-2 border-[#030308] bg-black object-cover" alt="Bronze" />
              </div>
              <div className="absolute -top-3 -right-3 w-9 h-9 bg-orange-600 text-white flex items-center justify-center rounded-2xl font-black text-sm shadow-xl z-20 border-2 border-[#030308]">٣</div>
           </div>
           <div className="w-full bg-[#0A0A1F]/60 backdrop-blur-xl border-t border-x border-white/10 rounded-t-[35px] p-5 text-center h-28 flex flex-col justify-start">
              <p className="text-[10px] font-black text-white truncate mb-2">{podium[2]?.name.split(' ')[0]}</p>
              <div className="flex items-center justify-center gap-1.5 text-orange-400">
                 <Medal size={12} />
                 <span className="text-lg font-black">{podium[2]?.points.toLocaleString()}</span>
              </div>
           </div>
        </div>
      </section>

      {/* The Imperial List (Rest of Champions) */}
      <section className="px-6 space-y-4 relative z-10 pb-20">
        <div className="flex items-center justify-between px-3 mb-6">
           <div className="flex items-center gap-3">
              <TrendingUp size={16} className="text-cyan-500" />
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">لوحة الشرف</h3>
           </div>
           <span className="text-[8px] font-black text-cyan-400/50 uppercase">المراكز ٤ - ٣٠</span>
        </div>

        {others.map((player, idx) => {
          const rank = idx + 4;
          const isCurrentUser = player.phone === currentUser.phone;
          
          return (
            <div 
              key={player.id} 
              className={`group p-5 rounded-[35px] border transition-all duration-500 flex items-center justify-between active:scale-[0.98] ${isCurrentUser ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.1)]' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-white/10'}`}
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-2xl bg-black/40 flex items-center justify-center font-black text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                   {rank}
                </div>
                <div className="relative">
                  <img src={player.avatar} className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-black group-hover:scale-110 transition-transform" alt={player.name} />
                  <div className="absolute -top-1 -right-1">
                    {rank <= 10 ? <ShieldCheck size={14} className="text-cyan-400 drop-shadow-[0_0_5px_#22d3ee]" /> : <Target size={14} className="text-slate-700" />}
                  </div>
                </div>
                <div className="text-right">
                   <h4 className={`text-sm font-black transition-colors ${isCurrentUser ? 'text-cyan-400' : 'text-white'}`}>{player.name}</h4>
                   <div className="flex items-center gap-2 mt-1">
                      {getRankBadge(rank)}
                      <span className="text-[8px] text-slate-600 font-bold uppercase">{player.level}</span>
                   </div>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 justify-end">
                   <span className="text-lg font-black text-white tracking-tighter">{player.points.toLocaleString()}</span>
                   <Zap size={14} className="text-cyan-500 fill-cyan-500/20" />
                </div>
                <p className="text-[7px] font-black text-slate-700 uppercase tracking-widest mt-1">XP GLORY</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Floating Personal Rank Card */}
      <section className="fixed bottom-28 inset-x-6 z-[150] animate-in slide-in-from-bottom-32 duration-1000">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-[45px] blur-xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative bg-[#0A0A1F]/90 backdrop-blur-3xl border border-white/20 p-6 rounded-[45px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                   <img src={currentUser.avatar} className="w-16 h-16 rounded-2xl border-2 border-white/20 bg-black object-cover" />
                   <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black w-8 h-8 rounded-xl border-4 border-[#0A0A1F] flex items-center justify-center shadow-xl">
                      <Sword size={14} strokeWidth={3} />
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">ترتيبك بين الأباطرة</p>
                   <h3 className="text-3xl font-black text-white tracking-tighter leading-none">المركز #{userRank}</h3>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-2xl font-black text-white">{currentUser.points.toLocaleString()}</span>
                  <Zap size={18} className="text-yellow-500 fill-yellow-500/20" />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 justify-end text-green-400">
                  <ChevronUp size={16} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    {pointsToNext > 0 ? `${pointsToNext} نقطة للمركز التالي` : 'أنت تحكم العرش!'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Dynamic Challenge Progress */}
            {pointsToNext > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-2">
                      تحدي القمة: <span className="text-white">{playerAbove?.name}</span>
                   </span>
                   <span className="text-[9px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md">
                      {(100 - Math.min(95, pointsToNext / 10)).toFixed(0)}%
                   </span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                   <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-1000" style={{ width: `${Math.max(10, 100 - (pointsToNext / 10))}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
