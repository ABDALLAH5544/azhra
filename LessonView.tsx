
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Play, Pause, Award, MessageSquare, 
  Send, CheckCircle2, XCircle, ChevronLeft,
  Lock, Zap, Users, FileText, Download, Sparkles, Trophy, Star, Brain,
  ListChecks, Map, Lightbulb, BookOpen, Volume2, Maximize, Settings, Eye,
  RefreshCcw, AlertCircle, ChevronRight, Share2, Bookmark
} from 'lucide-react';
import { Lesson, View, Comment } from './types';
import { getSmartTutorResponse, generateQuizQuestions } from './geminiService';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (score: number) => void;
  setView: (v: View) => void;
}

type LessonTab = 'overview' | 'ai' | 'discussion' | 'resources';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onComplete, setView }) => {
  const [activeTab, setActiveTab] = useState<LessonTab>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoFinishedEnough, setVideoFinishedEnough] = useState(false);
  
  // Exam States
  const [showExam, setShowExam] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [examPassed, setExamPassed] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // AI & UI States
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [comments, setComments] = useState<Comment[]>([
    { id: '1', userName: 'أ. عبدالله أيمن', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah', text: 'انتبهوا جيداً في الدقيقة 10:00، هناك قاعدة ذهبية ستوفر عليكم الكثير من العناء!', timestamp: 'منذ ١٠ دقائق', likes: 128 },
    { id: '2', userName: 'أحمد البطل', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', text: 'شرح أسطوري، أخيراً فهمت الفرق بين الاسم والفعل بوضوح.', timestamp: 'منذ ساعة', likes: 45 }
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

  const startExam = async () => {
    setIsGeneratingQuiz(true);
    setShowExam(true);
    const questions = await generateQuizQuestions(lesson.title, lesson.description);
    setQuizQuestions(questions);
    setIsGeneratingQuiz(false);
  };

  const handleAnswerSelect = (idx: number) => {
    if (showExplanation) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIdx] = idx;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setShowExplanation(false);
    } else {
      const correctCount = selectedAnswers.filter((ans, i) => ans === quizQuestions[i].correctIndex).length;
      const score = Math.round((correctCount / quizQuestions.length) * 100);
      setExamPassed(score >= 60);
      if (score >= 60) onComplete(score);
    }
  };

  const handleAiAsk = async (predefinedQ?: string) => {
    const q = predefinedQ || aiQuestion;
    if (!q.trim()) return;
    setIsAiLoading(true);
    setActiveTab('ai');
    const resp = await getSmartTutorResponse(q, lesson.title);
    setAiResponse(resp);
    setIsAiLoading(false);
    setAiQuestion('');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      userName: 'أنت البطل',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hero',
      text: newComment,
      timestamp: 'الآن',
      likes: 0
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  if (showExam) {
    return (
      <div className="fixed inset-0 bg-[#010103] z-[1000] p-6 flex flex-col items-center justify-center animate-in zoom-in duration-500 overflow-y-auto no-scrollbar font-['Tajawal']">
         <div className="max-w-md w-full space-y-8 py-10 relative">
            {isGeneratingQuiz ? (
              <div className="text-center space-y-8 animate-pulse">
                 <div className="relative inline-block">
                    <div className="absolute -inset-10 bg-cyan-500/10 blur-[60px] rounded-full animate-bounce"></div>
                    <div className="relative w-28 h-28 bg-[#0A0A1F] border-2 border-cyan-500/30 rounded-[40px] flex items-center justify-center text-cyan-400">
                       <Brain size={56} className="animate-pulse" />
                    </div>
                 </div>
                 <h3 className="text-2xl font-black text-white">جاري تحضير "معركة العلم"</h3>
                 <p className="text-slate-500 text-xs font-bold leading-relaxed px-6">يقوم المعلم الذكي أوراكل بتركيب أسئلة فريدة تتناسب مع مستواك الإمبراطوري...</p>
              </div>
            ) : examPassed === null ? (
              <div className="space-y-10">
                {/* Header Progress */}
                <div className="bg-[#0A0A1F]/60 backdrop-blur-xl p-6 rounded-[35px] border border-white/5 flex items-center justify-between shadow-2xl">
                   <div className="flex gap-1.5">
                      {quizQuestions.map((_, i) => (
                        <div key={i} className={`h-2 w-10 rounded-full transition-all duration-700 ${i === currentQuestionIdx ? 'bg-cyan-500 shadow-[0_0_15px_#22d3ee]' : (selectedAnswers[i] !== undefined ? 'bg-green-500/50' : 'bg-white/10')}`}></div>
                      ))}
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">تحدي الذكاء</span>
                      <p className="text-white font-black text-sm">{currentQuestionIdx + 1} / {quizQuestions.length}</p>
                   </div>
                </div>

                {/* Question Card */}
                <div className="animate-in slide-in-from-left duration-500">
                   <div className="bg-gradient-to-br from-[#0A0A1F] to-[#010103] border border-white/10 p-10 rounded-[50px] text-right space-y-8 shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full group-hover:bg-cyan-500/10 transition-all"></div>
                      <p className="text-white font-black text-xl leading-relaxed relative z-10">{quizQuestions[currentQuestionIdx]?.question}</p>
                      
                      <div className="grid grid-cols-1 gap-4 pt-4">
                         {quizQuestions[currentQuestionIdx]?.options.map((opt, i) => {
                           const isSelected = selectedAnswers[currentQuestionIdx] === i;
                           const isCorrect = i === quizQuestions[currentQuestionIdx].correctIndex;
                           let btnStyle = "bg-white/5 border-white/5 text-slate-400 hover:border-cyan-500/30";
                           
                           if (showExplanation) {
                             if (isCorrect) btnStyle = "bg-green-500 text-black border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-[1.02]";
                             else if (isSelected) btnStyle = "bg-red-500/20 text-red-500 border-red-500/30 opacity-80";
                             else btnStyle = "bg-white/5 border-white/5 opacity-20 text-slate-500";
                           } else if (isSelected) {
                             btnStyle = "bg-cyan-500 text-black border-cyan-500 shadow-xl shadow-cyan-500/20 scale-[1.02]";
                           }

                           return (
                             <button 
                               key={i} 
                               disabled={showExplanation}
                               onClick={() => handleAnswerSelect(i)}
                               className={`w-full p-6 rounded-[28px] border text-right text-xs font-black transition-all active:scale-95 ${btnStyle}`}
                             >
                               <span className="flex items-center justify-between">
                                  {showExplanation && isCorrect && <CheckCircle2 size={16} />}
                                  {showExplanation && isSelected && !isCorrect && <XCircle size={16} />}
                                  <span className="flex-grow">{opt}</span>
                               </span>
                             </button>
                           );
                         })}
                      </div>
                   </div>

                   {showExplanation && (
                     <div className="mt-8 bg-[#0A0A1F] border border-cyan-500/20 p-8 rounded-[40px] animate-in slide-in-from-bottom-5 shadow-2xl relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">تفسير أوراكل</div>
                        <p className="text-xs text-slate-300 font-bold text-right leading-relaxed mb-6">{quizQuestions[currentQuestionIdx].explanation}</p>
                        <button onClick={nextQuestion} className="w-full py-5 bg-white text-black rounded-[25px] font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-white/10">
                           {currentQuestionIdx < quizQuestions.length - 1 ? 'الانتقال للسؤال التالي' : 'إنهاء المعركة وحساب النقاط'}
                           <ChevronLeft size={20} />
                        </button>
                     </div>
                   )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-12 animate-in zoom-in duration-700">
                <div className="relative inline-block">
                   <div className={`absolute -inset-16 ${examPassed ? 'bg-green-500/20' : 'bg-red-500/20'} blur-[100px] rounded-full animate-pulse`}></div>
                   <div className={`w-40 h-40 rounded-[50px] flex items-center justify-center border-4 relative shadow-2xl ${examPassed ? 'text-green-500 border-green-500/40 bg-green-500/10' : 'text-red-500 border-red-500/40 bg-red-500/10'}`}>
                      {examPassed ? <Trophy size={80} /> : <AlertCircle size={80} />}
                      <div className="absolute -bottom-4 bg-white text-black px-6 py-2 rounded-2xl font-black text-sm shadow-2xl">
                         {examPassed ? 'انتصار!' : 'حاول مجدداً'}
                      </div>
                   </div>
                </div>
                <div className="space-y-4">
                   <h3 className="text-4xl font-black text-white tracking-tighter">
                      {examPassed ? 'لقد أثبت جدارتك يا بطل' : 'هزيمة مؤقتة تصنع بطلاً'}
                   </h3>
                   <p className={`text-lg font-bold ${examPassed ? 'text-green-400' : 'text-red-400'}`}>
                      {examPassed ? `رصيدك الإجمالي زاد بـ ${lesson.points} نقطة مجد!` : 'عد لمراجعة الدرس بتركيز أكبر، أوراكل ينتظرك.'}
                   </p>
                </div>
                <div className="flex flex-col gap-4">
                   {examPassed ? (
                     <button onClick={onBack} className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-[30px] font-black shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all">العودة لخريطة المجد <ArrowRight size={24} className="rotate-180" /></button>
                   ) : (
                     <button onClick={() => { setShowExam(false); setExamPassed(null); setCurrentQuestionIdx(0); setSelectedAnswers([]); setShowExplanation(false); }} className="w-full py-6 bg-white/5 text-white border border-white/10 rounded-[30px] font-black flex items-center justify-center gap-4 active:scale-95 transition-all hover:bg-white/10">إعادة خوض المعركة <RefreshCcw size={20} /></button>
                   )}
                </div>
              </div>
            )}
         </div>
      </div>
    );
  }

  return (
    <div className={`min-h-full bg-[#010103] pb-32 animate-in fade-in duration-700 overflow-x-hidden relative flex flex-col no-scrollbar ${theaterMode ? 'p-0' : ''} font-['Tajawal']`}>
      
      {/* Cinematic Video Player Section */}
      <div className={`relative transition-all duration-700 ${theaterMode ? 'h-screen' : 'aspect-video'} bg-black group z-[500] shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}>
         <video ref={videoRef} src={lesson.videoUrl} className="w-full h-full object-contain" onClick={togglePlay} playsInline />
         
         {/* Custom Controller Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
               <button onClick={onBack} className="w-12 h-12 bg-black/50 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all"><ArrowRight size={24} className="rotate-180" /></button>
               <div className="flex gap-3">
                  <button onClick={() => setTheaterMode(!theaterMode)} className="w-12 h-12 bg-black/50 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-cyan-500/20"><Maximize size={20}/></button>
                  <button className="w-12 h-12 bg-black/50 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white border border-white/10"><Settings size={20}/></button>
               </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <span className="text-[10px] text-white font-black tabular-nums bg-black/60 px-2 py-1 rounded-md">{videoRef.current ? Math.floor(videoRef.current.currentTime / 60) : '0'}:{videoRef.current ? (Math.floor(videoRef.current.currentTime % 60)).toString().padStart(2, '0') : '00'}</span>
                  <div className="flex-grow h-2 bg-white/10 rounded-full relative cursor-pointer overflow-hidden group/bar" onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     const p = x / rect.width;
                     if (videoRef.current) videoRef.current.currentTime = p * videoRef.current.duration;
                  }}>
                     <div className="absolute inset-y-0 right-0 bg-cyan-500 rounded-full shadow-[0_0_15px_#22d3ee] transition-all" style={{ width: `${progress}%`, left: 'auto' }}></div>
                  </div>
                  <span className="text-[10px] text-white/50 font-black tabular-nums">{lesson.duration}</span>
               </div>
               <div className="flex items-center justify-between">
                  <button onClick={togglePlay} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-90 transition-transform hover:scale-110">
                     {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="translate-x-1" />}
                  </button>
                  <div className="flex gap-6 items-center">
                     <Volume2 size={24} className="text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer"/>
                     <Share2 size={24} className="text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer"/>
                     <Bookmark size={24} className="text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer"/>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {!theaterMode && (
        <>
          {/* Enhanced Navigation Tabs */}
          <div className="sticky top-0 z-[400] bg-[#010103]/95 backdrop-blur-2xl border-b border-white/5 flex px-4 pt-4 shadow-xl">
             {[
               { id: 'overview', label: 'المحتوى', icon: BookOpen },
               { id: 'ai', label: 'المعلم الذكي', icon: Brain },
               { id: 'discussion', label: 'المناقشة', icon: MessageSquare },
               { id: 'resources', label: 'المصادر', icon: FileText }
             ].map(t => (
               <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id as LessonTab)}
                className={`flex-1 py-4 flex flex-col items-center gap-2 border-b-2 transition-all duration-500 ${activeTab === t.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 opacity-40 grayscale hover:opacity-70'}`}
               >
                 <t.icon size={22} className={activeTab === t.id ? 'animate-bounce-short' : ''} />
                 <span className="text-[9px] font-black uppercase tracking-widest">{t.label}</span>
               </button>
             ))}
          </div>

          <div className="p-8 md:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
             
             {/* Content: OVERVIEW (JABARA STYLE) */}
             {activeTab === 'overview' && (
               <div className="space-y-12">
                  <div className="space-y-4">
                     <h2 className="text-4xl font-black text-white leading-tight tracking-tight">{lesson.title}</h2>
                     <p className="text-slate-400 text-sm leading-relaxed text-right font-medium">{lesson.description}</p>
                  </div>

                  {/* Lesson Goals Grid */}
                  {lesson.goals && (
                    <section className="bg-gradient-to-br from-[#0A0A1F] to-[#010103] rounded-[45px] p-10 border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-[80px] rounded-full"></div>
                       <div className="flex items-center justify-between px-2">
                          <h3 className="text-lg font-black text-white flex items-center gap-4">
                             <ListChecks size={28} className="text-cyan-400" /> مخرجات التعلم
                          </h3>
                          <Sparkles size={20} className="text-cyan-400/30" />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {lesson.goals.map((g, i) => (
                            <div key={i} className="flex items-start gap-5 group">
                               <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex flex-shrink-0 items-center justify-center text-[12px] font-black text-cyan-400 border border-cyan-400/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                  {i + 1}
                               </div>
                               <p className="text-sm font-bold text-slate-300 leading-relaxed group-hover:text-white transition-colors">{g}</p>
                            </div>
                          ))}
                       </div>
                    </section>
                  )}

                  {/* Timestamps RoadMap */}
                  {lesson.timestamps && (
                    <section className="space-y-8">
                       <div className="flex items-center gap-4 px-2">
                          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20"><Map size={24} /></div>
                          <h3 className="text-lg font-black text-white uppercase tracking-tight">خريطة المعرفة التفاعلية</h3>
                       </div>
                       <div className="relative space-y-4 px-4">
                          <div className="absolute top-0 right-9 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/10 to-transparent"></div>
                          {lesson.timestamps.map((ts, i) => (
                            <button 
                              key={i} 
                              onClick={() => seekTo(ts.time)}
                              className="w-full p-6 rounded-[32px] bg-[#0A0A1F]/40 border border-white/5 flex items-center justify-between group hover:bg-slate-900/60 hover:border-purple-500/30 transition-all relative z-10"
                            >
                               <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-purple-400 text-[10px] font-black group-hover:scale-110 transition-transform">
                                     {Math.floor(ts.time / 60)}:{(ts.time % 60).toString().padStart(2, '0')}
                                  </div>
                                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{ts.label}</span>
                               </div>
                               <ChevronRight size={20} className="text-slate-800 group-hover:text-purple-400 transition-colors" />
                            </button>
                          ))}
                       </div>
                    </section>
                  )}

                  {/* Summary Box */}
                  {lesson.summary && (
                    <section className="bg-gradient-to-l from-cyan-900/10 via-[#0A0A1F] to-[#010103] rounded-[45px] p-10 border border-cyan-500/10 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Brain size={120} /></div>
                       <h3 className="text-lg font-black text-cyan-400 flex items-center gap-4 mb-6">
                          <Zap size={28} className="fill-cyan-400/20" /> جوهر المحطة العلمية
                       </h3>
                       <p className="text-sm text-slate-300 leading-relaxed font-bold italic relative z-10 text-right">{lesson.summary}</p>
                    </section>
                  )}

                  {/* Final Exam CTA */}
                  <div className="pt-10">
                     <button 
                       disabled={!videoFinishedEnough}
                       onClick={startExam}
                       className={`w-full py-10 rounded-[50px] flex flex-col items-center justify-center gap-5 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group ${videoFinishedEnough ? 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 scale-[1.02] hover:scale-[1.05] active:scale-95' : 'bg-[#0A0A1F] opacity-30 cursor-not-allowed'}`}
                     >
                        {videoFinishedEnough && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>}
                        <Trophy size={48} className={videoFinishedEnough ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-slate-700'} />
                        <div className="text-center space-y-2">
                           <h4 className={`text-2xl font-black ${videoFinishedEnough ? 'text-white' : 'text-slate-600'}`}>الولوج لاختبار الجدارة</h4>
                           <p className={`text-[10px] font-black tracking-widest uppercase ${videoFinishedEnough ? 'text-white/70' : 'text-slate-700'}`}>
                              {videoFinishedEnough ? 'أثبت قوتك العلمية واحصد ٢٥ نقطة مجد' : 'يجب مشاهدة ٨٠٪ من المحتوى لفتح البوابة'}
                           </p>
                        </div>
                     </button>
                  </div>
               </div>
             )}

             {/* Content: AI ORACLE TUTOR */}
             {activeTab === 'ai' && (
               <div className="space-y-12 animate-in zoom-in duration-500">
                  <div className="text-center space-y-4">
                     <div className="relative inline-block">
                        <div className="absolute -inset-8 bg-cyan-500/10 blur-[50px] rounded-full"></div>
                        <div className="relative w-24 h-24 bg-[#0A0A1F] rounded-[35px] flex items-center justify-center text-cyan-400 border-2 border-cyan-500/20 shadow-2xl">
                           <Brain size={48} />
                        </div>
                     </div>
                     <h3 className="text-3xl font-black text-white leading-tight">أوراكل: رفيقك الذكي</h3>
                     <p className="text-slate-500 text-xs font-bold px-12 leading-relaxed italic">اسألني أي شيء في ثنايا هذا الدرس، وسأقوم بفك شفراته المعقدة لك في لحظات.</p>
                  </div>

                  <div className="space-y-8">
                     {aiResponse && (
                       <div className="bg-[#0A0A1F]/60 border border-cyan-400/10 p-10 rounded-[50px] text-sm text-slate-200 leading-relaxed shadow-2xl relative animate-in fade-in duration-700 backdrop-blur-xl">
                          <div className="absolute -top-4 right-10 bg-cyan-500 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">تحليل أوراكل الإمبراطوري</div>
                          <div className="text-right whitespace-pre-wrap font-medium">{aiResponse}</div>
                       </div>
                     )}

                     <div className="space-y-6">
                        <div className="flex gap-4">
                           <input 
                              value={aiQuestion} 
                              onChange={(e) => setAiQuestion(e.target.value)} 
                              onKeyPress={(e) => e.key === 'Enter' && handleAiAsk()}
                              placeholder="ما الذي يشغل ذهنك يا بطل؟" 
                              className="flex-grow bg-white/5 border border-white/10 rounded-[30px] p-6 text-sm text-white focus:border-cyan-500 outline-none shadow-inner text-right font-bold" 
                              dir="rtl"
                           />
                           <button 
                             onClick={() => handleAiAsk()} 
                             disabled={isAiLoading || !aiQuestion.trim()} 
                             className="w-20 h-20 rounded-[30px] bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-90 transition-all disabled:opacity-30"
                           >
                             {isAiLoading ? <div className="w-8 h-8 border-4 border-black/30 border-t-black rounded-full animate-spin"></div> : <Send size={32} />}
                           </button>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                           {["لخص لي أهم القواعد", "أعطني أمثلة تطبيقية", "ما هي أصعب الأسئلة هنا؟"].map(q => (
                             <button key={q} onClick={() => handleAiAsk(q)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all uppercase tracking-widest">{q}</button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {/* Content: DISCUSSION COUNCIL */}
             {activeTab === 'discussion' && (
               <div className="space-y-10 animate-in slide-in-from-left duration-500">
                  <div className="flex items-center justify-between px-2">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20"><Users size={24} /></div>
                        <h3 className="text-lg font-black text-white tracking-tight">مجلس مناقشة الأبطال</h3>
                     </div>
                     <span className="text-[10px] font-black text-slate-500 uppercase bg-white/5 px-4 py-1.5 rounded-full">{comments.length} تعليق</span>
                  </div>

                  <div className="flex gap-4">
                     <input 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                        placeholder="أضف بصمتك العلمية في المجلس..." 
                        className="flex-grow bg-white/5 border border-white/10 rounded-[30px] p-6 text-sm text-white outline-none focus:border-green-500 text-right font-bold shadow-inner" 
                        dir="rtl"
                     />
                     <button onClick={handleSendComment} className="w-20 h-20 rounded-[30px] bg-green-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-90 transition-all"><Send size={32} /></button>
                  </div>

                  <div className="space-y-6">
                     {comments.map(c => (
                       <div key={c.id} className="bg-[#0A0A1F]/40 p-8 rounded-[40px] border border-white/5 flex gap-6 shadow-2xl transition-all hover:bg-slate-900/40">
                          <img src={c.userAvatar} className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex-shrink-0" />
                          <div className="flex-grow space-y-3">
                             <div className="flex justify-between items-center">
                                <h5 className="text-xs font-black text-white">{c.userName}</h5>
                                <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{c.timestamp}</span>
                             </div>
                             <p className="text-xs text-slate-400 leading-relaxed font-bold text-right">{c.text}</p>
                             <div className="pt-4 flex items-center gap-6 text-[9px] font-black text-slate-600 uppercase">
                                <button className="hover:text-cyan-400 flex items-center gap-2 transition-colors"><Star size={14} className="fill-current"/> {c.likes} إعجاب</button>
                                <button className="hover:text-cyan-400 transition-colors">إضافة رد</button>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {/* Content: IMPERIAL RESOURCES */}
             {activeTab === 'resources' && (
               <div className="space-y-10 animate-in zoom-in duration-500">
                  <div className="grid grid-cols-1 gap-6">
                     {[
                       { title: 'المذكرة الشاملة - نسخة الإمبراطور', size: '12.4 MB', type: 'PDF' },
                       { title: 'خرائط ذهنية ميسرة للقاعدة', size: '4.2 MB', type: 'IMG' },
                       { title: 'ملحق تمارين المتفوقين', size: '3.1 MB', type: 'PDF' }
                     ].map((file, i) => (
                       <div key={i} className="p-8 bg-gradient-to-r from-[#0A0A1F] to-black rounded-[45px] border border-white/5 flex items-center justify-between shadow-2xl group hover:border-cyan-500/30 transition-all">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-[28px] bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/10 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-xl"><FileText size={32} /></div>
                             <div className="text-right">
                                <h4 className="text-base font-black text-white tracking-tight">{file.title}</h4>
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mt-1">{file.type} • {file.size}</p>
                             </div>
                          </div>
                          <button className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/5 hover:bg-cyan-500 hover:text-black transition-all active:scale-90 shadow-inner"><Download size={24} /></button>
                       </div>
                     ))}
                  </div>

                  <div className="bg-gradient-to-br from-purple-950/20 via-[#0A0A1F] to-black p-12 rounded-[50px] border border-purple-500/20 text-center space-y-6 shadow-2xl">
                     <div className="w-20 h-20 bg-purple-500/10 rounded-[30px] flex items-center justify-center text-purple-400 mx-auto border border-purple-500/20 shadow-2xl">
                        <Lightbulb size={40} />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-xl font-black text-white">هل تبحث عن مصادر أعمق؟</h4>
                        <p className="text-xs text-slate-500 leading-relaxed px-10 font-medium">يمكنك دائماً الولوج للمكتبة الإمبراطورية الشاملة في قسم "أتعلم" للحصول على مراجع إضافية وكتب خارجية معتمدة.</p>
                     </div>
                  </div>
               </div>
             )}
          </div>
        </>
      )}

      {/* Floating Exit Theater Button */}
      {theaterMode && (
        <button 
          onClick={() => setTheaterMode(false)} 
          className="fixed top-10 right-10 z-[1001] w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_50px_rgba(255,255,255,0.5)] animate-pulse hover:scale-110 active:scale-90 transition-all"
        >
          <XCircle size={40} />
        </button>
      )}

      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short { animation: bounce-short 1s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
