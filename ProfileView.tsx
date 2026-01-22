
import React, { useState, useMemo, useEffect } from 'react';
import { 
  User as UserIcon, Settings, Share2, Globe, MessageCircle, Youtube, 
  Edit3, LogOut, Shield, Bell, CreditCard, ChevronLeft, 
  Facebook, Instagram, Send, Users, Sparkles, Award, Zap,
  Check, Camera, ArrowRight, Save, Phone, Lock, Eye, EyeOff,
  Trophy, Wallet, History, X, Medal, Star, ToggleLeft, ToggleRight
} from 'lucide-react';
import { User, View, Track, Achievement } from './types';
import { getAllUsers, updateGlobalUser } from './database';

interface ProfileViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setView: (v: View) => void;
  onLogout: () => void;
}

type ProfileSubView = 'main' | 'edit' | 'notifications' | 'security' | 'payments' | 'avatars' | 'achievements';

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, setView, onLogout }) => {
  const [subView, setSubView] = useState<ProfileSubView>('main');
  const [showPassword, setShowPassword] = useState(false);
  
  // States for Sub-views
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone || '');
  const [editPassword, setEditPassword] = useState(user.password || '');
  const [editTrack, setEditTrack] = useState<Track>(user.track);

  const [notifLessons, setNotifLessons] = useState(true);
  const [notifRank, setNotifRank] = useState(true);
  const [notifAds, setNotifAds] = useState(false);

  const socialLinks = [
    { name: 'قناتنا على يوتيوب', icon: Youtube, color: 'bg-red-500/10 text-red-500', label: 'YouTube', url: '#' },
    { name: 'جروب التليجرام', icon: Send, color: 'bg-blue-500/10 text-blue-400', label: 'Telegram', url: '#' },
    { name: 'مجتمع الواتساب', icon: MessageCircle, color: 'bg-green-500/10 text-green-400', label: 'WhatsApp', url: '#' },
    { name: 'صفحة فيسبوك', icon: Facebook, color: 'bg-blue-600/10 text-blue-600', label: 'Facebook', url: '#' },
    { name: 'إنستغرام الأبطال', icon: Instagram, color: 'bg-pink-500/10 text-pink-500', label: 'Instagram', url: '#' },
  ];

  const avatarPresets = useMemo(() => [
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Luna`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=King`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Hero`,
    `https://api.dicebear.com/7.x/bottts/svg?seed=azhrt`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Whiskers`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Sassy`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Pepper`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Ginger`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Cleo`,
    `https://api.dicebear.com/7.x/bottts/svg?seed=Scholar`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Misty`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar`,
    `https://api.dicebear.com/7.x/bottts/svg?seed=Warrior`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Sage`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Milo`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Leo`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Max`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Bella`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Lily`
  ], []);

  const dynamicRank = useMemo(() => {
    const sorted = getAllUsers();
    const idx = sorted.findIndex(u => u.phone === user.phone);
    return idx !== -1 ? idx + 1 : user.rank;
  }, [user.points, user.phone]);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name: editName, phone: editPhone, password: editPassword, track: editTrack };
    setUser(updatedUser);
    updateGlobalUser(updatedUser); 
    setSubView('main');
  };

  const handleAvatarChange = (url: string) => {
    const updatedUser = { ...user, avatar: url };
    setUser(updatedUser);
    updateGlobalUser(updatedUser); 
    setSubView('main');
  };

  const BackHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 mb-10 sticky top-0 bg-[#030308]/90 backdrop-blur-md py-4 z-50">
      <button onClick={() => setSubView('main')} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/5 shadow-xl transition-all active:scale-90">
        <ArrowRight size={24} className="rotate-180" />
      </button>
      <h2 className="text-2xl font-black text-white">{title}</h2>
    </div>
  );

  // --- SUB-VIEWS LOGIC ---

  if (subView === 'achievements') {
    return (
      <div className="min-h-full bg-[#030308] px-6 pb-24 animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar">
        <BackHeader title="أوسمة المجد" />
        <div className="grid grid-cols-1 gap-4">
           {user.achievements.map((ach) => (
             <div key={ach.id} className={`p-6 rounded-[35px] border flex items-center gap-6 transition-all ${ach.isUnlocked ? 'bg-[#0A0A1F] border-cyan-500/30' : 'bg-white/5 border-white/5 opacity-50'}`}>
                <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center text-3xl shadow-2xl ${ach.isUnlocked ? 'bg-cyan-500/10' : 'bg-slate-900'}`}>
                   {ach.icon}
                </div>
                <div>
                   <h4 className="text-sm font-black text-white">{ach.title}</h4>
                   <p className="text-[10px] text-slate-500 font-bold mt-1">{ach.description}</p>
                   {ach.isUnlocked && <span className="inline-block mt-2 text-[8px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">مكتمل ✅</span>}
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (subView === 'avatars') {
    return (
      <div className="fixed inset-0 z-[500] bg-[#030308] p-6 animate-in zoom-in duration-300 overflow-y-auto no-scrollbar pb-32">
        <div className="flex justify-between items-center mb-10">
           <button onClick={() => setSubView('main')} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"><X size={20} /></button>
           <h3 className="text-lg font-black text-white">اختر هويتك البصرية</h3>
           <div className="w-10"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           {avatarPresets.map((url, i) => (
             <button 
              key={i} 
              onClick={() => handleAvatarChange(url)}
              className={`p-4 rounded-[35px] border-2 transition-all flex flex-col items-center ${user.avatar === url ? 'bg-cyan-500/10 border-cyan-500' : 'bg-white/5 border-white/5'}`}
             >
                <img src={url} className="w-24 h-24 rounded-full bg-black/40 p-2" alt="Avatar" />
                <p className="mt-3 text-[9px] font-black text-white/50 uppercase">بطل {i + 1}</p>
             </button>
           ))}
        </div>
      </div>
    );
  }

  if (subView === 'notifications') {
    return (
      <div className="min-h-full bg-[#030308] px-6 pb-24 animate-in slide-in-from-right duration-500">
        <BackHeader title="إعدادات التنبيهات" />
        <div className="space-y-4">
           {[
             { label: 'تنبيهات الدروس الجديدة', state: notifLessons, setter: setNotifLessons, desc: 'كن أول من يعلم عند صدور محاضرة جديدة' },
             { label: 'تغيرات لوحة الأوائل', state: notifRank, setter: setNotifRank, desc: 'سنخبرك فوراً إذا حاول أحدهم تجاوز ترتيبك' },
             { label: 'العروض والمميزات', state: notifAds, setter: setNotifAds, desc: 'أخبار المسابقات والجوائز الحصرية' }
           ].map((item, i) => (
             <div key={i} className="bg-white/5 p-6 rounded-[30px] border border-white/10 flex items-center justify-between group">
                <div className="text-right">
                   <h4 className="text-white font-black text-sm">{item.label}</h4>
                   <p className="text-[10px] text-slate-500 font-bold mt-1">{item.desc}</p>
                </div>
                <button 
                  onClick={() => item.setter(!item.state)}
                  className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${item.state ? 'bg-cyan-500' : 'bg-slate-800'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-xl transition-all ${item.state ? 'translate-x-[-24px]' : 'translate-x-0'}`}></div>
                </button>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (subView === 'security') {
    return (
      <div className="min-h-full bg-[#030308] px-6 pb-24 animate-in slide-in-from-right duration-500">
        <BackHeader title="أمن العرش" />
        <div className="space-y-6 text-right">
           <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-[40px] border border-blue-500/20 flex flex-col items-center text-center gap-4">
              <Shield size={48} className="text-blue-400" />
              <h4 className="text-white font-black">حسابك محمي بنسبة 100%</h4>
              <p className="text-xs text-slate-400 leading-relaxed">تستخدم منصة أزهرت بروتوكولات تشفير عسكرية لحماية بياناتك ومسارك التعليمي.</p>
           </div>
           
           <button onClick={() => setSubView('edit')} className="w-full bg-white/5 p-6 rounded-[30px] border border-white/5 flex items-center justify-between group">
              <ChevronLeft size={20} className="text-slate-600 group-hover:text-white transition-colors" />
              <div className="flex items-center gap-4">
                 <span className="text-white font-bold">تغيير كلمة المرور</span>
                 <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400"><Lock size={20} /></div>
              </div>
           </button>
           
           <button className="w-full bg-white/5 p-6 rounded-[30px] border border-white/5 flex items-center justify-between group">
              <div className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">قريباً</div>
              <div className="flex items-center gap-4">
                 <span className="text-white font-bold">المصادقة الثنائية (2FA)</span>
                 <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400"><Smartphone size={20} /></div>
              </div>
           </button>
        </div>
      </div>
    );
  }

  if (subView === 'payments') {
    return (
      <div className="min-h-full bg-[#030308] px-6 pb-24 animate-in slide-in-from-right duration-500">
        <BackHeader title="الخزينة الملكية" />
        <div className="space-y-6 text-right">
           <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8 rounded-[40px] border border-yellow-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-500/5 blur-3xl rounded-full"></div>
              <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2">الرصيد المتاح</p>
              <div className="flex items-center justify-end gap-3">
                 <span className="text-xs text-slate-500 font-bold mt-4">جنية</span>
                 <h3 className="text-5xl font-black text-white">0.00</h3>
              </div>
              <button className="mt-6 w-full py-4 rounded-2xl bg-yellow-500 text-black font-black flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/20 active:scale-95 transition-all">
                 <Wallet size={18} /> شحن المحفظة
              </button>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center justify-end gap-2 px-2">
                 <h4 className="text-sm font-black text-white">سجل العمليات</h4>
                 <History size={16} className="text-slate-500" />
              </div>
              <div className="bg-white/5 p-10 rounded-[30px] border border-white/5 text-center">
                 <p className="text-xs text-slate-600 font-bold italic">لا توجد عمليات سابقة في خزينتك حتى الآن</p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (subView === 'edit') {
    return (
      <div className="min-h-full bg-[#030308] px-6 pb-24 animate-in slide-in-from-right duration-500">
        <BackHeader title="تعديل الحساب" />
        <div className="space-y-6 text-right">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 mr-2">الاسم الإمبراطوري</label>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-cyan-500 text-right font-bold" dir="rtl" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 mr-2">رقم الهاتف</label>
              <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-cyan-500 text-right font-bold" dir="rtl" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 mr-2">كلمة المرور الجديدة</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-cyan-500 text-right font-bold" dir="rtl" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
           </div>
           <button onClick={handleSaveProfile} className="w-full py-6 bg-cyan-500 text-black font-black rounded-3xl shadow-xl active:scale-95 transition-all mt-6">حفظ التغييرات</button>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW ---
  return (
    <div className="relative min-h-full bg-[#030308] pb-40 animate-in fade-in duration-700 overflow-x-hidden no-scrollbar">
      
      {/* Cinematic Header */}
      <section className="relative pt-12 pb-10 px-8 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[300px] bg-[radial-gradient(circle_at_center,_#22d3ee22_0%,_transparent_70%)] blur-[80px] -z-10"></div>
        
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative p-1.5 rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-transform hover:scale-105 duration-500">
            <img src={user.avatar} className="w-28 h-28 rounded-full border-4 border-[#030308] object-cover bg-black" />
            <button onClick={() => setSubView('avatars')} className="absolute bottom-0 right-0 bg-yellow-500 text-black p-2 rounded-2xl border-4 border-[#030308] shadow-xl active:scale-90"><Camera size={18} strokeWidth={3} /></button>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white tracking-tight mb-2">{user.name}</h2>
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] bg-cyan-400/10 px-4 py-1 rounded-full border border-cyan-400/20">{user.level}</span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] bg-blue-400/10 px-4 py-1 rounded-full border border-blue-400/20">{user.track}</span>
          </div>
          <p className="text-[10px] text-slate-500 font-bold flex items-center gap-2 mt-1"><Phone size={10} /> {user.phone}</p>
        </div>

        {/* Level Progress */}
        <div className="max-w-xs mx-auto space-y-3">
          <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">
            <span>مستوى {Math.floor(Math.sqrt(user.points / 50)) + 2}</span>
            <span className="text-white">{Math.floor((user.points % 500) / 5)}%</span>
            <span>مستوى {Math.floor(Math.sqrt(user.points / 50)) + 1}</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-1000" style={{ width: `${(user.points % 500) / 5}%` }}></div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 grid grid-cols-2 gap-4 mb-10">
        <div onClick={() => setSubView('achievements')} className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/5 flex flex-col items-center gap-2 group hover:bg-white/10 transition-all cursor-pointer">
          <Zap size={24} className="text-cyan-400 group-hover:scale-125 transition-transform" />
          <span className="text-2xl font-black text-white">{user.points.toLocaleString()}</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">نقطة مجد</span>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/5 flex flex-col items-center gap-2 group hover:bg-white/10 transition-all cursor-pointer">
          <Users size={24} className="text-cyan-400 group-hover:scale-125 transition-transform" />
          <span className="text-2xl font-black text-white">#{dynamicRank}</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">ترتيبك الحالي</span>
        </div>
      </section>

      {/* Community Channels */}
      <section className="px-6 mb-12">
        <div className="flex items-center justify-end gap-4 mb-6 px-2">
           <h3 className="text-sm font-black text-white uppercase tracking-widest">مجتمع الأبطال</h3>
           <Share2 size={16} className="text-purple-500" />
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 px-2" dir="ltr">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.url} className="flex-shrink-0 flex flex-col items-center gap-3 group">
              <div className={`w-16 h-16 rounded-3xl ${link.color} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-all shadow-xl`}>
                <link.icon size={28} />
              </div>
              <span className="text-[8px] font-black text-slate-500 group-hover:text-white transition-colors uppercase">{link.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Settings List */}
      <section className="px-6 mb-12 space-y-4">
        <div className="flex items-center justify-end gap-4 mb-6 px-2">
           <h3 className="text-sm font-black text-white uppercase tracking-widest">إعدادات العرش</h3>
           <Settings size={16} className="text-cyan-500" />
        </div>
        
        <button onClick={() => setSubView('edit')} className="w-full bg-white/5 hover:bg-white/10 p-5 rounded-[28px] border border-white/5 flex items-center justify-between group transition-all">
          <ChevronLeft size={18} className="text-slate-700 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          <div className="flex items-center gap-5">
            <div className="text-right">
              <h4 className="text-sm font-black text-white">تعديل الملف الشخصي</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">تغيير الاسم، الموبايل، والبيانات</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A1F] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors shadow-inner"><Edit3 size={22} /></div>
          </div>
        </button>

        <button onClick={() => setSubView('notifications')} className="w-full bg-white/5 hover:bg-white/10 p-5 rounded-[28px] border border-white/5 flex items-center justify-between group transition-all">
          <ChevronLeft size={18} className="text-slate-700 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          <div className="flex items-center gap-5">
            <div className="text-right">
              <h4 className="text-sm font-black text-white">إعدادات الإشعارات</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">تحكم في التنبيهات التي تصل لهاتفك</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A1F] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors shadow-inner"><Bell size={22} /></div>
          </div>
        </button>

        <button onClick={() => setSubView('security')} className="w-full bg-white/5 hover:bg-white/10 p-5 rounded-[28px] border border-white/5 flex items-center justify-between group transition-all">
          <ChevronLeft size={18} className="text-slate-700 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          <div className="flex items-center gap-5">
            <div className="text-right">
              <h4 className="text-sm font-black text-white">الأمان والخصوصية</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">حماية حسابك وتغيير كلمة المرور</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A1F] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors shadow-inner"><Shield size={22} /></div>
          </div>
        </button>

        <button onClick={() => setSubView('payments')} className="w-full bg-white/5 hover:bg-white/10 p-5 rounded-[28px] border border-white/5 flex items-center justify-between group transition-all">
          <ChevronLeft size={18} className="text-slate-700 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          <div className="flex items-center gap-5">
            <div className="text-right">
              <h4 className="text-sm font-black text-white">الخزينة والاشتراكات</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">إدارة رصيدك المالي وباقاتك</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A1F] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors shadow-inner"><CreditCard size={22} /></div>
          </div>
        </button>
      </section>

      {/* Logout Button */}
      <section className="px-6 pb-12">
        <button onClick={onLogout} className="w-full py-5 rounded-[28px] bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-3 group hover:bg-red-500 transition-all active:scale-95 shadow-xl shadow-red-500/5">
           <LogOut size={20} className="text-red-500 group-hover:text-white transition-colors" />
           <span className="text-sm font-black text-red-500 group-hover:text-white transition-colors">تسجيل الخروج الآمن</span>
        </button>
      </section>
    </div>
  );
};

// Sub-component for Smartphone icon not in standard Lucide
const Smartphone = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
