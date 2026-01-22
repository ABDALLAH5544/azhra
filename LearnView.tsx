
import React, { useState, useEffect } from 'react';
import { Subject, Lesson, User, View } from './types';
import { CURRICULUM } from './constants';
import { SubjectListView } from './SubjectListView';
import { SubjectDetailView } from './SubjectDetailView';
import { LessonView } from './LessonView';

interface LearnViewProps {
  user: User;
  setView: (v: View) => void;
  selectedSubject?: Subject | null;
  onLessonComplete: (lessonId: string, pts: number) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ user, setView, selectedSubject: initialSubject, onLessonComplete }) => {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(initialSubject || null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSubject, activeLesson]);

  // فلترة المواد بناءً على مسار المستخدم (عام أو أزهري)
  const filteredSubjects = CURRICULUM.filter(s => s.track.includes(user.track));

  // 1. طريقة عرض الدرس
  if (activeLesson) {
    return (
      <LessonView 
        lesson={activeLesson} 
        onBack={() => setActiveLesson(null)} 
        onComplete={(score) => { 
          onLessonComplete(activeLesson.id, activeLesson.points);
          setActiveLesson(null);
        }}
        setView={setView}
      />
    );
  }

  // 2. طريقة عرض تفاصيل المادة (الوحدات والدروس)
  if (activeSubject) {
    return (
      <SubjectDetailView 
        subject={activeSubject}
        user={user}
        onBack={() => setActiveSubject(null)}
        onSelectLesson={setActiveLesson}
      />
    );
  }

  // 3. طريقة عرض قائمة المواد (الرئيسية لقسم أتعلم)
  return (
    <SubjectListView 
      subjects={filteredSubjects}
      userTrack={user.track}
      onSelectSubject={setActiveSubject}
      onBack={() => setView('home')}
    />
  );
};
