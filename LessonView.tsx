
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Play, Pause, RotateCcw, Award, MessageSquare, 
  Share2, ThumbsUp, Send, CheckCircle2, XCircle, ChevronLeft,
  Lock, Zap, Users, FileText, Download, Sparkles, Trophy, Star
} from 'lucide-react';
import { Lesson, View, Comment } from './types';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (score: number) => void;
  setView: (v: View) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onComplete, setView }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoFinishedEnough, setVideoFinishedEnough] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [examPassed, setExamPassed] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [comments, setComments] = useState<Comment[]>([
    { id: '1', userName: 'أ. محمد العبقري', userAvatar: 'https://picsum.photos/seed/teacher/50', text: 'يا شباب، ركزوا جداً في الدقيقة 05:20 لأنها سؤال امتحان مؤكد!', timestamp: 'منذ ١٠ دقائق', likes: 42 },
    { id: '2', userName: 'سارة الطالبة', userAvatar: 'https://picsum.photos/seed/s1/50', text: 'أجمل شرح شفته في حياتي، المنصة فعلاً أزهرت في عقولنا.', timestamp: 'منذ ساعة', likes: 18 }
  ]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p || 0);
      if (p >= 80) setVideoFinishedEnough(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      userName: 'أنت البطل',
      userAvatar: 'https://picsum.photos/seed/hero/50',
      text: newComment,
      timestamp: 'الآن',
      likes: 0
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const submitExam = (passed: boolean) => {
    setExamPassed(passed);
    setScore(passed ? 95 : 35);
    if (passed) onComplete(95);
  };

  if (showExam) {
    return (
      <div className="fixed inset-0 bg-[#030308] z-[300] p-6 flex flex-col items-center justify-center animate-in zoom-in duration-500 overflow-y-auto">
         <div className="max-w-md w-full space-y-8 py-10">
            {examPassed === null ? (
              <div className="text-center space-y-8">
                <div className="relative inline-block">
                  <div className="absolute -inset-6 bg-cyan-500/20 blur-2xl rounded-full animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[35px] flex items-center justify-center text-white shadow-2xl">
                    <Trophy size={48} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 leading-tight">اختبار الجدارة</h3>
                  <p className="text-slate-500 text-xs font-bold px-4">أجب بتركيز، مطلوب 80% لفتح المرحلة القادمة</p>
                </div>
                
                <div className="space-y-6">
                   {[
                     "أي من الكلمات الآتية اسم مبني؟",
                     "ما علامة الرفع الأصلية في الأسماء؟"
                   ].map((q, i) => (
                     <div key={i} className="bg-[#0A0A1F] border border-white/5 p-6 rounded-[35px] text-right space-y-4 shadow-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black">{i+1}</span>
                           <p className="text-white font-bold text-sm">{q}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                           <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-slate-400 text-right hover:border-cyan-500/50 transition-all">الخيار الأول المتاح</button>
                           <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-slate-400 text-right hover:border-cyan-500/50 transition-all">الخيار الثاني المتاح</button>
                        </div>
                     </div>
                   ))}
                </div>
                <button 
                  onClick={() => submitExam(true)}
                  className="w-full py-5 rounded-[30px] bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-2xl shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  إرسال الإجابات النهائية
                </button>
              </div>
            ) : examPassed ? (
              <div className="text-center space-y-10 animate-in zoom-in duration-700">
                <div className="relative inline-block">
                   <div className="absolute -inset-10 bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
                   <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 border-4 border-green-500/30 relative">
                      <CheckCircle2 size={70} />
                   </div>
                </div>
                <div className="space-y-2">
                   <h3 className="text-4xl font-black text-white">إنجاز عظيم!</h3>
                   <p className="text-green-400 font-black text-lg">لقد حصلت على {score}%</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                   <button onClick={onBack} className="py-5 bg-white text-black rounded-[30px] font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                      المرحلة القادمة <ChevronLeft size={20} />
                   </button>
                   <button onClick={() => setExamPassed(null)} className="text-slate-500 font-bold text-xs underline">إعادة المحاولة للتحسين</button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-10 animate-in shake duration-500">
                <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto shadow-2xl border-4 border-red-500/30">
                   <XCircle size={70} />
                </div>
                <div>
                   <h3 className="text-4xl font-black text-white mb-2">حاول مجدداً</h3>
                   <p className="text-red-400 font-black">درجتك {score}% (المطلوب 80%)</p>
                </div>
                <button onClick={() => setExamPassed(null)} className="w-full py-5 bg-white/10 border border-white/10 text-white rounded-[30px] font-black hover:bg-white/20 active:scale-95 transition-all">
                   إعادة محاولة الاختبار فوراً
                </button>
              </div>
            )}
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#030308] pb-32 animate-in fade-in duration-700 overflow-x-hidden">
      
      {/* Cinematic Video Player for Small Screens */}
      <div className="relative aspect-video bg-black group z-50">
         <video 
          ref={videoRef}
          src={lesson.videoUrl} 
          className="w-full h-full object-contain"
          onClick={togglePlay}
          playsInline
         />
         
         <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
            <div className="flex items-center gap-3">
               <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-all p-1">
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
               </button>
               <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" style={{ width: `${progress}%` }}></div>
               </div>
               <span className="text-[10px] font-black text-white/70">{Math.floor(progress)}%</span>
            </div>
         </div>

         <button onClick={onBack} className="absolute top-6 right-4 w-10 h-10 bg-black/40 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/10 z-20">
            <ArrowRight size={20} />
         </button>
      </div>

      <div className="p-6 md:p-10">
         {/* Lesson Header */}
         <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 uppercase tracking-widest">المحاضرة الذكية</span>
              {lesson.isCompleted && <CheckCircle2 size={14} className="text-green-500" />}
            </div>
            <h2 className="text-2xl font-black text-white leading-tight tracking-tight">{lesson.title}</h2>
            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold">
               <div className="flex items-center gap-1"><Users size={12} /> 1.2k طالب يشاهد الآن</div>
               <div className="flex items-center gap-1 text-yellow-500"><Star size={12} fill="currentColor" /> 4.9 تقييم</div>
            </div>
         </div>

         {/* JABARA ACTION BUTTONS - GRID FOR MOBILE */}
         <div className="grid grid-cols-2 gap-3 mb-10">
            <button 
              onClick={() => setView('community')}
              className="group flex flex-col items-center justify-center gap-2 h-24 bg-[#0A0A1F] border border-white/5 rounded-[30px] hover:border-blue-500/30 transition-all active:scale-95"
            >
               <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <MessageSquare size={20} />
               </div>
               <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">مجتمع الأبطال</span>
            </button>

            <button 
              disabled={!videoFinishedEnough}
              onClick={() => setShowExam(true)}
              className={`group flex flex-col items-center justify-center gap-2 h-24 rounded-[30px] transition-all active:scale-95 ${videoFinishedEnough ? 'bg-cyan-500 shadow-xl shadow-cyan-500/20' : 'bg-slate-900/50 border border-white/5 opacity-50'}`}
            >
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${videoFinishedEnough ? 'bg-black/10 text-black animate-bounce' : 'bg-slate-800 text-slate-500'}`}>
                  {videoFinishedEnough ? <Zap size={20} fill="currentColor" /> : <Lock size={20} />}
               </div>
               <span className={`text-[9px] font-black uppercase tracking-widest ${videoFinishedEnough ? 'text-black' : 'text-slate-500'}`}>
                 {videoFinishedEnough ? 'بدء الامتحان' : 'شاهد 80% للبدء'}
               </span>
            </button>
         </div>

         {/* Description */}
         <div className="mb-10 bg-white/5 p-6 rounded-[35px] border border-white/5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">عن المحاضرة</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.description || 'وصف تعليمي دقيق ومبسط يساعدك على فهم أعمق لمحتوى المادة العلمية.'}</p>
         </div>

         {/* DIGITAL LIBRARY (FILES) */}
         <section className="mb-12">
            <div className="flex items-center justify-between mb-6 px-2">
               <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <FileText size={16} className="text-purple-500" />
                  تحميل المذكرات
               </h3>
               <span className="text-[8px] font-black text-slate-600 uppercase">PDF FORMAT</span>
            </div>
            <div className="space-y-3">
               {[
                 { title: 'مذكرة النحو - الجزء الأول', size: '3.5 MB' },
                 { title: 'خرائط ذهنية للمراجعة', size: '1.2 MB' }
               ].map((file, i) => (
                 <div key={i} className="p-5 bg-[#0A0A1F] rounded-[28px] border border-white/5 flex items-center justify-between hover:bg-slate-900 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                          <FileText size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-white">{file.title}</p>
                          <p className="text-[8px] text-slate-600 font-bold uppercase">{file.size}</p>
                       </div>
                    </div>
                    <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/5 hover:bg-cyan-500 hover:text-black transition-all">
                       <Download size={18} />
                    </button>
                 </div>
               ))}
            </div>
         </section>

         {/* JABARA COMMENTS SECTION */}
         <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
               <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Users size={16} className="text-cyan-500" />
                  نقاشات الأبطال
               </h3>
               <span className="text-[10px] font-black text-slate-600">{comments.length} تعليق</span>
            </div>

            <div className="relative group">
               <input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="عندك سؤال؟ اسأل معلمك الآن..."
                  className="w-full bg-[#0A0A1F] border border-white/10 rounded-[30px] p-5 pr-6 text-xs text-white focus:border-cyan-500 outline-none transition-all pl-16 shadow-inner"
               />
               <button 
                  onClick={handleSendComment}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-cyan-500 text-black rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all"
               >
                  <Send size={18} />
               </button>
            </div>

            <div className="space-y-8 pt-4">
               {comments.map((comment) => (
                 <div key={comment.id} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                       <img src={comment.userAvatar} className="w-10 h-10 rounded-2xl object-cover border-2 border-white/10" />
                    </div>
                    <div className="flex-grow space-y-2">
                       <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-black text-white">{comment.userName}</h4>
                          <span className="text-[8px] text-slate-700 font-bold uppercase">{comment.timestamp}</span>
                       </div>
                       <div className="bg-white/5 p-5 rounded-[25px] rounded-tr-none border border-white/5 text-[11px] text-slate-300 leading-relaxed shadow-sm">
                          {comment.text}
                       </div>
                       <div className="flex items-center gap-5 px-2">
                          <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-600 hover:text-cyan-400 transition-colors">
                             <ThumbsUp size={12} /> {comment.likes}
                          </button>
                          <button className="text-[10px] font-black text-slate-600 hover:text-white transition-colors">رد</button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
};
