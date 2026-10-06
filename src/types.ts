export interface Mentor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  voiceStyle: string;
  accent: string;
  pitch: number;
  rate: number;
  tag: string;
  systemPrompt: string;
}

export interface TranscriptMessage {
  id: string;
  speaker: 'user' | 'mentor';
  speakerName: string;
  text: string;
  timestamp: string;
  metrics?: {
    latencyMs: number;
    wpm?: number;
    fillerCount?: number;
    clarityScore?: number;
  };
}

export interface LessonChecklist {
  id: string;
  label: string;
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xp: number;
  description: string;
  status: 'locked' | 'in-progress' | 'completed';
  checklist: LessonChecklist[];
  voiceChallenge: {
    prompt: string;
    targetSeconds: number;
    criteria: string[];
    sampleResponse: string;
  };
}

export interface AcademyTrack {
  id: string;
  title: string;
  tier: string;
  tierLevel: number;
  category: 'architecture' | 'rhetoric' | 'frontier-ai' | 'strategy';
  icon: string;
  description: string;
  progressPercent: number;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: string;
  lessons: Lesson[];
  color: 'cyan' | 'violet' | 'emerald';
}

export interface VoiceDrill {
  id: string;
  title: string;
  category: string;
  difficulty: 'Practitioner' | 'Advanced' | 'Apex';
  targetDuration: number;
  description: string;
  scenario: string;
  evaluationRubric: string[];
  bestScore?: number;
}

export interface SessionRecording {
  id: string;
  mentorName: string;
  topic: string;
  date: string;
  duration: string;
  latencyAvg: number;
  wpmAvg: number;
  fillerCount: number;
  clarityPercent: number;
  keyTakeaway: string;
}

export interface UserProgress {
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  totalPracticeMinutes: number;
  averageLatencyMs: number;
  vocalClarityScore: number;
  radarScores: {
    rhetoric: number;
    latency: number;
    architecture: number;
    brevity: number;
    cadence: number;
  };
}
