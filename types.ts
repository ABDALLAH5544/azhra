
export enum Track {
  GENERAL = 'عام',
  AZHAR = 'أزهري'
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

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  replyToId?: string;
  seenBy: string[]; 
  reactions: { emoji: string; count: number; users: string[] }[];
}

export interface ChatMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
}

export interface JoinRequest {
  userId: string;
  userName: string;
  userAvatar: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Chat {
  id: string;
  name: string;
  description?: string;
  avatar: string;
  type: 'private' | 'group' | 'ai' | 'public';
  lastMessage?: string;
  lastMessageTime?: string;
  members: ChatMember[]; 
  messages: Message[];
  unreadCount: number;
  pinnedMessageId?: string;
  joinRequests?: JoinRequest[];
  isLocked?: boolean; 
}

export interface FriendRequest {
  fromId: string;
  fromName: string;
  fromAvatar: string;
}

export interface User {
  id: string;
  name: string;
  phone?: string;
  password?: string;
  track: Track;
  points: number;
  streak: number;
  level: string;
  completedLessons: string[];
  rank: number;
  avatar: string;
  friendIds: string[];
  pendingFriendRequests: FriendRequest[];
}

export type View = 'home' | 'learn' | 'community' | 'leaderboard' | 'profile' | 'contests';
