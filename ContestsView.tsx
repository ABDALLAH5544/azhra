
import React from 'react';
import { Swords, Trophy, Crown, ArrowRight, Zap, Target, Star, Timer, Gift, Users, Flame } from 'lucide-react';
import { View } from './types';

interface ContestsViewProps {
  setView: (v: View) => void;
}

export const ContestsView: React.FC<ContestsViewProps> = ({ setView }) => {
  const activeContests = [
    {
      id: 'c1',
      title: 'دوري العباقرة الأسبوعي',
      reward: '5000 نقطة + وسام النخبة',
      participants: 1240,
      timeLeft: '04:12:05',
      color: 'from-blue-600 to-cyan-500',
      icon: Trophy
    },
    {
      id: 'c2',
      title: 'مبارزة النحو السريعة',
      reward: '1500 نقطة',
      participants: 450,
      timeLeft: '00:45:00',
      color: 'from-purple-600 to-pink-600',
      icon: Swords
    },
    {
      id: 'c3',
      title: 'تحدي الفيزياء المستحيل',
      reward: '3000 نقطة + خصم 50% اشتراك',
      participants: 890,
      timeLeft: '12:00:00',
      color: 'from-orange-600 to-red-600',
      icon: Flame
    }
  ];

  return (
    <div className="min-h-full bg-[#030308] pb-32 animate-in slide-in-from-left duration-700 overflow-x-hidden">
      
      {/* Cinematic Hero Header */}
      <section className="relative h-[400px] flex flex-col items-center justify-center p-8 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.15)_0%,_transparent_70%)] -z-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-20"></div>
        
        <button 
          onClick={() => setView('home')}
          className="absolute top-10 right-6 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all z-50"
        >
          <ArrowRight size={24} />
        </button>

        <div className="space-y-4 relative z-10 pt-10">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-3xl shadow-2xl">
            <Crown size={18} className="text-yellow-500 animate-bounce" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">ساحات المجد</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">بطولات <span className="text-cyan-400">أزهرت</span></h2>
          <p className="text-slate-400 text-xs font-bold leading-relaxed max-w-xs mx-auto">أثبت جدارتك التعليمية، تصدر الترتيب، واحصد الجوائز الكبرى في أقوى المسابقات التعليمية.</p>
        </div>
      </section>

      {/* Contests List */}
      <section className="px-6 space-y-8 -mt-16 relative z-20">
        <div className="flex items-center gap-4 mb-4 px-2">
           <Zap size={16} className="text-cyan-400" />
           <h3 className="text-sm font-black text-white uppercase tracking-widest">المسابقات النشطة الآن</h3>
        </div>

        {activeContests.map((contest, idx) => (
          <div 
            key={contest.id}
            className="group relative bg-[#0A0A1F]/80 backdrop-blur-2xl p-8 rounded-[45px] border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all hover:bg-slate-900/90"
          >
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${contest.color}`}></div>
            
            <div className="flex justify-between items-start mb-8">
               <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${contest.color} flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                     <contest.icon size={32} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-white tracking-tight">{contest.title}</h4>
                     <div className="flex items-center gap-2">
                        <Users size={12} className="text-slate-500" />
                        <span className="text-[10px] text-slate-500 font-bold uppercase">{contest.participants.toLocaleString()} بطل يشارك</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-white/5 p-4 rounded-3xl border border-white/5 text-center space-y-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">الجائزة</span>
                  <p className="text-xs font-black text-cyan-400">{contest.reward}</p>
               </div>
               <div className="bg-white/5 p-4 rounded-3xl border border-white/5 text-center space-y-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">الوقت المتبقي</span>
                  <p className="text-xs font-black text-white flex items-center justify-center gap-2">
                    <Timer size={12} className="text-pink-500" />
                    {contest.timeLeft}
                  </p>
               </div>
            </div>

            <button className={`w-full py-5 rounded-[28px] bg-gradient-to-r ${contest.color} text-white font-black text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3`}>
               انضم للمعركة <Swords size={18} />
            </button>
          </div>
        ))}
      </section>

      {/* Hall of Fame Preview */}
      <section className="mt-16 px-6">
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-10 rounded-[50px] border border-yellow-500/20 text-center space-y-6">
           <Gift size={48} className="text-yellow-500 mx-auto drop-shadow-lg" />
           <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">جوائز المبدعين</h4>
              <p className="text-xs text-slate-400 font-bold leading-relaxed px-4">أفضل 10 متسابقين يحصلون على اشتراكات مجانية وجوائز نقدية في نهاية كل شهر.</p>
           </div>
           <button className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] border-b border-yellow-500/20 pb-1">عرض قائمة الجوائز</button>
        </div>
      </section>

    </div>
  );
};
