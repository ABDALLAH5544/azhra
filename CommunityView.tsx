
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Users, Sparkles, Search, ChevronLeft, MoreVertical, 
  ShieldCheck, Crown, Plus, Send, ArrowRight, UserPlus, Heart,
  Smile, Edit2, Trash2, Reply, CheckCheck, UserCheck, X, Bell, 
  ShieldAlert, UserX, MessageCircle, Settings, Camera, LogOut, HeartHandshake,
  ThumbsUp, Laugh, Flame, Ghost
} from 'lucide-react';
import { User, Chat, Message, ChatMember, FriendRequest, JoinRequest } from './types';
import { getSmartTutorResponse } from './geminiService';

interface CommunityViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onChatStateChange?: (isActive: boolean) => void;
}

type MainTab = 'chats' | 'friends' | 'requests';

export const CommunityView: React.FC<CommunityViewProps> = ({ user, setUser, onChatStateChange }) => {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [messageActionId, setMessageActionId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  useEffect(() => {
    if (onChatStateChange) {
      onChatStateChange(!!activeChat);
    }
  }, [activeChat, onChatStateChange]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'ai-tutor',
      name: 'AZHRT AI (المعلم الذكي)',
      description: 'خبير أكاديمي مدعوم بأحدث تقنيات الذكاء الاصطناعي للإجابة المباشرة.',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=azhrt',
      type: 'ai',
      unreadCount: 0,
      lastMessage: 'اكتب سؤالك الأكاديمي للحصول على إجابة فورية.',
      lastMessageTime: 'الآن',
      members: [{ id: 'ai', name: 'AZHRT AI', avatar: '', role: 'admin' }],
      messages: [{ id: 'm1', senderId: 'ai', senderName: 'AZHRT AI', senderAvatar: '', text: 'بصفتي خبير أزهرت الأكاديمي، أنا جاهز للإجابة عن أسئلتك العلمية بشكل مباشر ومختصر.', timestamp: '10:00 ص', seenBy: [], reactions: [] }]
    },
    {
      id: 'official-group',
      name: 'جروب أزهرت الرسمي',
      description: 'المكان الرسمي لتبادل الخبرات بين جميع الطلاب.',
      avatar: 'https://picsum.photos/seed/official/200',
      type: 'public',
      unreadCount: 5,
      lastMessage: 'مستر أحمد: مراجعة غداً هامة جداً',
      lastMessageTime: '11:20 ص',
      members: [{ id: 'admin1', name: 'مستر أحمد', avatar: 'https://picsum.photos/seed/p2/100', role: 'admin' }],
      messages: [{ id: 'g1', senderId: 'admin1', senderName: 'مستر أحمد', senderAvatar: '', text: 'بالتوفيق للجميع في اختبار اليوم!', timestamp: '08:00 ص', seenBy: [], reactions: [] }]
    }
  ]);

  const suggestedStudents = [
    { id: 's4', name: 'ليلى أحمد', avatar: 'https://picsum.photos/seed/leila/100', points: '5.2k', level: '22' },
    { id: 's5', name: 'يوسف عمار', avatar: 'https://picsum.photos/seed/youssef/100', points: '3.1k', level: '18' },
    { id: 's6', name: 'مريم محمود', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary', points: '4.8k', level: '21' }
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeChat) return;
    
    if (editingMessageId) {
      setActiveChat(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: prev.messages.map(m => m.id === editingMessageId ? { ...m, text: inputText, isEdited: true } : m)
        };
      });
      setEditingMessageId(null);
      setInputText('');
      return;
    }

    const userMsgText = inputText;
    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      seenBy: [],
      reactions: [],
      replyToId: replyToMessage?.id
    };

    setActiveChat(prev => prev ? { ...prev, messages: [...prev.messages, userMsg] } : null);
    setInputText('');
    setReplyToMessage(null);

    if (activeChat.type === 'ai') {
      const resp = await getSmartTutorResponse(userMsgText, user.track === 'أزهري' ? 'منهج أزهري' : 'منهج عام');
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'ai',
        senderName: 'AZHRT AI',
        senderAvatar: activeChat.avatar,
        text: resp,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        seenBy: [],
        reactions: []
      };
      setActiveChat(prev => prev ? { ...prev, messages: [...prev.messages, aiMsg] } : null);
    }
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    setActiveChat(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: prev.messages.map(m => {
          if (m.id !== msgId) return m;
          const reactionIndex = m.reactions.findIndex(r => r.emoji === emoji);
          if (reactionIndex > -1) {
            const hasUserReacted = m.reactions[reactionIndex].users.includes(user.id);
            if (hasUserReacted) {
              const newUsers = m.reactions[reactionIndex].users.filter(u => u !== user.id);
              const newReactions = [...m.reactions];
              if (newUsers.length === 0) {
                newReactions.splice(reactionIndex, 1);
              } else {
                newReactions[reactionIndex] = { ...newReactions[reactionIndex], count: newUsers.length, users: newUsers };
              }
              return { ...m, reactions: newReactions };
            } else {
              const newReactions = [...m.reactions];
              newReactions[reactionIndex] = { ...newReactions[reactionIndex], count: newReactions[reactionIndex].count + 1, users: [...newReactions[reactionIndex].users, user.id] };
              return { ...m, reactions: newReactions };
            }
          }
          return { ...m, reactions: [...m.reactions, { emoji, count: 1, users: [user.id] }] };
        })
      };
    });
    setMessageActionId(null);
  };

  const handleDeleteMessage = (msgId: string) => {
    setActiveChat(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: prev.messages.map(m => m.id === msgId ? { ...m, text: 'تم حذف هذه الرسالة', isDeleted: true } : m)
      };
    });
    setMessageActionId(null);
  };

  const handleEditMessage = (msg: Message) => {
    setEditingMessageId(msg.id);
    setInputText(msg.text);
    setMessageActionId(null);
  };

  if (activeChat) {
    return (
      <div className="h-full flex flex-col bg-[#030308] animate-in slide-in-from-left duration-500 relative">
        <header className="h-20 bg-[#0A0A1F]/90 backdrop-blur-xl border-b border-white/5 px-4 flex items-center justify-between z-[100]">
           <div className="flex items-center gap-3">
              <button onClick={() => {setActiveChat(null); setReplyToMessage(null);}} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white active:scale-90 transition-all">
                <ArrowRight size={20} />
              </button>
              <img src={activeChat.avatar} className="w-11 h-11 rounded-2xl border border-white/10 object-cover" />
              <div>
                <h3 className="text-sm font-black text-white">{activeChat.name}</h3>
                <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest">{activeChat.type === 'ai' ? 'خبير ذكي متصل' : 'متصل الآن'}</p>
              </div>
           </div>
           <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400"><MoreVertical size={20} /></button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar bg-[#030308]">
           {activeChat.messages.map((msg) => {
             const repliedMsg = activeChat.messages.find(m => m.id === msg.replyToId);
             return (
               <div key={msg.id} className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'} group relative`}>
                  {msg.senderId !== user.id && (
                    <span className="text-[11px] font-black text-slate-500 mb-2 mr-1 flex items-center gap-1">
                      {msg.senderName} {msg.senderId === 'ai' && <Sparkles size={10} className="text-cyan-400" />}
                    </span>
                  )}
                  
                  <div className="flex items-center gap-2 max-w-[90%] relative group/msg">
                     {/* Interaction Menu (Left for User, Right for Others) */}
                     <div className={`flex flex-col gap-1 transition-opacity ${msg.senderId === user.id ? 'order-first' : 'order-last'}`}>
                        <button onClick={() => setReplyToMessage(msg)} className="p-2 text-slate-600 hover:text-cyan-400 transition-colors"><Reply size={16} /></button>
                        {msg.senderId === user.id && !msg.isDeleted && (
                          <button onClick={() => setMessageActionId(messageActionId === msg.id ? null : msg.id)} className="p-2 text-slate-600 hover:text-white transition-colors"><MoreVertical size={16} /></button>
                        )}
                     </div>

                     <div className={`p-1 rounded-[30px] ${msg.senderId === user.id ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                        <div className={`p-4 rounded-[28px] shadow-2xl relative transition-all border
                          ${msg.senderId === user.id 
                            ? 'bg-cyan-500 text-black border-cyan-400/30 rounded-tr-none' 
                            : 'bg-[#121230] text-white border-white/5 rounded-tl-none'}
                          ${msg.isDeleted ? 'opacity-40 italic' : ''}`}>
                          
                          {/* Reply Context */}
                          {repliedMsg && (
                            <div className={`mb-3 p-3 rounded-2xl border-l-4 text-[13px] line-clamp-2 ${msg.senderId === user.id ? 'bg-black/10 border-black/20 text-black/70' : 'bg-white/5 border-cyan-500 text-slate-400'}`}>
                              <p className="font-black text-[10px] mb-1">{repliedMsg.senderName}</p>
                              {repliedMsg.text}
                            </div>
                          )}

                          <p className="text-[16px] leading-[1.6] font-bold">{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1 opacity-40">
                             {msg.isEdited && <span className="text-[8px] font-black uppercase tracking-tighter">عدلت</span>}
                             <span className="text-[9px] font-bold">{msg.timestamp}</span>
                          </div>

                          {/* Reactions Display */}
                          {msg.reactions.length > 0 && (
                            <div className="absolute -bottom-3 left-2 flex gap-1">
                               {msg.reactions.map((r, i) => (
                                 <button key={i} onClick={() => handleAddReaction(msg.id, r.emoji)} className="bg-[#0A0A1F] border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-xl hover:scale-110 transition-transform">
                                    <span className="text-[10px]">{r.emoji}</span>
                                    {r.count > 1 && <span className="text-[9px] font-black text-white">{r.count}</span>}
                                 </button>
                               ))}
                            </div>
                          )}
                        </div>
                     </div>

                     {/* Action Popover (Edit/Delete/Emojis) */}
                     {messageActionId === msg.id && (
                       <div className={`absolute -top-14 z-[150] bg-[#121230] border border-white/10 rounded-[25px] flex items-center p-2 shadow-2xl animate-in zoom-in-95 ${msg.senderId === user.id ? 'right-0' : 'left-0'}`}>
                          <div className="flex gap-2 border-l border-white/10 pl-2 ml-2">
                             {['❤️', '👍', '😂', '🔥', '😮'].map(e => (
                               <button key={e} onClick={() => handleAddReaction(msg.id, e)} className="text-lg hover:scale-125 transition-transform">{e}</button>
                             ))}
                          </div>
                          {msg.senderId === user.id && (
                            <>
                              <button onClick={() => handleEditMessage(msg)} className="p-2 text-yellow-500 hover:bg-white/5 rounded-xl"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeleteMessage(msg.id)} className="p-2 text-red-500 hover:bg-white/5 rounded-xl"><Trash2 size={16} /></button>
                            </>
                          )}
                       </div>
                     )}
                  </div>
               </div>
             );
           })}
           <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 bg-[#0A0A1F]/95 backdrop-blur-2xl border-t border-white/5 z-[100]">
           {replyToMessage && (
             <div className="flex items-center justify-between px-5 py-3 bg-cyan-500/10 rounded-t-3xl border-x border-t border-cyan-500/20 mb-[-5px] animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3">
                   <Reply size={14} className="text-cyan-400" />
                   <div className="text-[11px]">
                      <span className="font-black text-cyan-400 block">الرد على {replyToMessage.senderName}</span>
                      <p className="text-slate-500 truncate max-w-[200px]">{replyToMessage.text}</p>
                   </div>
                </div>
                <button onClick={() => setReplyToMessage(null)} className="text-slate-500"><X size={16} /></button>
             </div>
           )}
           <div className="bg-slate-900/50 rounded-[30px] border border-white/5 p-2 flex items-center gap-2 relative z-10">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500"><Plus size={20} /></button>
              <input 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
                placeholder={editingMessageId ? "عدل رسالتك..." : "اكتب رسالتك الإمبراطورية..."}
                className="flex-grow bg-transparent border-none outline-none text-[16px] text-white px-2 placeholder:text-slate-600" 
              />
              <button onClick={handleSendMessage} disabled={!inputText.trim()} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${inputText.trim() ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 active:scale-90' : 'bg-slate-800 text-slate-500'}`}><Send size={20} /></button>
           </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#030308] pb-32 animate-in fade-in duration-1000 overflow-x-hidden relative">
      <div className="p-8 space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black text-white tracking-tighter">ساحة <span className="text-cyan-400">الأبطال</span></h2>
            <button onClick={() => setActiveTab('requests')} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 relative">
               <Bell size={24} />
               {user.pendingFriendRequests.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-black flex items-center justify-center text-white border-2 border-[#030308]">{user.pendingFriendRequests.length}</span>}
            </button>
         </div>
         
         <div className="bg-[#0A0A1F] p-1.5 rounded-[25px] border border-white/5 flex gap-1 shadow-2xl">
            {['chats', 'friends'].map((t) => (
              <button key={t} onClick={() => setActiveTab(t as MainTab)} className={`flex-1 py-3.5 rounded-[20px] transition-all text-center text-[11px] font-black uppercase tracking-widest ${activeTab === t ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500'}`}>
                {t === 'chats' ? 'المحادثات' : 'أصدقائي'}
              </button>
            ))}
         </div>

         <div className="relative group">
            <div className="absolute inset-y-0 right-4 flex items-center text-slate-500 group-focus-within:text-cyan-400"><Search size={18} /></div>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن أبطال أو مجموعات..." className="w-full bg-[#0A0A1F] border border-white/5 rounded-[25px] py-4 pr-12 pl-6 text-sm text-white focus:border-cyan-500/50 outline-none transition-all shadow-inner" />
         </div>
      </div>

      {activeTab === 'chats' && (
        <>
          <section className="mb-10">
             <div className="flex items-center justify-between mb-6 px-8">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <HeartHandshake size={14} className="text-red-500" /> أبطال قد تعرفهم
                </h3>
             </div>
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-8">
                {suggestedStudents.map(student => (
                  <div key={student.id} className="flex-shrink-0 w-32 bg-[#0A0A1F] p-4 rounded-[30px] border border-white/5 flex flex-col items-center gap-3 active:scale-95 transition-all">
                     <div className="relative">
                        <img src={student.avatar} className="w-16 h-16 rounded-2xl border-2 border-white/10 object-cover" />
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-lg border-2 border-[#0A0A1F]">LVL {student.level}</div>
                     </div>
                     <p className="text-[11px] font-black text-white text-center truncate w-full">{student.name}</p>
                     <button className="w-full py-1.5 rounded-xl bg-cyan-500 text-black flex items-center justify-center gap-1 active:scale-90 shadow-lg shadow-cyan-500/10">
                        <UserPlus size={12} /> <span className="text-[9px] font-black">إضافة</span>
                     </button>
                  </div>
                ))}
             </div>
          </section>

          <section className="px-6 space-y-3">
             <div className="flex items-center gap-4 mb-4 px-2"><MessageSquare size={16} className="text-slate-500" /><h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">محادثاتك الأخيرة</h3></div>
             {chats.map(chat => (
               <button key={chat.id} onClick={() => setActiveChat(chat)} className="w-full bg-[#0A0A1F] p-5 rounded-[35px] border border-white/5 flex items-center justify-between group hover:bg-slate-900 transition-all shadow-xl active:scale-95 relative overflow-hidden">
                  <div className="flex items-center gap-5">
                     <div className="relative">
                        <img src={chat.avatar} className="w-14 h-14 rounded-2xl border border-white/10 object-cover" />
                        {chat.type === 'ai' && <div className="absolute -top-1 -right-1 bg-cyan-500 w-5 h-5 rounded-lg flex items-center justify-center text-black shadow-lg"><Sparkles size={10} fill="currentColor" /></div>}
                     </div>
                     <div className="text-right">
                        <h4 className="text-sm font-black text-white">{chat.name}</h4>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 italic">{chat.lastMessage}</p>
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="text-[8px] text-slate-700 font-bold">{chat.lastMessageTime}</span>
                     {chat.unreadCount > 0 && <span className="bg-cyan-500 text-black text-[8px] font-black px-2 py-0.5 rounded-full">{chat.unreadCount}</span>}
                  </div>
               </button>
             ))}
          </section>
        </>
      )}

      {/* FAB Menu */}
      <div className="fixed bottom-28 left-8 z-[200]">
         {showFabMenu && (
           <div className="mb-4 space-y-3 animate-in slide-in-from-bottom duration-300">
              <button className="flex items-center gap-3 bg-[#0A0A1F] border border-cyan-500/30 p-4 rounded-2xl shadow-2xl text-cyan-400 group w-44">
                 <Users size={18} /><span className="text-[10px] font-black uppercase">إنشاء مجموعة</span>
              </button>
           </div>
         )}
         <button onClick={() => setShowFabMenu(!showFabMenu)} className={`w-14 h-14 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all ${showFabMenu ? 'rotate-45' : ''}`}>
            <Plus size={28} />
         </button>
      </div>
    </div>
  );
};
