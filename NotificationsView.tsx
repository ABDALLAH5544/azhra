
import React, { useState } from 'react';
import { 
  Bell, ArrowRight, Zap, Trophy, MessageCircle, 
  UserPlus, Star, Trash2, CheckCheck, Clock, ShieldAlert
} from 'lucide-react';
import { View } from './types';

interface NotificationsViewProps {
  setView: (v: View) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ setView }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'social' | 'achievements'>('all');

  const [notifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'إنجاز جديد في خزينتك!',
      desc: 'لقد حصلت على وسام "دحيح النحو" لإكمالك الوحدة الأولى بنجاح.',
      time: 'الآن',
      icon: <Trophy className="text-yellow-500" />,
      isNew: true,
      color: 'bg-yellow-500/10'
    },
    {
      id: 2,
      type: 'social',
      title: 'طلب مصادقة جديد',
      desc: 'البطل "ياسين علي" يرغب في الانضمام إلى قائمة أصدقائك.',
      time: 'منذ ٥ دقائق',
      icon: <UserPlus className="text-cyan-400" />,
      isNew: true,
      color: 'bg-cyan-500/10'
    },
    {
      id: 3,
      type: 'system',
      title: 'مبارزة قادمة ⚔️',
      desc: 'ستبدأ مبارزة العباقرة الكبرى بعد ساعة من الآن. استعد!',
      time: 'منذ ٢٠ دقيقة',
      icon: <Zap className="text-purple-400" />,
      isNew: false,
      color: 'bg-purple-500/10'
    },
    {
      id: 4,
      type: 'social',
      title: 'رسالة خاصة جديدة',
      desc: 'مريم يوسف أرسلت لك رسالة: "هل يمكنك مساعدتي في مسألة الفيزياء؟"',
      time: 'منذ ساعة',
      icon: <MessageCircle className="text-green-400" />,
      isNew: false,
      color: 'bg-green-500/10'
    }
  ]);

  const filtered = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'social') return n.type === 'social';
    if (activeFilter === 'achievements') return n.type === 'achievement';
    return true;
  });

  return (
    <div className="relative min-h-full bg-[#030308] pb-40 animate-in fade-in slide-in-from-left duration-700 overflow-x-hidden no-scrollbar">
      
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-64 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl"></div>
      </div>

      <header className="relative pt-12 pb-6 px-8 z-10 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button onClick={() => setView('community')} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all">
               <ArrowRight size={24} className="rotate-180" />
            </button>
            <div className="text-right">
               <h2 className="text-3xl font-black text-white">التنبيهات</h2>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">أحدث أخبار الميدان</p>
            </div>
         </div>
         <button className="text-slate-500 hover:text-white transition-colors">
            <CheckCheck size={24} />
         </button>
      </header>

      {/* Filter Tabs */}
      <div className="px-8 mb-8 flex gap-3 overflow-x-auto no-scrollbar py-2">
         {[
           { id: 'all', label: 'الكل' },
           { id: 'social', label: 'اجتماعي' },
           { id: 'achievements', label: 'إنجازات' }
         ].map((f) => (
           <button 
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`flex-shrink-0 px-8 py-3 rounded-2xl text-[10px] font-black transition-all border ${activeFilter === f.id ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-500 border-white/5'}`}
           >
            {f.label}
           </button>
         ))}
      </div>

      <section className="px-8 space-y-4">
         {filtered.length > 0 ? filtered.map((notif, i) => (
           <div 
            key={notif.id} 
            className={`group relative p-6 rounded-[35px] border transition-all duration-500 flex items-start gap-5 animate-in slide-in-from-bottom-10 ${notif.isNew ? 'bg-white/[0.05] border-cyan-500/20 shadow-xl' : 'bg-white/[0.02] border-white/5 opacity-80'}`}
            style={{ animationDelay: `${i * 100}ms` }}
           >
              {notif.isNew && <div className="absolute top-6 left-6 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>}
              
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${notif.color} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                 {notif.icon}
              </div>

              <div className="flex-grow space-y-1">
                 <h4 className={`text-sm font-black ${notif.isNew ? 'text-white' : 'text-slate-300'}`}>{notif.title}</h4>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold">{notif.desc}</p>
                 <div className="flex items-center gap-2 pt-2 text-[8px] font-black text-slate-600 uppercase">
                    <Clock size={10} />
                    <span>{notif.time}</span>
                 </div>
              </div>
           </div>
         )) : (
           <div className="py-20 text-center space-y-6 opacity-30">
              <Bell size={64} className="mx-auto" />
              <p className="text-sm font-black text-white uppercase tracking-widest">لا توجد تنبيهات جديدة حالياً</p>
           </div>
         )}
      </section>

    </div>
  );
};
