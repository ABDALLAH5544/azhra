
import { Track, Subject } from './types';

export const CURRICULUM: Subject[] = [
  // --- المواد المشتركة والعربية ---
  {
    id: 'ar',
    title: 'اللغة العربية (النحو)',
    icon: '📚',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'ar-u1',
        title: 'الوحدة الأولى: أساسيات النحو',
        isUnlocked: true,
        progress: 30,
        lessons: [
          { id: 'ar-u1-l1', title: 'أقسام الكلام بالتفصيل', duration: '15:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: true, isUnlocked: true, points: 25, videoProgress: 100, examScore: 90, description: 'شرح مبسط لأقسام الكلام: الاسم، الفعل، والحرف.' },
          { id: 'ar-u1-l2', title: 'المعرب والمبني', duration: '18:00', videoUrl: 'https://www.w3schools.com/html/movie.mp4', isCompleted: false, isUnlocked: true, points: 25, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'en',
    title: 'اللغة الإنجليزية',
    icon: '🇬🇧',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'en-u1',
        title: 'Unit 1: Life Events',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'en-u1-l1', title: 'Present Simple vs Continuous', duration: '22:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 30, videoProgress: 0 },
        ]
      }
    ]
  },

  // --- المواد العلمية ---
  {
    id: 'math',
    title: 'الرياضيات',
    icon: '📐',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'math-u1',
        title: 'الجبر وحساب المثلثات',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'math-u1-l1', title: 'الأعداد المركبة', duration: '25:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 35, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'phys',
    title: 'الفيزياء',
    icon: '⚡',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'phys-u1',
        title: 'القياس الفيزيائي',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'phys-u1-l1', title: 'خطأ القياس وأنواعه', duration: '20:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 30, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'chem',
    title: 'الكيمياء',
    icon: '🧪',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'chem-u1',
        title: 'الكيمياء والقياس',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'chem-u1-l1', title: 'ماهية علم الكيمياء', duration: '15:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 25, videoProgress: 0 },
        ]
      }
    ]
  },

  // --- المواد الشرعية (للأزهري فقط) ---
  {
    id: 'fiqh',
    title: 'الفقه الشافعي',
    icon: '⚖️',
    track: [Track.AZHAR],
    units: [
      {
        id: 'fiqh-u1',
        title: 'كتاب الطهارة',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'fiqh-u1-l1', title: 'أحكام المياه والوضوء', duration: '30:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 40, videoProgress: 0 },
          { id: 'fiqh-u1-l2', title: 'أحكام الغسل والتيمم', duration: '28:00', videoUrl: '', isCompleted: false, isUnlocked: false, points: 40, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'hadith',
    title: 'الحديث النبوي',
    icon: '📜',
    track: [Track.AZHAR],
    units: [
      {
        id: 'hadith-u1',
        title: 'الأحاديث القولية',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'hadith-u1-l1', title: 'الحديث الأول: الأعمال بالنيات', duration: '20:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 30, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'tafsir',
    title: 'التفسير',
    icon: '📖',
    track: [Track.AZHAR],
    units: [
      {
        id: 'tafsir-u1',
        title: 'تفسير جزء عم',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'tafsir-u1-l1', title: 'سورة النبأ بالتفصيل', duration: '25:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 35, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'tawhid',
    title: 'التوحيد',
    icon: '🕯️',
    track: [Track.AZHAR],
    units: [
      {
        id: 'tawhid-u1',
        title: 'الإلهيات',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'tawhid-u1-l1', title: 'صفات الله الواجبة', duration: '20:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 30, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'sirah',
    title: 'السيرة النبوية',
    icon: '🕋',
    track: [Track.AZHAR],
    units: [
      {
        id: 'sirah-u1',
        title: 'المولد والنشأة',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'sirah-u1-l1', title: 'نسب النبي صلى الله عليه وسلم', duration: '18:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 25, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'thakafa',
    title: 'الثقافة الإسلامية',
    icon: '🛡️',
    track: [Track.AZHAR],
    units: [
      {
        id: 'thakafa-u1',
        title: 'قضايا معاصرة',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'thakafa-u1-l1', title: 'التسامح في الإسلام', duration: '20:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 30, videoProgress: 0 },
        ]
      }
    ]
  },

  // --- المواد الأدبية ---
  {
    id: 'hist',
    title: 'التاريخ',
    icon: '🏺',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'hist-u1',
        title: 'حضارة مصر القديمة',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'hist-u1-l1', title: 'ملامح تاريخ مصر القديم', duration: '22:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 30, videoProgress: 0 },
        ]
      }
    ]
  },
  {
    id: 'geo',
    title: 'الجغرافيا',
    icon: '🌍',
    track: [Track.GENERAL, Track.AZHAR],
    units: [
      {
        id: 'geo-u1',
        title: 'مدخل لدراسة علم الجغرافيا',
        isUnlocked: true,
        progress: 0,
        lessons: [
          { id: 'geo-u1-l1', title: 'أدوات تعلم الجغرافيا', duration: '15:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isUnlocked: true, points: 25, videoProgress: 0 },
        ]
      }
    ]
  }
];

export const LEADERBOARD_DATA = [
  { name: 'أحمد محمد', points: 4500, avatar: 'https://picsum.photos/seed/p1/100', rank: 1 },
  { name: 'سارة خالد', points: 4200, avatar: 'https://picsum.photos/seed/p2/100', rank: 2 },
  { name: 'ياسين علي', points: 3900, avatar: 'https://picsum.photos/seed/p3/100', rank: 3 },
  { name: 'مريم يوسف', points: 3750, avatar: 'https://picsum.photos/seed/p4/100', rank: 4 },
  { name: 'عمر إبراهيم', points: 3600, avatar: 'https://picsum.photos/seed/p5/100', rank: 5 },
];
