import React from 'react';
import { Flame, Activity, Smartphone, Monitor, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  progress: UserProgress;
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  isMobilePreview,
  onToggleMobilePreview,
  isMuted,
  onToggleMute,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#4cd7f6]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-sm tracking-tight text-white flex items-center gap-1">
                SYNTHETIX
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#c4abff] font-semibold">
                NEURAL ACADEMY
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] font-mono flex items-center gap-1.5 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
              v3.2 Nexus Core · 24ms Realtime
            </p>
          </div>
        </div>

        {/* Telemetry & Stats (Streak, XP, Latency) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F2937]/70 border border-white/10 text-xs">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-mono font-semibold text-amber-200">{progress.streakDays}d</span>
          </div>

          {/* XP & Level */}
          <button
            onClick={() => onSelectTab('vault')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/35 text-xs text-[#d0bcff] hover:bg-[#8B5CF6]/25 transition-colors cursor-pointer"
            title="View Skill Matrix & Mastery Vault"
          >
            <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="font-mono font-medium text-[11px] sm:text-xs">
              Lvl {progress.level} · {progress.currentXp.toLocaleString()} XP
            </span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                : 'bg-[#111827] border-white/10 text-[#06B6D4] hover:border-[#06B6D4]/40'
            }`}
            title={isMuted ? 'Speech Audio Muted' : 'Speech Audio Active'}
            aria-label="Toggle speech audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Device Frame Viewport Toggle */}
          <button
            onClick={onToggleMobilePreview}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111827] border border-white/10 text-xs text-[#94A3B8] hover:text-white hover:border-[#06B6D4]/40 transition-colors cursor-pointer"
            title={isMobilePreview ? 'Switch to Full-Screen Mode' : 'Switch to Mobile Handheld Frame'}
          >
            {isMobilePreview ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span className="font-mono text-[11px]">Wide Canvas</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="font-mono text-[11px]">Handheld Dock</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
