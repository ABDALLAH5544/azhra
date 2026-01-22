
export enum Track {
  GENERAL = 'عام',
  AZHAR = 'أزهري'
}

export enum UserRole {
  STUDENT = 'طالب',
  MODERATOR = 'مشرف',
  ADMIN = 'مدير'
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface Quest {
  id: string;
  title: string;
  reward: number;
  progress: number;
  goal: number;
  isCompleted: boolean;
}

export interface LessonTimestamp {
  time: number;
  label: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  points: number;
  videoProgress?: number;
  examScore?: number;
  description?: string;
  goals?: string[];
  keyPoints?: string[];
  timestamps?: LessonTimestamp[];
  summary?: string;
}

export interface Unit {
  id: string;
  title: string;
  isUnlocked: boolean;
  progress: number;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  icon: string;
  track: Track[];
  units: Unit[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  mediaUrl?: string; 
  timestamp: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  replyToId?: string;
  seenBy: string[]; 
  reactions: { emoji: string; count: number; users: string[] }[];
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: 'private' | 'group' | 'ai' | 'public';
  isPrivateGroup?: boolean;
  ownerId?: string;
  pendingJoinRequests?: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  members: string[]; 
  messages: Message[];
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  phone?: string;
  password?: string;
  role: UserRole; // الصلاحية
  track: Track;
  points: number;
  streak: number;
  level: string;
  completedLessons: string[];
  rank: number;
  avatar: string;
  friendIds: string[];
  incomingRequestIds: string[]; 
  sentRequestIds: string[];     
  achievements: Achievement[];
  dailyQuests: Quest[];
  pendingFriendRequests: any[];
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export type View = 'home' | 'learn' | 'community' | 'leaderboard' | 'profile' | 'contests' | 'games' | 'notifications' | 'chat' | 'admin' | 'moderator';
