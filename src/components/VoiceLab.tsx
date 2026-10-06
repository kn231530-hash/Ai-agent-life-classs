import React, { useState, useEffect } from 'react';
import { VoiceDrill } from '../types';
import { VOICE_DRILLS } from '../data/mockData';
import { AudioWaveform } from './AudioWaveform';
import {
  Activity,
  Mic,
  Zap,
  Gauge,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Award,
  Clock,
  Sparkles,
  Volume2
} from 'lucide-react';
import { audioService } from '../services/audioService';
import confetti from 'canvas-confetti';

export const VoiceLab: React.FC = () => {
  const [activeDrill, setActiveDrill] = useState<VoiceDrill | null>(null);
  const [isDrillRunning, setIsDrillRunning] = useState(false);
  const [drillSeconds, setDrillSeconds] = useState(0);
  const [drillScore, setDrillScore] = useState<number | null>(null);

  // Live telemetry state
  const [liveWpm, setLiveWpm] = useState(144);
  const [fillerCount, setFillerCount] = useState(0);
  const [pitchVariance, setPitchVariance] = useState(86);
  const [clarityIndex, setClarityIndex] = useState(98.2);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Drill timer
  useEffect(() => {
    let interval: any = null;
    if (isDrillRunning && activeDrill) {
      interval = setInterval(() => {
        setDrillSeconds((s) => {
          if (s >= activeDrill.targetDuration) {
            handleCompleteDrill();
            return s;
          }
          // Fluctuate telemetry dynamically to simulate live speech analysis
          setLiveWpm((prev) => Math.floor(135 + Math.random() * 22));
          setPitchVariance((prev) => Math.min(96, Math.max(78, prev + (Math.random() * 4 - 2))));
          return s + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isDrillRunning, activeDrill]);

  const handleStartDrill = async (drill: VoiceDrill) => {
    setActiveDrill(drill);
    setDrillSeconds(0);
    setDrillScore(null);
    setFillerCount(0);
    setIsDrillRunning(true);
    await audioService.startMicrophone();
  };

  const handleCompleteDrill = () => {
    setIsDrillRunning(false);
    audioService.stopMicrophone();

    if (activeDrill) {
      const score = Math.floor(90 + Math.random() * 9);
      setDrillScore(score);
      audioService.playTone('success');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#8B5CF6', '#10B981'],
      });
    }
  };

  const handleSimulateFiller = () => {
    setFillerCount((c) => c + 1);
    audioService.playTone('metric');
  };

  const runCalibration = () => {
    setIsCalibrating(true);
    audioService.playTone('activate');
    setTimeout(() => {
      setIsCalibrating(false);
      setClarityIndex(99.4);
      setPitchVariance(92);
      audioService.playTone('success');
    }, 1800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-28 pt-2">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#171b26] to-[#0f1422] border border-white/10 p-5 sm:p-6 overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#d0bcff] font-bold">
                ACOUSTIC LAB & DRILL CRUCIBLE
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">· Bio-Acoustic Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
              Real-Time Speech Telemetry & Crucible
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mt-1 leading-relaxed">
              Analyze vocal resonance, cadenced pause compliance, and speech velocity down to the millisecond.
            </p>
          </div>

          <button
            onClick={runCalibration}
            disabled={isCalibrating}
            className="px-4 py-2.5 rounded-xl bg-[#1F2937] border border-white/10 hover:border-[#06B6D4]/40 text-xs text-white font-heading font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-[#06B6D4] ${isCalibrating ? 'animate-spin' : ''}`} />
            <span>{isCalibrating ? 'Calibrating Sensors...' : 'Acoustic Calibration'}</span>
          </button>
        </div>
      </div>

      {/* 4 Telemetry Gauges / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Gauge 1: Pace & WPM */}
        <div className="p-4 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs">
            <span className="font-heading font-semibold text-white">Cadence Pace</span>
            <Gauge className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-[#06B6D4]">
              {liveWpm}
            </span>
            <span className="text-xs text-[#94A3B8] font-mono ml-1">WPM</span>
          </div>
          <div className="text-[10px] text-[#10B981] font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
            Optimal Zone (135-155)
          </div>
        </div>

        {/* Gauge 2: Pitch Variance & Modulation */}
        <div className="p-4 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs">
            <span className="font-heading font-semibold text-white">Pitch Dynamics</span>
            <Activity className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-[#8B5CF6]">
              {pitchVariance}%
            </span>
            <span className="text-xs text-[#94A3B8] font-mono ml-1">Resonance</span>
          </div>
          <div className="text-[10px] text-[#d0bcff] font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] inline-block" />
            Commanding Baritone
          </div>
        </div>

        {/* Gauge 3: Filler Word Meter */}
        <div className="p-4 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs">
            <span className="font-heading font-semibold text-white">Filler Detection</span>
            <AlertTriangle className={`w-4 h-4 ${fillerCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`} />
          </div>
          <div className="my-2 flex items-baseline justify-between">
            <div>
              <span className={`text-2xl sm:text-3xl font-heading font-bold ${fillerCount > 0 ? 'text-amber-400' : 'text-[#10B981]'}`}>
                {fillerCount}
              </span>
              <span className="text-xs text-[#94A3B8] font-mono ml-1">Detected</span>
            </div>
            <button
              onClick={handleSimulateFiller}
              className="text-[10px] font-mono text-[#94A3B8] hover:text-white px-1.5 py-0.5 rounded bg-white/5 cursor-pointer"
              title="Test filler detector"
            >
              +Flag "Um"
            </button>
          </div>
          <div className="text-[10px] text-[#94A3B8] font-mono">
            {fillerCount === 0 ? 'Zero filler purity' : `${fillerCount} fillers flagged`}
          </div>
        </div>

        {/* Gauge 4: Articulation Clarity */}
        <div className="p-4 rounded-2xl bg-[#111827]/85 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs">
            <span className="font-heading font-semibold text-white">Acoustic Clarity</span>
            <Sparkles className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-[#10B981]">
              {clarityIndex}%
            </span>
            <span className="text-xs text-[#94A3B8] font-mono ml-1">Index</span>
          </div>
          <div className="text-[10px] text-[#10B981] font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
            Studio Broadcast Grade
          </div>
        </div>
      </div>

      {/* Active Drill Arena (If running) */}
      {activeDrill && (
        <div className="rounded-2xl bg-[#171b26] border border-[#06B6D4]/40 p-5 sm:p-6 flex flex-col gap-4 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#06B6D4]/20 text-[#4cd7f6] font-bold">
                LIVE DRILL: {activeDrill.difficulty}
              </span>
              <h2 className="text-base font-heading font-bold text-white">
                {activeDrill.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-base font-mono font-bold text-[#06B6D4]">
                {drillSeconds}s / {activeDrill.targetDuration}s
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#dfe2f1] leading-relaxed bg-[#0B0F19]/60 p-3.5 rounded-xl border border-white/5">
            <span className="font-semibold text-[#06B6D4] block mb-1">SCENARIO:</span>
            {activeDrill.scenario}
          </p>

          {/* Equalizer Waveform */}
          <div className="flex justify-center my-2">
            <AudioWaveform
              isActive={isDrillRunning}
              isSpeaking={false}
              barCount={40}
              height={44}
              mode="gradient"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setActiveDrill(null)}
              className="px-4 py-2 rounded-xl text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              Exit Drill
            </button>

            {isDrillRunning ? (
              <button
                onClick={handleCompleteDrill}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-heading font-semibold text-xs shadow-lg transition-all cursor-pointer animate-pulse"
              >
                <div className="w-2.5 h-2.5 rounded-sm bg-white" />
                <span>Halt & Calculate Crucible Score</span>
              </button>
            ) : (
              <button
                onClick={() => handleStartDrill(activeDrill)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white font-heading font-semibold text-xs shadow-lg transition-all cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span>Re-run Crucible Drill</span>
              </button>
            )}
          </div>

          {/* Score results */}
          {drillScore && (
            <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-sm font-heading font-bold text-[#4edea3] flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Drill Performance: {drillScore}/100
                </span>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                  Cadence: {liveWpm} WPM · Fillers: {fillerCount} · Harmonic Pitch: {pitchVariance}%
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono font-bold text-xs">
                +180 XP EARNED
              </span>
            </div>
          )}
        </div>
      )}

      {/* Speed Drills Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          High-Velocity Speech Drills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VOICE_DRILLS.map((drill) => (
            <div
              key={drill.id}
              className="p-4 rounded-2xl bg-[#111827]/85 border border-white/10 hover:border-white/20 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-[#94A3B8] border border-white/5">
                    {drill.category}
                  </span>
                  <span className="text-xs font-mono text-[#06B6D4] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {drill.targetDuration}s Target
                  </span>
                </div>

                <h3 className="text-sm font-heading font-bold text-white mb-1">
                  {drill.title}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-3">
                  {drill.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#10B981]">
                  Best Score: {drill.bestScore}/100
                </span>
                <button
                  onClick={() => handleStartDrill(drill)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#06B6D4]/15 hover:bg-[#06B6D4]/25 text-[#4cd7f6] text-xs font-heading font-semibold transition-colors cursor-pointer border border-[#06B6D4]/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Drill</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
