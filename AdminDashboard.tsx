
import React, { useState, useMemo } from 'react';
import { 
  Users, ShieldCheck, Trash2, Search, ArrowRight, Zap, 
  Crown, Filter, Edit3, Megaphone, TrendingUp, DollarSign
} from 'lucide-react';
import { User, UserRole } from './types';
import { getAllUsers, updateGlobalUser, broadcastAnnouncement } from './database';

interface AdminDashboardProps {
  user: User;
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack }) => {
  const [users, setUsers] = useState<User[]>(getAllUsers());
  const [search, setSearch] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [pointsInput, setPointsInput] = useState<string>('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.phone?.includes(search)
  );

  const stats = useMemo(() => {
    return {
      totalPoints: users.reduce((acc, curr) => acc + curr.points, 0),
      avgPoints: Math.round(users.reduce((acc, curr) => acc + curr.points, 0) / users.length),
      staffCount: users.filter(u => u.role !== UserRole.STUDENT).length
    };
  }, [users]);

  const handleRoleChange = (targetUser: User, newRole: UserRole) => {
    const updated = { ...targetUser, role: newRole };
    updateGlobalUser(updated);
    setUsers(getAllUsers());
  };

  const handleUpdatePoints = () => {
    if (editingUser && pointsInput) {
      const updated = { ...editingUser, points: parseInt(pointsInput) };
      updateGlobalUser(updated);
      setUsers(getAllUsers());
      setEditingUser(null);
      setPointsInput('');
    }
  };

  const handleBroadcast = () => {
    if (announcementText.trim()) {
      broadcastAnnouncement(announcementText);
      alert('تم بث الإعلان بنجاح لجميع الأبطال!');
      setAnnouncementText('');
    }
  };

  return (
    <div className="min-h-full bg-[#010103] pb-32 font-['Tajawal'] animate-in fade-in duration-700">
      <header className="p-8 pt-12 flex items-center justify-between border-b border-white/5 bg-[#0A0A1F]/50 backdrop-blur-xl sticky top-0 z-50">
        <button onClick={onBack} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
          <ArrowRight size={24} className="rotate-180" />
        </button>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <h2 className="text-2xl font-black text-white">إدارة الإمبراطورية</h2>
            <ShieldCheck size={24} className="text-yellow-500" />
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">القوة الكاملة للمدير</p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="p-6 grid grid-cols-3 gap-3">
        <div className="bg-white/[0.02] p-4 rounded-3xl border border-white/5 text-center">
           <Zap size={16} className="text-cyan-400 mx-auto mb-2" />
           <span className="block text-lg font-black text-white">{stats.totalPoints.toLocaleString()}</span>
           <span className="text-[8px] text-slate-500 uppercase font-black">XP إجمالي</span>
        </div>
        <div className="bg-white/[0.02] p-4 rounded-3xl border border-white/5 text-center">
           <Users size={16} className="text-blue-400 mx-auto mb-2" />
           <span className="block text-lg font-black text-white">{users.length}</span>
           <span className="text-[8px] text-slate-500 uppercase font-black">أبطال نشطون</span>
        </div>
        <div className="bg-white/[0.02] p-4 rounded-3xl border border-white/5 text-center">
           <Crown size={16} className="text-yellow-500 mx-auto mb-2" />
           <span className="block text-lg font-black text-white">{stats.staffCount}</span>
           <span className="text-[8px] text-slate-500 uppercase font-black">فريق الإدارة</span>
        </div>
      </section>

      {/* Broadcast Section */}
      <section className="px-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 rounded-[35px] border border-yellow-500/20">
           <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4">
              <Megaphone size={18} className="text-yellow-500" /> بث إعلان عام
           </h3>
           <div className="flex gap-2">
              <input 
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="اكتب رسالة تظهر لجميع المستخدمين..." 
                className="flex-grow bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-white text-right outline-none focus:border-yellow-500/30 font-bold"
                dir="rtl"
              />
              <button onClick={handleBroadcast} className="w-14 h-14 bg-yellow-500 text-black rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/10 active:scale-95 transition-all">
                 <Zap size={24} />
              </button>
           </div>
        </div>
      </section>

      {/* User Management List */}
      <div className="px-6 space-y-4">
        <div className="relative mb-4">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن بطل للتحكم في نقاطه أو رتبته..." 
            className="w-full bg-white/[0.03] border border-white/5 rounded-[25px] p-5 pr-14 text-white text-right outline-none focus:border-cyan-500/30 transition-all font-bold"
            dir="rtl"
          />
        </div>

        {filteredUsers.map(u => (
          <div key={u.id} className="bg-white/[0.015] border border-white/5 p-6 rounded-[40px] flex items-center justify-between group hover:bg-white/[0.03] transition-all">
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditingUser(u); setPointsInput(u.points.toString()); }}
                className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all"
              >
                <Edit3 size={18} />
              </button>
              <div className="relative">
                <select 
                  value={u.role}
                  onChange={(e) => handleRoleChange(u, e.target.value as UserRole)}
                  className="bg-[#0A0A1F] text-[10px] font-black text-cyan-400 border border-white/10 rounded-xl px-4 py-2 outline-none appearance-none cursor-pointer pr-8"
                >
                  <option value={UserRole.STUDENT}>طالب</option>
                  <option value={UserRole.MODERATOR}>مشرف</option>
                  <option value={UserRole.ADMIN}>مدير</option>
                </select>
                <Filter size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <h4 className="text-sm font-black text-white">{u.name}</h4>
                <p className="text-[10px] text-cyan-400 font-black">{u.points.toLocaleString()} XP</p>
              </div>
              <img src={u.avatar} className="w-12 h-12 rounded-2xl bg-black border border-white/5" />
            </div>
          </div>
        ))}
      </div>

      {/* Points Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in duration-300">
           <div className="bg-[#0A0A1F] border border-white/10 rounded-[45px] p-8 w-full max-w-sm space-y-6 text-center shadow-2xl">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-[30px] flex items-center justify-center text-cyan-400 mx-auto border border-cyan-500/20">
                 <TrendingUp size={40} />
              </div>
              <h3 className="text-xl font-black text-white">تعديل نقاط {editingUser.name}</h3>
              <div className="space-y-4">
                 <input 
                   type="number"
                   value={pointsInput}
                   onChange={(e) => setPointsInput(e.target.value)}
                   className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-center text-3xl font-black text-white outline-none focus:border-cyan-500"
                 />
                 <div className="flex gap-3">
                    <button onClick={() => setEditingUser(null)} className="flex-1 py-4 bg-white/5 text-slate-400 font-black rounded-2xl">إلغاء</button>
                    <button onClick={handleUpdatePoints} className="flex-1 py-4 bg-cyan-500 text-black font-black rounded-2xl shadow-xl shadow-cyan-500/20">حفظ النقاط</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
