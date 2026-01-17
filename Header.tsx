
import React from 'react';
import { Zap, Target, Star } from 'lucide-react';
import { User } from './types';

interface HeaderProps {
  user: User;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex-shrink-0 h-20 px-6 flex justify-between items-center bg-[#0A0A1A]/90 backdrop-blur-xl border-b border-white/5 z-[60]">
      <div className="flex items-center gap-3">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
          <img src={user.avatar} className="relative w-10 h-10 rounded-full border-2 border-cyan-500 p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0A0A1A] flex items-center justify-center">
            <Zap size={8} className="text-white fill-white" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-black text-white tracking-tighter">أزهرت</h1>
          <p className="text-[8px] text-cyan-400 font-black uppercase tracking-[0.2em]">{user.track}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 text-slate-400 hover:text-white transition-all active:scale-90">
          <Target size={20} />
        </button>
        <button className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 text-slate-400 hover:text-white transition-all active:scale-90">
          <Star size={20} />
        </button>
      </div>
    </header>
  );
};
