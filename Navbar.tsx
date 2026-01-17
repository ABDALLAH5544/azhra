
import React from 'react';
import { Home, BookOpen, MessageSquare, Trophy, User as UserIcon } from 'lucide-react';
import { View } from './types';

interface NavbarProps {
  activeView: View;
  setView: (v: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setView }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'learn', icon: BookOpen, label: 'الدروس' },
    { id: 'community', icon: MessageSquare, label: 'المجتمع' },
    { id: 'leaderboard', icon: Trophy, label: 'الأوائل' },
    { id: 'profile', icon: UserIcon, label: 'حسابي' },
  ];

  return (
    <nav className="flex-shrink-0 h-22 bg-[#0A0A1A]/95 backdrop-blur-3xl border-t border-white/5 flex justify-around items-center px-4 z-[60] pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;
        return (
          <button 
            key={tab.id} 
            onClick={() => setView(tab.id as View)} 
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <div className={`p-2.5 rounded-2xl transition-all ${isActive ? 'bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.1)] scale-110' : ''}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-60'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
