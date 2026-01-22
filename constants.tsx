
import { Track, Subject } from './types';

export const CURRICULUM: Subject[] = [
  {
    id: 'ar-grammar',
    title: 'النحو والصرف',
    icon: '📚',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'ar-u1',
        title: 'الوحدة الأولى: أساسيات النحو',
        isUnlocked: true,
        progress: 30,
        lessons: [
          { 
            id: 'ar-u1-l1', 
            title: 'أقسام الكلام بالتفصيل', 
            duration: '15:00', 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
            isCompleted: true, 
            isUnlocked: true, 
            points: 25, 
            description: 'شرح مبسط وعميق لأقسام الكلام الثلاثة: الاسم، الفعل، والحرف.',
            goals: ['التمييز بين أقسام الكلام', 'إتقان علامات الأسماء', 'فهم أنواع الأفعال'],
            summary: 'الكلمة هي جوهر الإعراب، وفهم نوعها هو المفتاح الأول لتصبح إمبراطوراً في النحو.'
          },
        ]
      }
    ]
  },
  {
    id: 'math-algebra',
    title: 'الرياضيات (الجبر)',
    icon: '📐',
    track: [Track.GENERAL, Track.AZHAR],
    units: [{ id: 'm-u1', title: 'الأعداد المركبة', isUnlocked: true, progress: 0, lessons: [] }]
  },
  {
    id: 'physics',
    title: 'الفيزياء الحديثة',
    icon: '⚡',
    track: [Track.GENERAL, Track.AZHAR],
    units: [{ id: 'p-u1', title: 'الكهربية التيارية', isUnlocked: true, progress: 0, lessons: [] }]
  },
  {
    id: 'chemistry',
    title: 'الكيمياء العضوية',
    icon: '🧪',
    track: [Track.GENERAL, Track.AZHAR],
    units: [{ id: 'c-u1', title: 'مقدمة الكيمياء العضوية', isUnlocked: true, progress: 0, lessons: [] }]
  },
  {
    id: 'azhar-fiqh',
    title: 'الفقه الشافعي',
    icon: '🕌',
    track: [Track.AZHAR],
    units: [{ id: 'f-u1', title: 'كتاب الجنايات', isUnlocked: true, progress: 0, lessons: [] }]
  },
  {
    id: 'azhar-tafseer',
    title: 'التفسير والحديث',
    icon: '📖',
    track: [Track.AZHAR],
    units: [{ id: 't-u1', title: 'سورة الذاريات', isUnlocked: true, progress: 0, lessons: [] }]
  },
  {
    id: 'biology',
    title: 'الأحياء',
    icon: '🧬',
    track: [Track.GENERAL, Track.AZHAR],
    units: [{ id: 'b-u1', title: 'الدعامة والحركة', isUnlocked: true, progress: 0, lessons: [] }]
  },
  {
    id: 'english',
    title: 'اللغة الإنجليزية',
    icon: '🇬🇧',
    track: [Track.GENERAL, Track.AZHAR],
    units: [{ id: 'e-u1', title: 'Unit 1: Cultural Heritage', isUnlocked: true, progress: 0, lessons: [] }]
  }
];

export const LEADERBOARD_DATA = [
  { name: 'عبدالله أيمن', points: 15420, avatar: 'https://picsum.photos/seed/p1/100', rank: 1 },
  { name: 'أحمد محمد', points: 12500, avatar: 'https://picsum.photos/seed/p2/100', rank: 2 },
  { name: 'سارة خالد', points: 11200, avatar: 'https://picsum.photos/seed/p3/100', rank: 3 },
];
