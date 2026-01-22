
import React, { useState, useEffect } from 'react';
import { 
  X, Trophy, Play, Brain, ZapIcon, Swords, Clock, Award, ChevronLeft, Sparkles 
} from 'lucide-react';
// Fixed Error: Removed non-existent and unused Notification export/member
import { User, View } from './types';

interface GamesViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setView: (v: View) => void;
}

// --- Memory Game Component ---
const MemoryGame = ({ onWin, onCancel }: { onWin: (pts: number) => void, onCancel: () => void }) => {
  const icons = ['🧪', '🧬', '📐', '🏺', '📖', '🕯️'];
  const [cards, setCards] = useState<{ id: number, emoji: string, isFlipped: boolean, isMatched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, isFlipped: false, isMatched: false }));
    setCards(deck);
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || cards[id].isMatched || cards[id].isFlipped) return;
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlipped([]);
        if (newCards.every(c => c.isMatched)) onWin(100);
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#030308] p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-8 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center text-white">
          <button onClick={onCancel} className="p-3 rounded-2xl bg-white/5"><X size={24} /></button>
          <div className="text-center">
            <h3 className="text-xl font-black">أحجية الذاكرة</h3>
            <p className="text-[10px] text-cyan-400">عدد الحركات: {moves}</p>
          </div>
          <div className="w-10"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {cards.map(card => (
            <button 
              key={card.id} 
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-[25px] flex items-center justify-center text-3xl transition-all duration-500 shadow-2xl ${card.isFlipped || card.isMatched ? 'bg-cyan-500 rotate-y-180' : 'bg-[#0A0A1F] border border-white/10'}`}
            >
              {(card.isFlipped || card.isMatched) ? card.emoji : <Sparkles size={24} className="text-white/10" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Speed Click Game Component ---
const SpeedGame = ({ onWin, onCancel }: { onWin: (pts: number) => void, onCancel: () => void }) => {
  const [pos, setPos] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);

  useEffect(() => {
    if (time <= 0) {
      if (score >= 10) onWin(score * 10);
      else onCancel();
      return;
    }
    const t = setInterval(() => setTime(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [time]);

  const jump = () => {
    setScore(s => s + 1);
    setPos({ 
      top: `${Math.random() * 70 + 15}%`, 
      left: `${Math.random() * 70 + 15}%` 
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#030308] p-8 flex flex-col items-center">
      <div className="w-full flex justify-between items-center text-white mb-20">
        <button onClick={onCancel} className="p-3 rounded-2xl bg-white/5"><X size={24} /></button>
        <div className="text-center">
          <h3 className="text-xl font-black">إمبراطور السرعة</h3>
          <p className="text-2xl text-yellow-500">{time}s</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 font-bold">النقاط</p>
          <p className="text-xl font-black">{score}</p>
        </div>
      </div>
      <div className="relative w-full h-[60vh] border border-white/5 rounded-[50px] overflow-hidden">
        <button 
          onClick={jump}
          style={{ top: pos.top, left: pos.left }}
          className="absolute w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-100 -translate-x-1/2 -translate-y-1/2 animate-bounce"
        >
          ⚡
        </button>
      </div>
      <p className="mt-8 text-slate-500 text-[10px] font-bold">المطلوب: 10 نقرات للفوز!</p>
    </div>
  );
};

export const GamesView: React.FC<GamesViewProps> = ({ user, setUser, setView }) => {
  const [activeMiniGame, setActiveMiniGame] = useState<string | null>(null);

  const imperialGames = [
    { id: 'memory', title: 'أحجية الذاكرة', desc: 'طابق المفاهيم لتقوية ذكائك.', icon: Brain, color: 'from-blue-600 to-cyan-500' },
    { id: 'speed', title: 'إمبراطور السرعة', desc: 'تحدى الزمن في سرعة النقر.', icon: ZapIcon, color: 'from-purple-600 to-pink-600' },
    { id: 'duel', title: 'مبارزة العباقرة', desc: 'تحدى الأبطال في أسئلة المنهج.', icon: Swords, color: 'from-orange-600 to-yellow-600' },
  ];

  const handleGameWin = (points: number) => {
    setUser(prev => prev ? ({ ...prev, points: prev.points + points }) : null);
    setActiveMiniGame(null);
  };

  if (activeMiniGame === 'memory') return <MemoryGame onWin={handleGameWin} onCancel={() => setActiveMiniGame(null)} />;
  if (activeMiniGame === 'speed') return <SpeedGame onWin={handleGameWin} onCancel={() => setActiveMiniGame(null)} />;

  return (
    <div className="min-h-full bg-[#030308] pb-32 animate-in fade-in duration-700 overflow-x-hidden">
      <div className="p-8 space-y-10">
        <header className="flex items-center justify-between">
          <button onClick={() => setView('home')} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all">
            <ChevronLeft size={24} className="rotate-180" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">إمبراطورية <span className="text-cyan-400">الألعاب</span></h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">ساحة التحدي الكبرى</p>
          </div>
          <div className="w-12"></div>
        </header>

        <section className="relative overflow-hidden bg-gradient-to-br from-[#121230] to-black p-10 rounded-[50px] border border-white/10 text-center space-y-4 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full"></div>
          <Trophy size={54} className="text-yellow-500 mx-auto animate-bounce drop-shadow-[0_0_20px_#eab308]" />
          <h3 className="text-xl font-black text-white italic">العب.. اربح.. تصدر!</h3>
          <div className="bg-white/5 px-4 py-2 rounded-full inline-block border border-white/5 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
            {user.points.toLocaleString()} نقطة مجد حالياً
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6">
          {imperialGames.map(game => (
            <div 
              key={game.id}
              onClick={() => setActiveMiniGame(game.id)}
              className="relative group cursor-pointer bg-[#0A0A1F] p-6 rounded-[40px] border border-white/5 hover:border-cyan-500/30 transition-all shadow-2xl flex flex-col items-center text-center space-y-4 overflow-hidden active:scale-95"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${game.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform`}>
                <game.icon size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">{game.title}</h4>
                <p className="text-[8px] text-slate-500 font-bold line-clamp-1">{game.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-[8px] font-black text-cyan-400 uppercase tracking-widest pt-2">
                <Play size={10} fill="currentColor" /> العب الآن
              </div>
            </div>
          ))}
          
          <div className="bg-[#0A0A1F]/40 border border-white/5 rounded-[40px] flex flex-col items-center justify-center p-6 grayscale opacity-40">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 mb-4">
              <Clock size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase">قريباً</p>
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-[40px] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500"><Award size={24} /></div>
            <div>
              <h4 className="text-xs font-black text-white">متجر الجوائز</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">استبدل نقاطك بأوسمة نادرة</p>
            </div>
          </div>
          <ChevronLeft size={20} className="text-slate-800" />
        </div>
      </div>
    </div>
  );
};
