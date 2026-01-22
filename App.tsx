
import React, { useState, useEffect, useRef } from 'react';
import { Track, Subject, User, View, Lesson, Chat, UserRole } from './types';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { HomeView } from './HomeView';
import { LeaderboardView } from './LeaderboardView';
import { ProfileView } from './ProfileView';
import { LearnView } from './LearnView';
import { ContestsView } from './ContestsView';
import { CommunityView } from './CommunityView';
import { GamesView } from './GamesView';
import { AuthView } from './AuthView';
import { NotificationsView } from './NotificationsView';
import { ChatView } from './ChatView';
import { AdminDashboard } from './AdminDashboard';
import { ModeratorDashboard } from './ModeratorDashboard';
import { updateGlobalUser } from './database';

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('azhrt_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      updateGlobalUser(user);
    }
  }, [user]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActiveView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('azhrt_user');
    setUser(null);
    setActiveView('home');
  };

  const completeLessonAction = (lessonId: string, pts: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newPoints = prev.points + pts;
      const newCompleted = [...prev.completedLessons, lessonId];
      const newQuests = prev.dailyQuests.map(q => {
        if (q.id === 'q1') {
           return { ...q, progress: Math.min(q.goal, q.progress + 1), isCompleted: q.progress + 1 >= q.goal };
        }
        return q;
      });
      return { ...prev, points: newPoints, completedLessons: newCompleted, dailyQuests: newQuests };
    });
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setActiveView('chat');
  };

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  const showNavAndHeader = activeView !== 'learn' && activeView !== 'chat' && activeView !== 'admin' && activeView !== 'moderator';

  return (
    <div className="h-screen w-full max-w-lg mx-auto bg-[#010103] flex flex-col relative shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden border-x border-white/5 font-['Tajawal']">
      {showNavAndHeader && <Header user={user} />}
      
      <main ref={mainContentRef} className={`flex-grow overflow-y-auto no-scrollbar relative bg-transparent scroll-smooth ${showNavAndHeader ? 'pb-36 pt-4' : ''}`}>
        {activeView === 'home' && (
          <HomeView 
            user={user} 
            onSubjectSelect={(s) => { setSelectedSubject(s); setActiveView('learn'); }} 
            setView={setActiveView}
          />
        )}
        {activeView === 'leaderboard' && <LeaderboardView currentUser={user} setView={setActiveView} />}
        {activeView === 'profile' && (
          <ProfileView 
            user={user} 
            setUser={setUser as any} 
            setView={setActiveView} 
            onLogout={handleLogout}
          />
        )}
        {activeView === 'learn' && (
          <LearnView 
            user={user} 
            setView={setActiveView} 
            selectedSubject={selectedSubject}
            onLessonComplete={completeLessonAction}
          />
        )}
        {activeView === 'contests' && <ContestsView setView={setActiveView} />}
        {activeView === 'games' && <GamesView user={user} setUser={setUser as any} setView={setActiveView} />}
        {activeView === 'community' && (
          <CommunityView 
            user={user} 
            setUser={setUser as any} 
            setView={setActiveView}
            onSelectChat={handleSelectChat}
          />
        )}
        {activeView === 'notifications' && <NotificationsView setView={setActiveView} />}
        {activeView === 'chat' && selectedChat && (
          <ChatView 
            user={user} 
            chat={selectedChat} 
            onBack={() => setActiveView('community')}
            onUpdateChat={(updated) => setSelectedChat(updated)}
          />
        )}
        {activeView === 'admin' && user.role === UserRole.ADMIN && (
          <AdminDashboard user={user} onBack={() => setActiveView('home')} />
        )}
        {activeView === 'moderator' && (user.role === UserRole.MODERATOR || user.role === UserRole.ADMIN) && (
          <ModeratorDashboard user={user} onBack={() => setActiveView('home')} />
        )}
      </main>

      {showNavAndHeader && (
        <Navbar 
          activeView={activeView} 
          setView={setActiveView} 
        />
      )}
    </div>
  );
}
