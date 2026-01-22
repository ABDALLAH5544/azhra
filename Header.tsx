
import React from 'react';
import { Zap, Flame, Crown, Star, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { User } from './types';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const levelNum = Math.floor(Math.sqrt(user.points / 50)) + 1;
  
  const getRankData = () => {
    if (user.points > 10000) return { label: 'إمبراطور', color: 'from-yellow-400 to-amber-600', glow: 'shadow-yellow-500/40', icon: Crown };
    if (user.points > 5000) return { label: 'أسطورة', color: 'from-purple-500 to-indigo-600', glow: 'shadow-purple-500/40', icon: Trophy };
    if (user.points > 1000) return { label: 'فارس', color: 'from-slate-200 to-slate-400', glow: 'shadow-slate-400/40', icon: ShieldCheck };
    return { label: 'بطل', color: 'from-cyan-400 to-blue-600', glow: 'shadow-cyan-500/40', icon: Star };
  };

  const rank = getRankData();

  return (
    <header className="flex-shrink-0 h-24 px-4 flex justify-between items-center z-[150] sticky top-0">
      {/* HUD Glass Backdrop with Artistic Blur */}
      <div className="absolute inset-0 bg-[#010103]/40 backdrop-blur-2xl border-b border-white/5 -z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      {/* Right: Avatar & Identity with Rank Aura */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {/* Rank Aura Animation */}
          <div className={`absolute -inset-1 bg-gradient-to-tr ${rank.color} rounded-2xl blur-lg opacity-30 animate-pulse`}></div>
          <div className="relative p-0.5 rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
            <img 
              src={user.avatar} 
              className="w-12 h-12 rounded-xl object-cover" 
              alt="Hero"
            />
            {/* Energy Scanning Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-full w-full -translate-y-full animate-[scan_3s_linear_infinite]"></div>
          </div>
          <div className={`absolute -bottom-1 -right-1 bg-gradient-to-tr ${rank.color} p-1 rounded-lg border border-[#010103] shadow-lg`}>
            <rank.icon size={10} className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-black text-white tracking-tight leading-none glow-text">
              {user.name.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
             <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full bg-gradient-to-r ${rank.color} transition-all duration-1000`} style={{ width: `${Math.min(100, (user.points % 500) / 5)}%` }}></div>
             </div>
             <span className="text-[7px] font-black text-cyan-400/60 tracking-widest uppercase">LVL {levelNum}</span>
          </div>
        </div>
      </div>

      {/* Left: Interactive Stats Crystals */}
      <div className="flex items-center gap-2.5">
        <div className="relative group flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/5 shadow-inner transition-all hover:bg-white/10">
          <Flame size={14} className="text-orange-500 fill-orange-500 animate-float-small" />
          <span className="text-[11px] font-black text-orange-400 tabular-nums">{user.streak}</span>
        </div>

        <div className="relative group flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/5 shadow-inner transition-all hover:bg-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Zap size={14} className="text-cyan-400 fill-cyan-400 animate-pulse" />
          <span className="text-[11px] font-black text-cyan-400 tabular-nums">{user.points.toLocaleString()}</span>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </header>
  );
};
