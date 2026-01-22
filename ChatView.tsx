
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Send, ArrowRight, MoreVertical, Plus, Image as ImageIcon, 
  CheckCheck, X, Bell, Shield, Trash2, Info, User as UserIcon, Smile,
  UserPlus, ShieldCheck, UserCheck, ShieldAlert, LogOut
} from 'lucide-react';
import { User, Chat, Message, UserRole } from './types';
import { getSmartTutorResponse } from './geminiService';
import { getAllUsers } from './database';

interface ChatViewProps {
  user: User;
  chat: Chat;
  onBack: () => void;
  onUpdateChat?: (updatedChat: Chat) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ user, chat, onBack, onUpdateChat }) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isStaff = user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR;
  const reactionsList = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  const currentMembers = useMemo(() => {
    if (chat.type !== 'group') return [];
    const all = getAllUsers();
    return all.filter(u => chat.members.includes(u.id));
  }, [chat.members, chat.type]);

  const nonMembersFriends = useMemo(() => {
    const all = getAllUsers();
    return all.filter(u => user.friendIds.includes(u.id) && !chat.members.includes(u.id));
  }, [user.friendIds, chat.members]);

  const isOwner = chat.ownerId === user.id;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  const getTime = () => new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  const handleSendMessage = async (media?: string) => {
    if (!inputText.trim() && !media) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: inputText,
      mediaUrl: media,
      timestamp: getTime(),
      seenBy: [],
      reactions: []
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');

    onUpdateChat?.({ ...chat, messages: newMessages, lastMessage: media ? 'صورة 🖼️' : inputText, lastMessageTime: 'الآن' });

    if (chat.type === 'ai' && !media) {
      setIsAiTyping(true);
      const resp = await getSmartTutorResponse(inputText, 'المنهج الإمبراطوري');
      setIsAiTyping(false);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'ai',
        senderName: 'Oracle',
        senderAvatar: chat.avatar,
        text: resp,
        timestamp: getTime(),
        seenBy: [],
        reactions: []
      };

      const withAiMessages = [...newMessages, aiMsg];
      setMessages(withAiMessages);
      onUpdateChat?.({ ...chat, messages: withAiMessages, lastMessage: resp, lastMessageTime: 'الآن' });
    }
  };

  const handleDeleteMessage = (msgId: string) => {
    if (confirm('هل تريد حذف هذه الرسالة من المحادثة؟')) {
      const updatedMessages = messages.filter(m => m.id !== msgId);
      setMessages(updatedMessages);
      onUpdateChat?.({ ...chat, messages: updatedMessages });
    }
  };

  const handleAddMember = (friendId: string) => {
    if (isOwner) {
      const updatedChat = { ...chat, members: [...chat.members, friendId] };
      onUpdateChat?.(updatedChat);
      alert("تمت إضافة البطل للمجموعة مباشرة.");
    } else {
      alert("تم إرسال اقتراح دعوة الصديق للمدير للموافقة.");
    }
    setShowAddMember(false);
  };

  const handleApproveJoin = (requesterId: string) => {
    const updatedChat = {
      ...chat,
      members: [...chat.members, requesterId],
      pendingJoinRequests: chat.pendingJoinRequests?.filter(id => id !== requesterId)
    };
    onUpdateChat?.(updatedChat);
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    const updatedMessages = messages.map(m => {
      if (m.id === msgId) {
        const existingReaction = m.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          if (existingReaction.users.includes(user.id)) {
            return {
              ...m,
              reactions: m.reactions.map(r => 
                r.emoji === emoji 
                ? { ...r, count: r.count - 1, users: r.users.filter(uid => uid !== user.id) }
                : r
              ).filter(r => r.count > 0)
            };
          } else {
            return {
              ...m,
              reactions: m.reactions.map(r => 
                r.emoji === emoji 
                ? { ...r, count: r.count + 1, users: [...r.users, user.id] }
                : r
              )
            };
          }
        } else {
          return {
            ...m,
            reactions: [...m.reactions, { emoji, count: 1, users: [user.id] }]
          };
        }
      }
      return m;
    });
    setMessages(updatedMessages);
    setShowEmojiPicker(null);
    onUpdateChat?.({ ...chat, messages: updatedMessages });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSendMessage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-[#0b0b14] flex flex-col animate-in slide-in-from-left duration-500 overflow-hidden font-['Tajawal']">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>

      {/* Header */}
      <header className="h-20 bg-[#121221]/95 backdrop-blur-xl border-b border-white/5 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 text-slate-400 active:scale-90 transition-all">
            <ArrowRight size={32} className="rotate-180" />
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowInfo(true)}>
            <div className="relative">
              <img src={chat.avatar} className="w-12 h-12 rounded-full border border-white/10 bg-black" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#121221]"></div>
            </div>
            <div className="text-right">
              <h3 className="text-[16px] font-bold text-white leading-tight">{chat.name}</h3>
              <p className="text-[11px] text-cyan-400 font-medium">{chat.type === 'ai' ? 'متصل الآن - ذكاء اصطناعي' : 'متصل حالياً'}</p>
            </div>
          </div>
        </div>
        <button onClick={() => setShowInfo(true)} className="w-11 h-11 rounded-full flex items-center justify-center text-slate-400 hover:bg-white/5 transition-all active:scale-90">
          <MoreVertical size={28} />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar pb-32 relative z-10">
        {messages.map((msg) => {
          const isMe = msg.senderId === user.id;
          const hasReactions = msg.reactions.length > 0;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}>
              <div className={`max-w-[85%] px-3 py-2 shadow-lg relative group/msg ${isMe ? 'bg-[#005c4b] text-white rounded-2xl rounded-tr-none' : 'bg-[#202c33] text-slate-200 rounded-2xl rounded-tl-none'}`}>
                <div className="cursor-pointer" onDoubleClick={() => setShowEmojiPicker(msg.id)}>
                  {msg.mediaUrl && <div className="mb-2 rounded-xl overflow-hidden border border-black/20"><img src={msg.mediaUrl} className="max-w-full h-auto object-cover max-h-[300px]" alt="Shared" /></div>}
                  {chat.type === 'group' && !isMe && <p className="text-[10px] font-black text-cyan-400 mb-1">{msg.senderName}</p>}
                  <p className="text-[14px] leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</p>
                </div>
                
                <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                  <span className="text-[9px] font-medium">{msg.timestamp}</span>
                  {isMe && <CheckCheck size={16} className="text-cyan-400" />}
                </div>

                {/* Staff Actions Tooltip */}
                {(isMe || isStaff) && (
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute -top-4 -right-8 p-2 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover/msg:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-xl"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                {hasReactions && (
                  <div className={`absolute -bottom-3 ${isMe ? 'right-2' : 'left-2'} flex gap-1 bg-[#121221] border border-white/10 rounded-full px-2 py-0.5 shadow-xl z-20`}>
                    {msg.reactions.map((r, i) => <span key={i} className="text-[10px] flex items-center gap-0.5">{r.emoji} <span className="text-[8px] font-black">{r.count > 1 ? r.count : ''}</span></span>)}
                  </div>
                )}
                <button onClick={() => setShowEmojiPicker(msg.id)} className={`absolute -top-4 ${isMe ? '-left-8' : '-right-8'} p-2 bg-black/20 text-slate-500 rounded-full opacity-0 group-hover/msg:opacity-100 transition-opacity hover:text-white`}><Smile size={18} /></button>
                {showEmojiPicker === msg.id && (
                  <div className={`absolute -top-12 ${isMe ? 'right-0' : 'left-0'} flex gap-1 bg-[#1a1a2e] border border-white/20 p-2 rounded-2xl shadow-2xl animate-in zoom-in z-[100]`}>
                    {reactionsList.map(e => <button key={e} onClick={() => handleAddReaction(msg.id, e)} className="text-lg hover:scale-125 transition-transform p-1">{e}</button>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="fixed bottom-0 inset-x-0 p-4 bg-[#121221] z-[100] border-t border-white/5">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-grow bg-[#2a2a3d] rounded-[30px] px-4 py-3 flex items-center gap-3 shadow-inner border border-white/5">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"><Plus size={32} /></button>
            <input value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="اكتب رسالة..." className="flex-grow bg-transparent border-none outline-none text-white px-2 text-right text-[15px] font-medium" dir="rtl" />
            <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"><ImageIcon size={32} /></button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
          <button onClick={() => handleSendMessage()} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-[#00a884] text-white shadow-lg scale-105' : 'bg-slate-700 text-slate-500 opacity-50'}`}>
            <Send size={32} className="mr-1" />
          </button>
        </div>
      </footer>

      {/* Info Sidebar ... */}
    </div>
  );
};
