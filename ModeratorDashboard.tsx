
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Plus, Edit3, Trash2, ArrowRight, Layers, 
  Video, Target, CheckCircle, Zap, LayoutGrid, Star, PlusCircle
} from 'lucide-react';
import { User, Subject, Unit, Lesson, Track } from './types';
import { getGlobalCurriculum, updateGlobalCurriculum } from './database';

interface ModeratorDashboardProps {
  user: User;
  onBack: () => void;
}

export const ModeratorDashboard: React.FC<ModeratorDashboardProps> = ({ user, onBack }) => {
  const [subjects, setSubjects] = useState<Subject[]>(getGlobalCurriculum());
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [showAddSubject, setShowAddSubject] = useState(false);
  
  // New Subject Form State
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState('📚');

  const handleAddSubject = () => {
    if (!newTitle.trim()) return;
    const newSub: Subject = {
      id: `s-${Date.now()}`,
      title: newTitle,
      icon: newIcon,
      track: [Track.GENERAL, Track.AZHAR],
      units: []
    };
    const updated = [...subjects, newSub];
    setSubjects(updated);
    updateGlobalCurriculum(updated);
    setShowAddSubject(false);
    setNewTitle('');
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('هل تريد حذف هذه المادة وجميع دروسها نهائياً؟')) {
      const updated = subjects.filter(s => s.id !== id);
      setSubjects(updated);
      updateGlobalCurriculum(updated);
    }
  };

  return (
    <div className="min-h-full bg-[#010103] pb-32 font-['Tajawal'] animate-in fade-in duration-700">
      <header className="p-8 pt-12 flex items-center justify-between border-b border-white/5 bg-[#0A0A1F]/50 backdrop-blur-xl sticky top-0 z-50">
        <button onClick={activeSubject ? () => setActiveSubject(null) : onBack} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
          <ArrowRight size={24} className="rotate-180" />
        </button>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <h2 className="text-2xl font-black text-white">{activeSubject ? 'تعديل المسار' : 'إدارة المحتوى'}</h2>
            <Layers size={24} className="text-cyan-400" />
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">بوابة المشرف التعليمية</p>
        </div>
      </header>

      {!activeSubject ? (
        <div className="p-6 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-white">المواد الدراسية</h3>
              <button 
                onClick={() => setShowAddSubject(true)}
                className="bg-cyan-500 text-black px-6 py-3 rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-xl shadow-cyan-500/10 active:scale-95 transition-all"
              >
                 <Plus size={16} /> إضافة مادة جديدة
              </button>
           </div>
           
           <div className="grid grid-cols-1 gap-5">
              {subjects.map(s => (
                <div key={s.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-[45px] flex items-center justify-between group hover:bg-[#0A0A1F] transition-all">
                   <div className="flex gap-2">
                      <button onClick={() => setActiveSubject(s)} className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all shadow-inner"><Edit3 size={20} /></button>
                      <button onClick={() => handleDeleteSubject(s.id)} className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-inner"><Trash2 size={20} /></button>
                   </div>
                   <div className="flex items-center gap-4 text-right">
                      <div>
                         <h4 className="text-sm font-black text-white">{s.title}</h4>
                         <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{s.units.length} وحدات • جاهز للنشر</p>
                      </div>
                      <div className="w-16 h-16 bg-[#0A0A1F] rounded-[28px] flex items-center justify-center text-4xl border border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                         {s.icon}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      ) : (
        <div className="p-6 space-y-10 animate-in slide-in-from-left duration-500">
           {/* Units Management */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">هيكل مادة {activeSubject.title}</h3>
                 <button className="text-cyan-400 text-[10px] font-black bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20">+ إضافة وحدة دراسية</button>
              </div>

              {activeSubject.units.map((unit, uIdx) => (
                <div key={unit.id} className="bg-white/[0.015] border border-white/5 rounded-[45px] overflow-hidden shadow-2xl">
                   <div className="p-8 flex items-center justify-between bg-white/[0.03]">
                      <div className="flex gap-3">
                         <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-400 hover:text-white flex items-center justify-center"><Edit3 size={18}/></button>
                         <button className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center"><Trash2 size={18}/></button>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">الوحدة {uIdx + 1}</span>
                        <h4 className="text-lg font-black text-white">{unit.title}</h4>
                      </div>
                   </div>
                   <div className="p-6 space-y-3 bg-black/40">
                      {unit.lessons.map(lesson => (
                        <div key={lesson.id} className="p-5 bg-black/60 rounded-[30px] border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-slate-500 hover:text-cyan-400"><Edit3 size={16}/></button>
                              <button className="p-2 text-slate-500 hover:text-red-500"><Trash2 size={16}/></button>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-[10px] text-slate-500 font-bold tabular-nums">{lesson.duration}</span>
                              <h5 className="text-xs font-bold text-slate-300">{lesson.title}</h5>
                              <div className="w-10 h-10 bg-[#0A0A1F] rounded-xl flex items-center justify-center text-cyan-500/50"><Video size={18} /></div>
                           </div>
                        </div>
                      ))}
                      <button className="w-full py-5 border border-dashed border-white/10 rounded-[30px] text-[10px] font-black text-slate-600 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-3">
                         <PlusCircle size={18} /> إضافة درس فيديو لهذه الوحدة
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddSubject && (
        <div className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in duration-300 font-['Tajawal']">
           <div className="bg-[#0A0A1F] border border-white/10 rounded-[45px] p-8 w-full max-w-sm space-y-8 shadow-[0_0_80px_rgba(34,211,238,0.15)]">
              <div className="text-center space-y-2">
                 <h3 className="text-2xl font-black text-white">مادة جديدة</h3>
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">إضافة مسار تعليمي للأبطال</p>
              </div>

              <div className="space-y-6 text-right">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 mr-2 uppercase">عنوان المادة</label>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="مثلاً: التاريخ الحديث" className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white font-bold text-center outline-none focus:border-cyan-500 transition-all" dir="rtl" />
                 </div>
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 mr-2 uppercase">رمز المادة (إيموجي)</label>
                    <div className="grid grid-cols-5 gap-3">
                       {['📚', '🏺', '📐', '🔬', '🌍', '⚖️', '🧭', '🖋️', '📖', '🕌'].map(emoji => (
                         <button key={emoji} onClick={() => setNewIcon(emoji)} className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${newIcon === emoji ? 'bg-cyan-500 text-black shadow-xl' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                            {emoji}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button onClick={() => setShowAddSubject(false)} className="flex-1 py-5 bg-white/5 text-slate-400 font-black rounded-3xl">إلغاء</button>
                    <button onClick={handleAddSubject} className="flex-1 py-5 bg-cyan-500 text-black font-black rounded-3xl shadow-xl shadow-cyan-500/20 active:scale-95 transition-all">اعتماد المادة</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
