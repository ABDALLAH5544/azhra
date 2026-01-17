
import React, { useState, useEffect, useRef } from 'react';
import { Track, Subject, User, View, Lesson, Chat, Message } from './types';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { HomeView } from './HomeView';
import { LeaderboardView } from './LeaderboardView';
import { ProfileView } from './ProfileView';
import { LearnView } from './LearnView';
import { ContestsView } from './ContestsView';
import { CommunityView } from './CommunityView';
import { Sparkles } from 'lucide-react';

const MY_ID = 'user_me';

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [isChatActive, setIsChatActive] = useState(false);
  const [user, setUser] = useState<User>({
    id: MY_ID,
    name: 'أحمد الأزهري',
    phone: '01012345678',
    password: 'password123',
    track: Track.AZHAR,
    points: 2450,
    streak: 15,
    level: 'نخبة (مستوى 25)',
    completedLessons: [],
    rank: 3,
    avatar: 'https://picsum.photos/seed/myprofile/200',
    friendIds: ['s1', 's2'],
    pendingFriendRequests: [
      { fromId: 's3', fromName: 'خديجة محمد', fromAvatar: 'https://picsum.photos/seed/khadi/100' }
    ]
  });
  
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    // عند تغيير الواجهة، تأكد من إعادة تعيين حالة الشات
    if (activeView !== 'community') {
      setIsChatActive(false);
    }
  }, [activeView]);

  if (isNewUser) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-[#0A0A1A] overflow-hidden">
        <div className="text-center mb-12 animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[30%] mx-auto mb-6 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.2)]">
            <Sparkles size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-2 neon-text">أزهرت</h1>
          <p className="text-slate-400 text-sm font-medium">تجربة تعليمية بمواصفات عالمية</p>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <button onClick={() => { setUser(p => ({...p, track: Track.GENERAL})); setIsNewUser(false); }} className="w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-400 group transition-all transform active:scale-95 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">المنهج العام</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Standard Track</p>
          </button>
          <button onClick={() => { setUser(p => ({...p, track: Track.AZHAR})); setIsNewUser(false); }} className="w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-600 group transition-all transform active:scale-95 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">المنهج الأزهري</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Al-Azhar Track</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-lg mx-auto bg-[#0A0A1A] flex flex-col relative shadow-2xl overflow-hidden border-x border-slate-800/50">
      {!isChatActive && <Header user={user} />}
      
      <main ref={mainContentRef} className="flex-grow overflow-y-auto no-scrollbar relative bg-[#0A0A1A] scroll-smooth">
        {activeView === 'home' && (
          <HomeView 
            user={user} 
            onSubjectSelect={(s) => { setSelectedSubject(s); setActiveView('learn'); }} 
            setView={setActiveView}
          />
        )}
        {activeView === 'leaderboard' && <LeaderboardView currentUser={user} setView={setActiveView} />}
        {activeView === 'profile' && <ProfileView user={user} setUser={setUser} setView={setActiveView} />}
        {activeView === 'learn' && <LearnView user={user} setView={setActiveView} selectedSubject={selectedSubject} />}
        {activeView === 'contests' && <ContestsView setView={setActiveView} />}
        {activeView === 'community' && (
          <CommunityView 
            user={user} 
            setUser={setUser} 
            onChatStateChange={setIsChatActive} 
          />
        )}
      </main>

      {!isChatActive && <Navbar activeView={activeView === 'contests' ? 'home' : activeView} setView={setActiveView} />}
    </div>
  );
}
