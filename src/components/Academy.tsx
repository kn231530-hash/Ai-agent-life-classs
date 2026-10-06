import React, { useState } from 'react';
import { AcademyTrack, Lesson } from '../types';
import { LessonModal } from './LessonModal';
import {
  Layers,
  Mic,
  Cpu,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Lock,
  PlayCircle,
  Filter
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface AcademyProps {
  tracks: AcademyTrack[];
  onCompleteLesson: (lessonId: string, earnedXp: number) => void;
}

export const Academy: React.FC<AcademyProps> = ({ tracks, onCompleteLesson }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; track: AcademyTrack } | null>(null);

  const filteredTracks =
    selectedCategory === 'all'
      ? tracks
      : tracks.filter((t) => t.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'architecture':
        return <Layers className="w-4 h-4 text-[#06B6D4]" />;
      case 'rhetoric':
        return <Mic className="w-4 h-4 text-[#8B5CF6]" />;
      case 'frontier-ai':
        return <Cpu className="w-4 h-4 text-[#4edea3]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#06B6D4]" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-28 pt-2">
      {/* Academy Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#171b26] to-[#0f1422] border border-white/10 p-5 sm:p-6 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#06B6D4]/10 via-[#8B5CF6]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#4cd7f6] font-bold">
                ACCELERATED COGNITIVE TRACKS
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">· Level IV Synergy</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
              Mastery Curriculum & Voice Defense
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mt-1 leading-relaxed">
              Synthesize first principles through live speech defense. Pass automated Socratic interrogations to unlock Apex credentials.
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0B0F19]/80 border border-white/5 font-mono text-center">
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Completed</span>
              <span className="text-sm font-bold text-[#10B981]">10 Modules</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Hours Logged</span>
              <span className="text-sm font-bold text-[#06B6D4]">23.5 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-4 h-4 text-[#94A3B8] shrink-0 mr-1" />
        {[
          { id: 'all', label: 'All Disciplines' },
          { id: 'architecture', label: 'Systems & Consensus' },
          { id: 'rhetoric', label: 'Executive Rhetoric' },
          { id: 'frontier-ai', label: 'Frontier AI & Latency' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-gradient-to-r from-[#06B6D4] to-[#0284c7] text-[#003640] shadow-[0_0_12px_rgba(6,182,212,0.4)] font-bold'
                : 'bg-[#1F2937]/70 text-[#94A3B8] hover:text-white border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tracks & Lessons List */}
      <div className="flex flex-col gap-6">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className="rounded-2xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-4 shadow-lg transition-all"
          >
            {/* Track Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.08]">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${
                    track.color === 'cyan'
                      ? 'bg-[#06B6D4]/15 border-[#06B6D4]/30'
                      : 'bg-[#8B5CF6]/15 border-[#8B5CF6]/30'
                  }`}
                >
                  {getCategoryIcon(track.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-heading font-bold uppercase tracking-wider ${
                        track.color === 'cyan' ? 'text-[#06B6D4]' : 'text-[#8B5CF6]'
                      }`}
                    >
                      {track.tier}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">
                      · {track.completedLessons}/{track.totalLessons} Completed
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-heading font-bold text-white mt-0.5">
                    {track.title}
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2">
                    {track.description}
                  </p>
                </div>
              </div>

              {/* Progress Dial */}
              <div className="text-right shrink-0">
                <span className="text-xs sm:text-sm font-mono font-bold text-white">
                  {track.progressPercent}%
                </span>
                <span className="text-[10px] text-[#94A3B8] block font-mono">
                  {track.estimatedHours} est.
                </span>
              </div>
            </div>

            {/* Neon Progress Track Bar */}
            <div className="w-full bg-[#1F2937] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  track.color === 'cyan'
                    ? 'bg-gradient-to-r from-[#06B6D4] to-[#4edea3]'
                    : 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]'
                }`}
                style={{ width: `${track.progressPercent}%` }}
              />
            </div>

            {/* High-Contrast Lesson Cards (Strict Spec: 16px radius, hairline border, top highlight) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {track.lessons.map((lesson) => {
                const isCompleted = lesson.status === 'completed';
                const isInProgress = lesson.status === 'in-progress';
                const isLocked = lesson.status === 'locked';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (!isLocked) {
                        audioService.playTone('metric');
                        setActiveLesson({ lesson, track });
                      }
                    }}
                    className={`relative rounded-2xl p-4 flex flex-col justify-between transition-all border ${
                      isLocked
                        ? 'bg-[#111827]/40 border-white/5 opacity-60 cursor-not-allowed'
                        : isInProgress
                        ? 'bg-[#171b26] border-[#06B6D4]/40 hover:border-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer'
                        : 'bg-[#111827]/90 border-white/10 hover:border-white/20 cursor-pointer'
                    }`}
                  >
                    {/* Top edge subtle highlight */}
                    <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#94A3B8] flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {lesson.duration} · +{lesson.xp} XP
                        </span>

                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#10B981]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Mastered
                          </span>
                        )}
                        {isInProgress && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#06B6D4]">
                            <PlayCircle className="w-3.5 h-3.5 animate-pulse" />
                            Active Module
                          </span>
                        )}
                        {isLocked && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-[#64748B]">
                            <Lock className="w-3 h-3" />
                            Tier Locked
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-heading font-semibold text-white mb-1 leading-snug">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    {/* Footer Progress & Trigger */}
                    <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {lesson.checklist.filter((c) => c.completed).length}/
                        {lesson.checklist.length} Checkpoints
                      </span>

                      {!isLocked && (
                        <div className="flex items-center gap-1 text-xs font-heading font-semibold text-[#06B6D4] group-hover:translate-x-0.5 transition-transform">
                          <span>{isCompleted ? 'Review' : 'Enter Crucible'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Details Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson.lesson}
          track={activeLesson.track}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={onCompleteLesson}
        />
      )}
    </div>
  );
};
