
import { Track, User, Achievement, Quest, UserRole, Subject } from './types';
import { CURRICULUM } from './constants';

export const defaultAchievements: Achievement[] = [
  { id: 'a1', title: 'دحيح النحو', icon: '🖋️', description: 'أكمل جميع دروس الوحدة الأولى في النحو', isUnlocked: true },
  { id: 'a2', title: 'المحارب الصامد', icon: '🛡️', description: 'حافظ على سلسلة تفوق لمدة 7 أيام', isUnlocked: false },
  { id: 'a3', title: 'إمبراطور السرعة', icon: '⚡', description: 'فز بـ 10 ألعاب في ساحة التحدي', isUnlocked: false },
];

export const defaultQuests: Quest[] = [
  { id: 'q1', title: 'مشاهدة محاضرة جديدة', goal: 1, progress: 0, reward: 50, isCompleted: false },
  { id: 'q2', title: 'حل اختبار قصير', goal: 1, progress: 0, reward: 30, isCompleted: false },
  { id: 'q3', title: 'التفاعل في المجتمع', goal: 3, progress: 1, reward: 20, isCompleted: false },
];

const PRESET_CHAMPIONS: User[] = [
  { 
    id: 'admin-1', 
    name: 'المدير الإمبراطوري', 
    phone: '000', 
    password: '000', 
    role: UserRole.ADMIN,
    track: Track.AZHAR, 
    points: 99999, 
    streak: 999, 
    level: 'الحاكم الأعلى', 
    completedLessons: [], 
    rank: 0, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', 
    friendIds: [], 
    incomingRequestIds: [], 
    sentRequestIds: [], 
    pendingFriendRequests: [], 
    achievements: defaultAchievements, 
    dailyQuests: defaultQuests 
  },
  { 
    id: 'mod-1', 
    name: 'المشرف التعليمي', 
    phone: '111', 
    password: '111', 
    role: UserRole.MODERATOR,
    track: Track.GENERAL, 
    points: 50000, 
    streak: 100, 
    level: 'خبير المناهج', 
    completedLessons: [], 
    rank: 0, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mod', 
    friendIds: [], 
    incomingRequestIds: [], 
    sentRequestIds: [], 
    pendingFriendRequests: [], 
    achievements: defaultAchievements, 
    dailyQuests: defaultQuests 
  },
  { id: 'u1', name: 'عبدالله أيمن', phone: '01010101010', password: '123', role: UserRole.STUDENT, track: Track.AZHAR, points: 15420, streak: 45, level: 'الإمبراطور الأكبر', completedLessons: [], rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah', friendIds: [], incomingRequestIds: [], sentRequestIds: [], pendingFriendRequests: [], achievements: defaultAchievements, dailyQuests: defaultQuests },
  { id: 'u2', name: 'أحمد محمد القاضي', phone: '01111111111', password: '123', role: UserRole.STUDENT, track: Track.GENERAL, points: 12500, streak: 30, level: 'أسطورة النحو', completedLessons: [], rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', friendIds: [], incomingRequestIds: [], sentRequestIds: [], pendingFriendRequests: [], achievements: defaultAchievements, dailyQuests: defaultQuests },
  ...Array.from({ length: 26 }).map((_, i) => ({
    id: `u${i + 5}`,
    name: `بطل أزهرت رقم ${i + 5}`,
    phone: `019999999${i + 5}`,
    password: '123',
    role: UserRole.STUDENT,
    track: i % 2 === 0 ? Track.AZHAR : Track.GENERAL,
    points: 8000 - (i * 200),
    streak: Math.floor(Math.random() * 5),
    level: 'طالب مجتهد',
    completedLessons: [],
    rank: i + 5,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=hero${i + 5}`,
    friendIds: [],
    incomingRequestIds: [],
    sentRequestIds: [],
    pendingFriendRequests: [],
    achievements: defaultAchievements,
    dailyQuests: defaultQuests
  }))
];

export const getAllUsers = (): User[] => {
  const localDB = localStorage.getItem('azhrt_global_db_v4');
  if (localDB) {
    return JSON.parse(localDB).sort((a: User, b: User) => b.points - a.points);
  }
  localStorage.setItem('azhrt_global_db_v4', JSON.stringify(PRESET_CHAMPIONS));
  return PRESET_CHAMPIONS.sort((a, b) => b.points - a.points);
};

export const updateGlobalUser = (updatedUser: User) => {
  const currentDB = getAllUsers();
  const idx = currentDB.findIndex(u => u.id === updatedUser.id);
  if (idx !== -1) currentDB[idx] = updatedUser;
  else currentDB.push(updatedUser);
  localStorage.setItem('azhrt_global_db_v4', JSON.stringify(currentDB));
  
  const currentUser = localStorage.getItem('azhrt_user');
  if (currentUser) {
    const parsed = JSON.parse(currentUser);
    if (parsed.id === updatedUser.id) {
      localStorage.setItem('azhrt_user', JSON.stringify(updatedUser));
    }
  }
};

export const validateLogin = (phone: string, password: string): User | null => {
  const users = getAllUsers();
  const user = users.find(u => u.phone === phone && u.password === password);
  return user || null;
};

// وظائف الإدارة الجديدة
export const broadcastAnnouncement = (text: string) => {
  const announcements = JSON.parse(localStorage.getItem('azhrt_announcements') || '[]');
  announcements.push({ id: Date.now(), text, time: new Date().toISOString() });
  localStorage.setItem('azhrt_announcements', JSON.stringify(announcements));
};

export const getAnnouncements = () => {
  return JSON.parse(localStorage.getItem('azhrt_announcements') || '[]');
};

export const getGlobalCurriculum = (): Subject[] => {
  const saved = localStorage.getItem('azhrt_curriculum_v1');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('azhrt_curriculum_v1', JSON.stringify(CURRICULUM));
  return CURRICULUM;
};

export const updateGlobalCurriculum = (newCurriculum: Subject[]) => {
  localStorage.setItem('azhrt_curriculum_v1', JSON.stringify(newCurriculum));
};
