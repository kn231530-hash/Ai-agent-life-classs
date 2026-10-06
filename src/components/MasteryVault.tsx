import React, { useState } from 'react';
import { UserProgress, SessionRecording } from '../types';
import { RECENT_RECORDINGS } from '../data/mockData';
import {
  Award,
  Flame,
  Shield,
  Zap,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Mic,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface MasteryVaultProps {
  progress: UserProgress;
}

export const MasteryVault: React.FC<MasteryVaultProps> = ({ progress }) => {
  const [recordings] = useState<SessionRecording[]>(RECENT_RECORDINGS);
  const [playingRecId, setPlayingRecId] = useState<string | null>(null);

  const achievements = [
    {
      id: 'ach-1',
      title: 'Zero-Latency Thinker',
      desc: 'Sustained <25ms speech response latency across 10 consecutive drills',
      unlocked: true,
      icon: Zap,
      color: 'cyan',
    },
    {
      id: 'ach-2',
      title: 'Socratic Architect',
      desc: 'Successfully defended distributed consensus against Mentor Aria',
      unlocked: true,
      icon: Layers,
      color: 'violet',
    },
    {
      id: 'ach-3',
      title: 'Cadence Titan',
      desc: 'Maintained 145 WPM pacing with zero filler words in 60s Executive Pitch',
      unlocked: true,
      icon: Mic,
      color: 'emerald',
    },
    {
      id: 'ach-4',
      title: 'Apex Sovereign',
      desc: 'Attain Level V Mastery tier across all four cognitive tracks',
      unlocked: false,
      icon: Shield,
      color: 'violet',
    },
  ];

  const handlePlayRecording = (rec: SessionRecording) => {
    if (playingRecId === rec.id) {
      audioService.stopSpeaking();
      setPlayingRecId(null);
    } else {
      setPlayingRecId(rec.id);
      audioService.speak(
        `Session review with ${rec.mentorName}. Key takeaway: ${rec.keyTakeaway}`,
        {
          pitch: 1.0,
          rate: 1.05,
          onEnd: () => setPlayingRecId(null),
        }
      );
    }
  };

  const xpPercent = Math.round((progress.currentXp / progress.nextLevelXp) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-28 pt-2">
      {/* Learner Profile Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#171b26] to-[#0f1422] border border-white/10 p-5 sm:p-6 overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
                <Award className="w-8 h-8 text-[#4cd7f6]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#c4abff] font-bold">
                  LEVEL {progress.level} · TIER IV
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  Apex Synthesizer
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                Synthetix Mastery Vault
              </h1>
              <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                {progress.totalPracticeMinutes} minutes logged · {progress.streakDays}-day streak active
              </p>
            </div>
          </div>

          <div className="w-full sm:w-56 p-3 rounded-xl bg-[#0B0F19]/80 border border-white/5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">Mastery Progress</span>
              <span className="text-white font-bold">{xpPercent}%</span>
            </div>
            <div className="w-full bg-[#1F2937] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] rounded-full"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#94A3B8] font-mono text-right">
              {progress.currentXp.toLocaleString()} / {progress.nextLevelXp.toLocaleString()} XP to Level 5
            </span>
          </div>
        </div>
      </div>

      {/* Cognitive Radar Matrix & Five Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar Score Breakdown */}
        <div className="p-5 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#06B6D4]" />
              Cognitive Skill Dimensions
            </h2>
            <span className="text-xs font-mono text-[#10B981]">
              Avg: 89.8 / 100
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: 'Executive Rhetoric', score: progress.radarScores.rhetoric, color: 'violet' },
              { label: 'Latency Response Time', score: progress.radarScores.latency, color: 'cyan' },
              { label: 'Architectural Depth', score: progress.radarScores.architecture, color: 'cyan' },
              { label: 'Brevity & Zero Fillers', score: progress.radarScores.brevity, color: 'emerald' },
              { label: 'Vocal Cadence Control', score: progress.radarScores.cadence, color: 'violet' },
            ].map((skill, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#dfe2f1] font-heading font-medium">{skill.label}</span>
                  <span className="font-mono text-xs font-bold text-white">{skill.score}/100</span>
                </div>
                <div className="w-full bg-[#1F2937] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.color === 'cyan'
                        ? 'bg-gradient-to-r from-[#06B6D4] to-[#4edea3]'
                        : skill.color === 'violet'
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]'
                        : 'bg-gradient-to-r from-[#10B981] to-[#06B6D4]'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credential Badges */}
        <div className="p-5 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col gap-4">
          <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            Earned Neural Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {achievements.map((ach) => {
              const IconComp = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                    ach.unlocked
                      ? 'bg-[#171b26] border-white/10'
                      : 'bg-[#111827]/40 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div
                      className={`p-1.5 rounded-lg border ${
                        ach.color === 'cyan'
                          ? 'bg-[#06B6D4]/15 border-[#06B6D4]/30 text-[#06B6D4]'
                          : 'bg-[#8B5CF6]/15 border-[#8B5CF6]/30 text-[#8B5CF6]'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-heading font-semibold text-white leading-tight">
                        {ach.title}
                      </h3>
                      <p className="text-[10px] text-[#94A3B8] line-clamp-2 mt-0.5">
                        {ach.desc}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        ach.unlocked
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-white/5 text-[#64748B]'
                      }`}
                    >
                      {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Voice Session Archive */}
      <div className="p-5 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#06B6D4]" />
            Recent Telemetry Archives
          </h2>
          <span className="text-xs font-mono text-[#94A3B8]">
            {recordings.length} Recorded Sessions
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {recordings.map((rec) => {
            const isPlaying = playingRecId === rec.id;
            return (
              <div
                key={rec.id}
                className="p-4 rounded-xl bg-[#0B0F19]/70 border border-white/5 hover:border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handlePlayRecording(rec)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                      isPlaying
                        ? 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                        : 'bg-[#1F2937] text-[#06B6D4] hover:bg-[#06B6D4]/20'
                    }`}
                    title={isPlaying ? 'Pause audio review' : 'Listen to session review'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-heading font-semibold text-white">
                        {rec.topic}
                      </span>
                      <span className="text-[10px] font-mono text-[#8B5CF6]">
                        with {rec.mentorName}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {rec.keyTakeaway}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-[#64748B]">
                      <span>{rec.date}</span>
                      <span>·</span>
                      <span className="text-[#06B6D4]">{rec.latencyAvg}ms RTT</span>
                      <span>·</span>
                      <span className="text-[#10B981]">{rec.wpmAvg} WPM</span>
                      <span>·</span>
                      <span>{rec.fillerCount} Fillers</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#10B981]">
                    {rec.clarityPercent}%
                  </span>
                  <span className="text-[10px] text-[#94A3B8] block font-mono">
                    Clarity Score
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
