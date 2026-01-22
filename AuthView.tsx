
import React, { useState } from 'react';
import { 
  Sparkles, Phone, Lock, User as UserIcon, 
  Zap, Eye, EyeOff, ArrowRightCircle, 
  Crown, AlertCircle
} from 'lucide-react';
import { Track, User, UserRole } from './types';
import { validateLogin, getAllUsers, defaultAchievements, defaultQuests, updateGlobalUser } from './database';

const MosquePremium = ({ active }: { active: boolean }) => (
  <div className={`relative transition-all duration-500 ${active ? 'scale-110' : 'grayscale opacity-40'}`}>
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00A86B" />
          <stop offset="100%" stopColor="#004B23" />
        </linearGradient>
      </defs>
      <path d="M32 4 L34 10 L30 10 Z" fill="url(#goldGrad)" />
      <path d="M16 32 Q32 8 48 32 Z" fill="url(#domeGrad)" />
      <rect x="12" y="32" width="40" height="28" rx="4" fill="url(#goldGrad)" />
      <path d="M26 60 V48 Q32 42 38 48 V60" fill="#002411" />
    </svg>
    {active && <div className="absolute -inset-4 bg-yellow-500/20 blur-xl rounded-full -z-10"></div>}
  </div>
);

const SchoolPremium = ({ active }: { active: boolean }) => (
  <div className={`relative transition-all duration-500 ${active ? 'scale-110' : 'grayscale opacity-40'}`}>
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <defs>
        <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2FE" />
          <stop offset="100%" stopColor="#4FACFE" />
        </linearGradient>
      </defs>
      <path d="M32 8 L56 22 V54 H8 V22 Z" fill="#1A1A2E" stroke="url(#techGrad)" strokeWidth="2" />
      <path d="M32 8 L56 22 L32 36 L8 22 Z" fill="url(#techGrad)" opacity="0.8" />
      <circle cx="32" cy="18" r="3" fill="white" />
    </svg>
    {active && <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full -z-10"></div>}
  </div>
);

interface AuthViewProps {
  onLogin: (user: User) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [track, setTrack] = useState<Track>(Track.GENERAL);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    // التعديل هنا: السماح بـ 000 و 111 بجانب أرقام الموبايل العادية
    const phoneRegex = /^01[0125][0-9]{8}$|^000$|^111$/;
    
    if (!phoneRegex.test(phone)) {
      setError('رقم الهاتف يجب أن يبدأ بـ 01 ويحتوي على 11 رقماً (أو كود الإدارة)');
      return false;
    }
    if (password.length < 3) {
      setError('كلمة المرور قصيرة جداً');
      return false;
    }
    if (mode === 'signup' && name.trim().split(/\s+/).length < 2) {
      setError('يرجى إدخال اسمك الثنائي على الأقل');
      return false;
    }
    return true;
  };

  const handleAction = () => {
    setError('');
    if (!validateInputs()) return;
    setLoading(true);

    const db = getAllUsers();

    if (mode === 'login') {
      setTimeout(() => {
        const existingUser = db.find(u => u.phone === phone);
        if (!existingUser) {
          setError('هذا الحساب غير موجود في سجلات الأبطال');
          setLoading(false);
          return;
        }
        
        const loggedInUser = validateLogin(phone, password);
        if (loggedInUser) {
          localStorage.setItem('azhrt_user', JSON.stringify(loggedInUser));
          onLogin(loggedInUser);
        } else {
          setError('كلمة المرور غير صحيحة، حاول مرة أخرى');
        }
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        const alreadyExists = db.some(u => u.phone === phone);
        if (alreadyExists) {
          setError('هذا الرقم مسجل بالفعل، يمكنك تسجيل الدخول مباشرة');
          setLoading(false);
          return;
        }

        const newUser: User = {
          id: 'u' + Date.now(),
          name, phone, password, track,
          role: UserRole.STUDENT,
          points: 100, streak: 1, level: 'مبتدئ طموح',
          completedLessons: [], rank: db.length + 1,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          friendIds: [],
          incomingRequestIds: [],
          sentRequestIds: [],
          pendingFriendRequests: [],
          achievements: defaultAchievements,
          dailyQuests: defaultQuests
        };
        
        updateGlobalUser(newUser);
        localStorage.setItem('azhrt_user', JSON.stringify(newUser));
        onLogin(newUser);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#020205] relative overflow-y-auto no-scrollbar overflow-x-hidden no-horizontal-scroll">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_#4FACFE_0%,_#000000_50%,_#7028e4_100%)] blur-[100px] opacity-20"></div>
      </div>

      <div className="w-full flex-grow flex flex-col items-center py-12 px-6 z-10">
        {/* Logo Section */}
        <div className="text-center space-y-4 mb-10">
          <div className="relative inline-block group">
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#0A0A1F] to-[#020205] rounded-[40px] border-2 border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
               <Sparkles size={60} className="text-cyan-400 drop-shadow-[0_0_15px_#22d3ee]" />
               <div className="absolute bottom-2 font-black text-[8px] text-white/30 tracking-widest">AZHRT</div>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-[#020205]">
               <Crown size={24} className="text-black" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-6xl font-black text-white tracking-tight">أزهرت</h1>
            <p className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px] opacity-60">IMPERIAL ACADEMY</p>
          </div>
        </div>

        {/* Card Section */}
        <div id="auth-card" className="relative w-full max-w-sm pb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-[50px] blur-xl"></div>
          <div className="relative bg-[#0A0A1F]/80 backdrop-blur-3xl p-8 rounded-[50px] border border-white/10 shadow-2xl space-y-8 overflow-hidden">
            
            {/* Tab Switcher */}
            <div className="flex bg-black/40 p-1.5 rounded-[25px] border border-white/5 relative z-10">
              <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-4 rounded-[20px] text-[10px] font-black tracking-widest transition-all ${mode === 'login' ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-slate-600'}`}>تسجيل الدخول</button>
              <button onClick={() => { setMode('signup'); setError(''); }} className={`flex-1 py-4 rounded-[20px] text-[10px] font-black tracking-widest transition-all ${mode === 'signup' ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-slate-600'}`}>إنشاء حساب</button>
            </div>

            {error && (
              <div className="animate-in slide-in-from-top-2 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[9px] font-black leading-tight">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {mode === 'signup' && (
                <div className="space-y-2 animate-in slide-in-from-right-4">
                  <label className="text-[10px] font-black text-slate-500 mr-2">الاسم بالكامل</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك الثلاثي" className="w-full bg-black/50 border border-white/5 rounded-[22px] p-5 text-white font-bold text-center outline-none focus:border-cyan-500 transition-all" dir="rtl" />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 mr-2">رقم الهاتف أو الكود</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" className="w-full bg-black/50 border border-white/5 rounded-[22px] p-5 text-white font-black text-center outline-none focus:border-cyan-500 transition-all" dir="rtl" type="tel" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 mr-2">كلمة المرور</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="w-full bg-black/50 border border-white/5 rounded-[22px] p-5 text-white font-black text-center outline-none focus:border-cyan-500 transition-all" dir="rtl" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-cyan-400 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in slide-in-from-bottom-2">
                  <button onClick={() => setTrack(Track.GENERAL)} className={`p-6 rounded-[35px] border transition-all flex flex-col items-center gap-3 ${track === Track.GENERAL ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-black/30 border-white/5'}`}>
                    <SchoolPremium active={track === Track.GENERAL} />
                    <span className="text-[10px] font-black text-white">عام</span>
                  </button>
                  <button onClick={() => setTrack(Track.AZHAR)} className={`p-6 rounded-[35px] border transition-all flex flex-col items-center gap-3 ${track === Track.AZHAR ? 'bg-yellow-500/10 border-yellow-500 shadow-lg shadow-yellow-500/10' : 'bg-black/30 border-white/5'}`}>
                    <MosquePremium active={track === Track.AZHAR} />
                    <span className="text-[10px] font-black text-white">أزهري</span>
                  </button>
                </div>
              )}
            </div>

            <button onClick={handleAction} disabled={loading} className="w-full py-6 rounded-[28px] bg-gradient-to-r from-cyan-600 to-purple-800 text-white font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Zap size={18} /> <span>{mode === 'login' ? 'دخول الأبطال' : 'انطلاق الآن'}</span> <ArrowRightCircle size={20} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
