
import React from 'react';
import { Home, BookOpen, MessageSquare, Trophy, User as UserIcon, Zap } from 'lucide-react';
import { View } from './types';

interface NavbarProps {
  activeView: View;
  setView: (v: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setView }) => {
  // الترتيب الصارم من اليمين (الرئيسية) إلى اليسار (حسابي)
  const tabs = [
    { id: 'home', icon: Home, label: 'الرئيسية', color: 'text-cyan-400', glow: 'rgba(34, 211, 238, 0.5)' },
    { id: 'learn', icon: BookOpen, label: 'أتعلم', color: 'text-blue-400', glow: 'rgba(59, 130, 246, 0.5)' },
    { id: 'community', icon: MessageSquare, label: 'المجتمع', color: 'text-purple-400', glow: 'rgba(168, 85, 247, 0.5)' },
    { id: 'leaderboard', icon: Trophy, label: 'الأوائل', color: 'text-yellow-400', glow: 'rgba(234, 179, 8, 0.5)' },
    { id: 'profile', icon: UserIcon, label: 'حسابي', color: 'text-pink-400', glow: 'rgba(244, 63, 94, 0.5)' },
  ];

  const activeIndex = tabs.findIndex(t => t.id === activeView);
  const activeTab = tabs[activeIndex] || tabs[0];

  return (
    <div className="fixed bottom-6 inset-x-4 z-[200] pointer-events-none">
      {/* Container with shadow reflection */}
      <nav className="relative h-20 bg-[#0A0A1F]/80 backdrop-blur-3xl rounded-[32px] border border-white/10 flex justify-around items-center px-1 shadow-[0_25px_60px_rgba(0,0,0,0.9)] pointer-events-auto overflow-visible">
        
        {/* The Animated Glow Slider (Artistic Magnetic Effect) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-14 bg-white/[0.03] border border-white/10 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ 
            width: `${100 / tabs.length - 4}%`,
            right: `${(activeIndex * (100 / tabs.length)) + 2}%`,
            boxShadow: `0 0 40px ${activeTab.glow}`
          }}
        >
          {/* Subtle top reflection */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/20 blur-sm"></div>
        </div>

        {/* Action Buttons */}
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          
          return (
            <button 
              key={tab.id} 
              onClick={() => setView(tab.id as View)} 
              className={`relative z-10 flex flex-col items-center justify-center w-full h-full transition-all duration-500`}
            >
              <div className={`p-2 transition-all duration-500 ${isActive ? 'scale-125 -translate-y-3' : 'opacity-40 grayscale'}`}>
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 1.5} 
                  className={`transition-all duration-500 ${isActive ? tab.color : 'text-slate-400'}`}
                />
                
                {/* Magnetic Energy Indicator */}
                {isActive && (
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-ping ${tab.color.replace('text', 'bg')}`}></div>
                )}
              </div>

              {/* Label that fades in when active */}
              <span 
                className={`text-[9px] font-black uppercase tracking-tighter absolute bottom-2 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 ' + tab.color : 'opacity-0 translate-y-2'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
      
      {/* Bottom Floating Reflection Shadow */}
      <div className="absolute -bottom-2 inset-x-10 h-1 bg-cyan-500/20 blur-xl opacity-50 rounded-full"></div>
    </div>
  );
};
