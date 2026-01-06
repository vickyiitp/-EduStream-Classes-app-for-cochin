export type UserRole = 'student' | 'teacher' | 'admin';

export interface Batch {
  id: string;
  name: string;
  subject: string;
  progress: number;
  image: string;
  enrolledStudents?: number;
  price: string;
  mrp?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  language?: 'English' | 'Hinglish' | 'Hindi';
  class?: '9th' | '10th';
  examType?: 'Boards' | 'Foundation' | 'Olympiad';
}

export interface LiveClass {
  id: string;
  subject: string;
  topic: string;
  teacher: string;
  isLive: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: 'video' | 'quiz' | 'pdf';
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export type ViewType = 
  | 'landing' 
  | 'auth' 
  | 'dashboard' 
  | 'classroom' 
  | 'batches' 
  | 'schedule' 
  | 'tests' 
  | 'scoreboard' 
  | 'profile'
  | 'teacher-dashboard'
  | 'content-upload'
  | 'admin-dashboard'
  | 'user-management'
  | 'revenue'
  | 'doubt-forum'
  | 'analytics'
  | 'help-center'
  | 'leaderboard'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';