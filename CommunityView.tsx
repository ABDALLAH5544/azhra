
import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, Users, Search, 
  Bell, ChevronLeft,
  UserPlus, Sparkles, X, 
  Clock, Check, UserMinus, MessageCircle, Plus, ShieldCheck, Globe, Image as ImageIcon
} from 'lucide-react';
import { User, Chat, Message, View } from './types';
import { getAllUsers, updateGlobalUser } from './database';

interface CommunityViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setView: (v: View) => void;
  onSelectChat: (chat: Chat) => void;
}

type MainTab = 'chats' | 'explorers' | 'requests' | 'friends';

export const CommunityView: React.FC<CommunityViewProps> = ({ user, setUser, setView, onSelectChat }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  
  // States for New Group
  const [groupName, setGroupName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('https://api.dicebear.com/7.x/shapes/svg?seed=1');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  const groupIcons = [
    'https://api.dicebear.com/7.x/shapes/svg?seed=1',
    'https://api.dicebear.com/7.x/shapes/svg?seed=2',
    'https://api.dicebear.com/7.x/shapes/svg?seed=3',
    'https://api.dicebear.com/7.x/shapes/svg?seed=4',
    'https://api.dicebear.com/7.x/shapes/svg?seed=5',
  ];

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'ai-oracle',
      name: 'أوراكل أزهرت (المعلم الذكي)',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=oracle',
      type: 'ai',
      unreadCount: 0,
      lastMessage: 'أهلاً بك يا بطل، اسألني أي شيء في المنهج وسأجيبك فوراً.',
      lastMessageTime: 'الآن',
      members: [user.id],
      messages: [{ id: 'm1', senderId: 'ai', senderName: 'Oracle', senderAvatar: '', text: 'أنا الأوراكل الخاص بك، برمجني فريق AZHRT لأكون رفيقك في طريق المجد التعليمي. ماذا تريد أن تعرف اليوم؟', timestamp: '10:00 ص', seenBy: [], reactions: [] }]
    },
    {
      id: 'group-main',
      name: 'مجلس الأباطرة (عام)',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=empire',
      type: 'group',
      unreadCount: 5,
      lastMessage: 'أحمد: شباب مين خلص امتحان النحو؟',
      lastMessageTime: '٠٩:٤٥ ص',
      members: [user.id],
      messages: []
    }
  ]);

  const myFriends = useMemo(() => {
    const all = getAllUsers();
    return all.filter(u => user.friendIds.includes(u.id));
  }, [user.friendIds]);

  const filteredExplorers = useMemo(() => {
    const all = getAllUsers();
    const list = all.filter(u => u.id !== user.id);
    if (!searchQuery.trim()) return list.slice(0, 15);
    return list.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (u.phone && u.phone.includes(searchQuery))
    );
  }, [searchQuery, user.id]);

  const incomingRequests = useMemo(() => {
    const all = getAllUsers();
    return all.filter(u => user.incomingRequestIds?.includes(u.id));
  }, [user.incomingRequestIds]);

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    const newChat: Chat = {
      id: `group-${Date.now()}`,
      name: groupName,
      avatar: selectedIcon,
      type: 'group',
      isPrivateGroup: isPrivate,
      ownerId: user.id,
      unreadCount: 0,
      messages: [],
      members: [user.id, ...selectedMemberIds],
      lastMessage: 'تم تأسيس الإمبراطورية بنجاح',
      lastMessageTime: 'الآن',
      pendingJoinRequests: []
    };
    setChats([newChat, ...chats]);
    setGroupName('');
    setSelectedMemberIds([]);
    setShowCreateGroup(false);
  };

  const toggleMemberSelection = (id: string) => {
    setSelectedMemberIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const handleJoinChat = (chat: Chat) => {
    const isMember = chat.members.includes(user.id);
    if (isMember) {
      onSelectChat(chat);
    } else if (!chat.isPrivateGroup) {
      const updatedChat = { ...chat, members: [...chat.members, user.id] };
      setChats(chats.map(c => c.id === chat.id ? updatedChat : c));
      onSelectChat(updatedChat);
    } else {
      const hasRequested = chat.pendingJoinRequests?.includes(user.id);
      if (hasRequested) {
        alert("طلب انضمامك قيد المراجعة.");
      } else {
        const updatedChat = { ...chat, pendingJoinRequests: [...(chat.pendingJoinRequests || []), user.id] };
        setChats(chats.map(c => c.id === chat.id ? updatedChat : c));
        alert("تم إرسال طلب الانضمام لصاحب المجموعة.");
      }
    }
  };

  // Fix: Added startPrivateChat function to fix the 'Cannot find name startPrivateChat' error
  const startPrivateChat = (friend: User) => {
    const existingChat = chats.find(c => 
      c.type === 'private' && 
      c.members.includes(friend.id) && 
      c.members.includes(user.id)
    );
    
    if (existingChat) {
      onSelectChat(existingChat);
    } else {
      const newChat: Chat = {
        id: `private-${user.id}-${friend.id}`,
        name: friend.name,
        avatar: friend.avatar,
        type: 'private',
        unreadCount: 0,
        members: [user.id, friend.id],
        messages: [],
        lastMessage: 'بدء المحادثة',
        lastMessageTime: 'الآن'
      };
      setChats([newChat, ...chats]);
      onSelectChat(newChat);
    }
  };

  const tabs = [
    { id: 'chats', label: 'المراسلة', icon: MessageSquare, color: 'cyan' },
    { id: 'explorers', label: 'المستكشفون', icon: Search, color: 'blue' },
    { id: 'requests', label: 'الطلبات', icon: Bell, color: 'yellow', count: incomingRequests.length },
    { id: 'friends', label: 'أصدقائي', icon: Users, color: 'purple' }
  ];

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <div className="relative min-h-full bg-[#030308] pb-40 animate-in fade-in duration-1000 overflow-x-hidden no-scrollbar">
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[200%] h-full bg-[radial-gradient(circle_at_center,_#22d3ee10_0%,_transparent_70%)] blur-[100px]"></div>
      </div>

      <div className="relative p-8 space-y-10 z-10">
         <header className="flex items-center justify-between">
            <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">مجتمع أزهرت</span>
               </div>
               <h2 className="text-4xl font-black text-white tracking-tighter">مجرة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">الأبطال</span></h2>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setShowCreateGroup(true)} className="w-14 h-14 rounded-2xl bg-cyan-500 text-black flex items-center justify-center shadow-xl active:scale-90 transition-all">
                  <Plus size={32} />
               </button>
               <button onClick={() => setView('notifications')} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white relative shadow-2xl group transition-all">
                  <Bell size={24} className="group-hover:rotate-12 transition-transform" />
                  {incomingRequests.length > 0 && <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 rounded-full border-4 border-[#030308]"></span>}
               </button>
            </div>
         </header>

         {/* Create Group Modal - ENHANCED */}
         {showCreateGroup && (
           <div className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in duration-300">
             <div className="bg-[#0A0A1F] border border-white/10 rounded-[45px] p-8 w-full max-w-sm space-y-6 shadow-[0_0_100px_rgba(34,211,238,0.2)] overflow-y-auto max-h-[90vh] no-scrollbar">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-black text-white">تأسيس مجموعة جديدة</h3>
                   <button onClick={() => setShowCreateGroup(false)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500"><X size={24}/></button>
                </div>

                <div className="flex flex-col items-center gap-4 py-2">
                   <div className="relative group">
                      <img src={selectedIcon} className="w-24 h-24 rounded-[30px] border-4 border-cyan-500 shadow-2xl bg-[#030308]" />
                      <div className="absolute inset-0 bg-black/40 rounded-[30px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <ImageIcon size={24} className="text-white" />
                      </div>
                   </div>
                   <div className="flex gap-2">
                      {groupIcons.map((ic, i) => (
                        <button key={i} onClick={() => setSelectedIcon(ic)} className={`w-10 h-10 rounded-xl border transition-all ${selectedIcon === ic ? 'border-cyan-500 scale-110 shadow-lg' : 'border-white/10 opacity-40'}`}>
                           <img src={ic} className="w-full h-full rounded-xl" />
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 text-right">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 mr-2 uppercase tracking-widest">اسم المجموعة</label>
                      <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="اسم المجموعة..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-cyan-500 text-right font-bold" dir="rtl" />
                   </div>
                   
                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                      <button onClick={() => setIsPrivate(!isPrivate)} className={`w-12 h-7 rounded-full transition-all flex items-center px-1 ${isPrivate ? 'bg-purple-600' : 'bg-slate-700'}`}>
                         <div className={`w-5 h-5 rounded-full bg-white transition-all ${isPrivate ? 'translate-x-[-20px]' : 'translate-x-0'}`}></div>
                      </button>
                      <div className="text-right">
                        <span className="text-sm font-black text-white">{isPrivate ? 'خاصة' : 'عامة'}</span>
                        <p className="text-[8px] text-slate-500 font-bold">{isPrivate ? 'يتطلب موافقتك للانضمام' : 'مفتوحة للجميع'}</p>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 mr-2 uppercase">إضافة أصدقاء (اختياري)</label>
                      <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar px-1">
                        {myFriends.map(friend => (
                          <button key={friend.id} onClick={() => toggleMemberSelection(friend.id)} className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${selectedMemberIds.includes(friend.id) ? 'bg-cyan-500/20 border-cyan-500/40' : 'bg-white/5 border-white/5 opacity-60'}`}>
                             {selectedMemberIds.includes(friend.id) ? <Check size={16} className="text-cyan-400" /> : <div className="w-4 h-4 rounded-full border border-white/20"></div>}
                             <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-white">{friend.name}</span>
                                <img src={friend.avatar} className="w-8 h-8 rounded-full bg-black border border-white/10" />
                             </div>
                          </button>
                        ))}
                      </div>
                   </div>

                   <button onClick={handleCreateGroup} className="w-full py-5 rounded-[25px] bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-xl active:scale-95 transition-all mt-4">إنشاء الإمبراطورية</button>
                </div>
             </div>
           </div>
         )}

         {/* Tabs Display */}
         <div className="relative bg-[#0A0A1F]/95 backdrop-blur-3xl p-1.5 rounded-[35px] border border-white/10 flex shadow-2xl">
            <div 
              className="absolute top-1.5 bottom-1.5 rounded-[28px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-0"
              style={{ 
                width: `calc(100% / 4 - 4px)`,
                right: `calc(${activeIndex} * (100% / 4) + 2px)`,
                backgroundColor: activeTab === 'chats' ? 'rgba(34, 211, 238, 0.1)' : 
                                 activeTab === 'explorers' ? 'rgba(59, 130, 246, 0.1)' : 
                                 activeTab === 'requests' ? 'rgba(234, 179, 8, 0.1)' : 
                                 'rgba(168, 85, 247, 0.1)',
                border: `1px solid ${activeTab === 'chats' ? 'rgba(34, 211, 238, 0.2)' : 
                                      activeTab === 'explorers' ? 'rgba(59, 130, 246, 0.2)' : 
                                      activeTab === 'requests' ? 'rgba(234, 179, 8, 0.2)' : 
                                      'rgba(168, 85, 247, 0.2)'}`
              }}
            ></div>

            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              const Icon = t.icon;
              return (
                <button 
                  key={t.id} 
                  onClick={() => { setActiveTab(t.id as MainTab); setSearchQuery(''); }} 
                  className={`flex-1 py-4 flex flex-col items-center justify-center gap-1.5 relative z-10 transition-all ${isActive ? 'scale-105' : 'opacity-40 grayscale'}`}
                >
                  <div className="relative">
                    <Icon size={20} className={isActive ? (t.color === 'cyan' ? 'text-cyan-400' : t.color === 'blue' ? 'text-blue-400' : t.color === 'yellow' ? 'text-yellow-400' : 'text-purple-400') : 'text-slate-400'} />
                    {t.count ? <div className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0A0A1F]">{t.count}</div> : null}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-500'}`}>{t.label}</span>
                </button>
              );
            })}
         </div>

         <section className="space-y-6">
            {activeTab === 'chats' && (
              <div className="space-y-4 animate-in fade-in">
                 {chats.map(chat => {
                   const isMember = chat.members.includes(user.id);
                   const isRequestPending = chat.pendingJoinRequests?.includes(user.id);
                   return (
                   <button key={chat.id} onClick={() => handleJoinChat(chat)} className="w-full bg-[#0A0A1F]/40 p-6 rounded-[45px] border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-white/[0.08]">
                      <div className="flex items-center gap-5">
                         <div className="relative">
                            <img src={chat.avatar} className="w-16 h-16 rounded-[28px] border-2 border-white/10 bg-black shadow-lg" />
                            {chat.type === 'ai' && <div className="absolute -bottom-1 -right-1 bg-yellow-500 p-1.5 rounded-xl border-4 border-[#030308]"><Sparkles size={12} className="text-black" /></div>}
                            {chat.isPrivateGroup && !isMember && <div className="absolute -bottom-1 -right-1 bg-purple-600 p-1.5 rounded-xl border-4 border-[#030308]"><ShieldCheck size={12} className="text-white" /></div>}
                         </div>
                         <div className="text-right">
                            <h4 className="text-base font-black text-white group-hover:text-cyan-400">{chat.name}</h4>
                            <p className={`text-[11px] truncate w-40 font-bold ${isMember ? 'text-slate-500' : 'text-cyan-500'}`}>
                               {isMember ? chat.lastMessage : isRequestPending ? 'طلبك قيد المراجعة...' : chat.isPrivateGroup ? 'مجموعة خاصة - اطلب انضمام' : 'انضم الآن للمجموعة'}
                            </p>
                         </div>
                      </div>
                      {isMember ? <ChevronLeft size={20} className="text-slate-800 group-hover:text-white" /> : <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20"><Plus size={20}/></div>}
                   </button>
                   );
                 })}
              </div>
            )}
            
            {activeTab === 'friends' && (
              <div className="space-y-4 animate-in fade-in">
                 {myFriends.map(friend => (
                   <div key={friend.id} className="bg-[#0A0A1F]/60 p-6 rounded-[45px] border border-white/5 flex items-center justify-between shadow-2xl">
                      <div className="flex items-center gap-5">
                         <img src={friend.avatar} className="w-16 h-16 rounded-[28px] border-2 border-white/10" />
                         <div className="text-right">
                            <h4 className="text-sm font-black text-white">{friend.name}</h4>
                            <div className="flex items-center gap-2 mt-1.5 text-green-500">
                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                               <span className="text-[9px] font-black uppercase tracking-tighter">بطل نشط</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <button onClick={() => startPrivateChat(friend)} className="w-11 h-11 rounded-2xl bg-cyan-500 text-black flex items-center justify-center shadow-lg active:scale-90 transition-all"><MessageCircle size={24} /></button>
                         <button onClick={() => alert("حذف الصديق")} className="w-11 h-11 rounded-2xl bg-white/5 text-red-400 border border-red-500/20 flex items-center justify-center active:scale-90 transition-all"><UserMinus size={24}/></button>
                      </div>
                   </div>
                 ))}
                 {myFriends.length === 0 && (
                   <div className="py-20 text-center space-y-4 opacity-30">
                      <Users size={64} className="mx-auto" />
                      <p className="text-xs font-black">قائمة أصدقائك فارغة</p>
                   </div>
                 )}
              </div>
            )}

            {/* Other tabs logic remains similar ... */}
         </section>
      </div>
    </div>
  );
};
