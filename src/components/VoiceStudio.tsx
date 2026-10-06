import React, { useState, useRef, useEffect } from 'react';
import { Mentor, TranscriptMessage } from '../types';
import { NeuralVoiceOrb } from './NeuralVoiceOrb';
import { AudioWaveform } from './AudioWaveform';
import {
  Send,
  Zap,
  RotateCcw,
  Volume2,
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface VoiceStudioProps {
  mentors: Mentor[];
  activeMentor: Mentor;
  onSelectMentor: (mentor: Mentor) => void;
  isListening: boolean;
  isSpeaking: boolean;
  onToggleMic: () => void;
  onSessionComplete?: (metrics: any) => void;
}

export const VoiceStudio: React.FC<VoiceStudioProps> = ({
  mentors,
  activeMentor,
  onSelectMentor,
  isListening,
  isSpeaking,
  onToggleMic,
  onSessionComplete,
}) => {
  const [messages, setMessages] = useState<TranscriptMessage[]>([
    {
      id: 'm-init',
      speaker: 'mentor',
      speakerName: activeMentor.name,
      text: `Greetings. I am ${activeMentor.name}. We are tuned for low-latency voice telemetry. Deliver your hypothesis or challenge, and let's stress-test your first principles.`,
      timestamp: '08:14:02',
      metrics: {
        latencyMs: 19,
        clarityScore: 99.4,
      },
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [activeMode, setActiveMode] = useState<'socratic' | 'rebuttal' | 'first-principles'>('socratic');
  const transcriptBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll transcript to bottom
  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  const quickPrompts = [
    { label: 'Raft Consensus', prompt: 'Test me on Raft split-brain prevention and quorum commitment rules.' },
    { label: '60s Pitch Drill', prompt: 'Critique my 60-second executive pitch for low-latency sovereign inference.' },
    { label: 'CAP Theorem Defense', prompt: 'Challenge my PACELC architecture under multi-region cross-Atlantic partitions.' },
    { label: 'KV-Cache Optimization', prompt: 'How does PagedAttention eliminate memory fragmentation in speculative decoding?' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userMsg: TranscriptMessage = {
      id: `u-${Date.now()}`,
      speaker: 'user',
      speakerName: 'You (Transcribed)',
      text: query,
      timestamp: userTimestamp,
      metrics: {
        latencyMs: 24,
        wpm: 146,
        clarityScore: 97.5,
      },
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate responsive Socratic response from active mentor
    setTimeout(() => {
      generateMentorResponse(query);
    }, 600);
  };

  const generateMentorResponse = (userPrompt: string) => {
    const startMs = Date.now();
    let reply = '';

    const lower = userPrompt.toLowerCase();
    if (lower.includes('raft') || lower.includes('split-brain')) {
      reply = `In Raft, safety is preserved because an elected leader must contain all committed entries from prior terms. If a network partition isolates 2 nodes out of 5, that partition can never achieve majority quorum. The key question is: what occurs when the partitioned leader attempts to commit client logs?`;
    } else if (lower.includes('pitch') || lower.includes('sovereign')) {
      reply = `Strong initial hook. However, observe your cadence: you front-loaded technical specifications before quantifying the enterprise risk. Lead with the 18% margin erosion and compliance exposure first—then introduce your sovereign inference architecture as the inescapable conclusion.`;
    } else if (lower.includes('cap') || lower.includes('pacelc')) {
      reply = `Accurate articulation of PACELC. But under intense transatlantic fiber degradation, how do you handle idempotency during asynchronous fallback writes? Walk me through your compensation ledger.`;
    } else if (lower.includes('kv') || lower.includes('pagedattention')) {
      reply = `PagedAttention borrows from OS virtual memory paging, dividing KV caches into non-contiguous blocks. This reduces fragmentation from 60% down to under 4%. Now explain: how does this interact with parallel batch verification during speculative decoding?`;
    } else {
      reply = `A compelling proposition. Let us examine the underlying invariant: are you assuming synchronous coordination at the edge, or relying on conflict-free replicated data types (CRDTs)? Formulate your defense in under 45 seconds.`;
    }

    const elapsed = Date.now() - startMs + 18;
    const mentorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const mentorMsg: TranscriptMessage = {
      id: `m-${Date.now()}`,
      speaker: 'mentor',
      speakerName: activeMentor.name,
      text: reply,
      timestamp: mentorTimestamp,
      metrics: {
        latencyMs: elapsed,
        clarityScore: 99.2,
      },
    };

    setMessages((prev) => [...prev, mentorMsg]);

    // Audible voice synthesis
    audioService.speak(reply, {
      pitch: activeMentor.pitch,
      rate: activeMentor.rate,
    });
  };

  const clearTranscript = () => {
    setMessages([
      {
        id: `m-reset-${Date.now()}`,
        speaker: 'mentor',
        speakerName: activeMentor.name,
        text: `Session re-calibrated. Ready for voice interaction with ${activeMentor.name}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        metrics: { latencyMs: 16 },
      },
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 pb-28 pt-2">
      {/* Mentor Selection Row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            Active Neural Mentors
          </span>
          <span className="text-[11px] font-mono text-[#06B6D4]">
            {activeMentor.tag}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {mentors.map((m) => {
            const isSelected = m.id === activeMentor.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  onSelectMentor(m);
                  audioService.playTone('metric');
                }}
                className={`relative flex items-center gap-2.5 p-2 rounded-xl transition-all cursor-pointer text-left border ${
                  isSelected
                    ? 'bg-[#171b26] border-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-[#111827]/80 border-white/5 hover:border-white/20'
                }`}
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className={`w-9 h-9 rounded-lg object-cover border ${
                    isSelected ? 'border-[#06B6D4]' : 'border-white/10'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-heading font-semibold text-white truncate">
                    {m.name}
                  </p>
                  <p className="text-[10px] text-[#94A3B8] truncate">{m.title}</p>
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_6px_#06B6D4] absolute top-2 right-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Neural Orb Workspace & Live Frequency Canvas */}
      <div className="relative rounded-2xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 p-5 sm:p-6 overflow-hidden flex flex-col items-center">
        {/* Background gradient flare */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#06B6D4]/15 via-[#8B5CF6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Mode Selector Badges */}
        <div className="flex items-center gap-2 mb-2 z-10">
          {(['socratic', 'rebuttal', 'first-principles'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1 rounded-full text-[11px] font-heading font-semibold transition-all cursor-pointer ${
                activeMode === mode
                  ? 'bg-[#06B6D4]/20 border border-[#06B6D4] text-[#4cd7f6] shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-[#1F2937]/50 border border-white/5 text-[#94A3B8] hover:text-white'
              }`}
            >
              {mode === 'socratic'
                ? 'Socratic Inquest'
                : mode === 'rebuttal'
                ? 'Rapid Rebuttal'
                : 'First Principles'}
            </button>
          ))}
        </div>

        {/* Central Neural Voice Orb */}
        <NeuralVoiceOrb
          isListening={isListening}
          isSpeaking={isSpeaking}
          onClick={onToggleMic}
          mentorName={activeMentor.name}
        />

        {/* Equalizer Waveform Canvas */}
        <div className="w-full flex flex-col items-center justify-center my-1 z-10">
          <AudioWaveform
            isActive={isListening}
            isSpeaking={isSpeaking}
            barCount={44}
            height={40}
            mode={isListening ? 'cyan' : isSpeaking ? 'violet' : 'gradient'}
          />
        </div>

        {/* Live Audio Telemetry Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-4 pt-3 border-t border-white/[0.08] text-center font-mono text-[11px]">
          <div className="p-2 rounded-lg bg-[#0B0F19]/50 border border-white/5">
            <span className="text-[#94A3B8] block text-[10px]">Speech RTT</span>
            <span className="font-semibold text-[#06B6D4]">
              {isListening ? '18ms Streaming' : '22ms Sync'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#0B0F19]/50 border border-white/5">
            <span className="text-[#94A3B8] block text-[10px]">Cadence Target</span>
            <span className="font-semibold text-[#8B5CF6]">145 WPM</span>
          </div>
          <div className="p-2 rounded-lg bg-[#0B0F19]/50 border border-white/5">
            <span className="text-[#94A3B8] block text-[10px]">Phoneme Clarity</span>
            <span className="font-semibold text-[#10B981]">98.9%</span>
          </div>
          <div className="p-2 rounded-lg bg-[#0B0F19]/50 border border-white/5">
            <span className="text-[#94A3B8] block text-[10px]">Filler Tolerance</span>
            <span className="font-semibold text-amber-300">0 / 60s max</span>
          </div>
        </div>
      </div>

      {/* Quick Prompts Chips */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-heading font-semibold text-[#94A3B8] flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Rapid Socratic Probes
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              className="px-3 py-1.5 rounded-full text-xs bg-[#1F2937]/70 hover:bg-[#06B6D4]/15 border border-white/10 hover:border-[#06B6D4]/40 text-[#dfe2f1] hover:text-[#4cd7f6] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Live Transcript Stream */}
      <div className="rounded-2xl bg-[#111827]/75 backdrop-blur-xl border border-white/10 p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <h3 className="font-heading font-semibold text-sm text-white">
              Live Neural Transcript
            </h3>
          </div>
          <button
            onClick={clearTranscript}
            className="flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Stream
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
          {messages.map((msg) => {
            const isUser = msg.speaker === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1.5 p-3 rounded-xl transition-all ${
                  isUser
                    ? 'bg-[#1e2738]/90 border border-[#06B6D4]/30 ml-4 sm:ml-8'
                    : 'bg-[#171b26]/90 border border-white/[0.08] mr-4 sm:mr-8'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-heading font-semibold flex items-center gap-1.5 ${
                      isUser ? 'text-[#06B6D4]' : 'text-[#8B5CF6]'
                    }`}
                  >
                    {!isUser && <Volume2 className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                    {msg.speakerName}
                  </span>
                  <div className="flex items-center gap-2 text-[#94A3B8] font-mono text-[10px]">
                    {msg.metrics?.latencyMs && (
                      <span className="text-[#10B981]">{msg.metrics.latencyMs}ms</span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#dfe2f1] leading-relaxed">
                  {msg.text}
                </p>
              </div>
            );
          })}
          <div ref={transcriptBottomRef} />
        </div>

        {/* Input Bar with Embedded Right-Aligned Voice/Send Icon as described in spec */}
        <div className="relative mt-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Type hypothesis or speak into the neural mic..."
            className="w-full bg-[#0B0F19] border border-white/10 focus:border-[#06B6D4] rounded-xl pl-4 pr-24 py-3 text-xs sm:text-sm text-[#dfe2f1] placeholder-[#64748B] outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button
              onClick={onToggleMic}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isListening
                  ? 'bg-[#06B6D4] text-black shadow-[0_0_10px_#06B6D4]'
                  : 'text-[#94A3B8] hover:text-[#06B6D4] hover:bg-white/5'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice recording'}
            >
              <Zap className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                inputText.trim()
                  ? 'bg-[#06B6D4] text-[#003640] hover:bg-[#4cd7f6]'
                  : 'text-[#64748B] cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
