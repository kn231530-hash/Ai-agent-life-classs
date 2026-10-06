import React from 'react';
import { motion } from 'motion/react';
import { Mic, Volume2 } from 'lucide-react';

interface NeuralVoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  mentorName: string;
}

export const NeuralVoiceOrb: React.FC<NeuralVoiceOrbProps> = ({
  isListening,
  isSpeaking,
  onClick,
  mentorName,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none">
      {/* Outer ambient glow rings */}
      <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60">
        {/* Deep ambient blur sphere */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isListening
              ? 'bg-[#06B6D4]/30 opacity-90'
              : isSpeaking
              ? 'bg-[#8B5CF6]/30 opacity-90'
              : 'bg-[#06B6D4]/10 opacity-40'
          }`}
        />

        {/* Concentric ripple 1 */}
        <motion.div
          animate={
            isListening || isSpeaking
              ? { scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }
              : { scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }
          }
          transition={{
            repeat: Infinity,
            duration: isListening ? 2.2 : isSpeaking ? 2.6 : 4,
            ease: 'easeInOut',
          }}
          className={`absolute inset-3 rounded-full border border-dashed transition-colors duration-500 ${
            isListening
              ? 'border-[#06B6D4]/50'
              : isSpeaking
              ? 'border-[#8B5CF6]/50'
              : 'border-white/10'
          }`}
        />

        {/* Concentric ripple 2 */}
        <motion.div
          animate={
            isListening || isSpeaking
              ? { scale: [1.1, 1.35, 1.1], opacity: [0.15, 0.45, 0.15] }
              : { scale: [1.02, 1.08, 1.02], opacity: [0.1, 0.18, 0.1] }
          }
          transition={{
            repeat: Infinity,
            duration: isListening ? 3 : isSpeaking ? 3.4 : 5,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className={`absolute -inset-2 rounded-full border transition-colors duration-500 ${
            isListening
              ? 'border-[#06B6D4]/30'
              : isSpeaking
              ? 'border-[#8B5CF6]/30'
              : 'border-white/5'
          }`}
        />

        {/* Orbital Frequency Node Dots */}
        {(isListening || isSpeaking) && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_#06B6D4]" />
            <div className="absolute bottom-3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            <div className="absolute right-4 top-1/3 w-2 h-2 rounded-full bg-[#4EDEa3] shadow-[0_0_10px_#4EDEa3]" />
          </motion.div>
        )}

        {/* Center Interactive Core Orb */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClick}
          className={`relative z-10 w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-500 cursor-pointer shadow-2xl ${
            isListening
              ? 'bg-gradient-to-br from-[#06B6D4] via-[#0284c7] to-[#8B5CF6] shadow-[0_0_40px_rgba(6,182,212,0.65)] ring-4 ring-[#06B6D4]/40'
              : isSpeaking
              ? 'bg-gradient-to-br from-[#8B5CF6] via-[#6d28d9] to-[#06B6D4] shadow-[0_0_40px_rgba(139,92,246,0.65)] ring-4 ring-[#8B5CF6]/40'
              : 'bg-gradient-to-b from-[#1c2233] to-[#111827] border border-white/15 hover:border-[#06B6D4]/50 shadow-[0_0_20px_rgba(0,0,0,0.6)]'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start voice conversation'}
        >
          {/* Subtle inner glassy highlight */}
          <div className="absolute inset-x-4 top-2 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />

          {/* Central Icon */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-1.5"
              >
                <Mic className="w-6 h-6 animate-pulse text-white" />
              </motion.div>
            ) : isSpeaking ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-1.5"
              >
                <Volume2 className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#1e2738] border border-white/10 flex items-center justify-center text-[#4cd7f6] mb-1.5 group-hover:scale-105 transition-transform">
                <Mic className="w-6 h-6 text-[#06B6D4]" />
              </div>
            )}

            <span className="text-xs font-semibold tracking-wider uppercase text-white/95 font-heading">
              {isListening
                ? 'Listening...'
                : isSpeaking
                ? 'Synthesizing'
                : 'Tap to Engage'}
            </span>

            <span className="text-[11px] text-white/70 font-mono mt-0.5">
              {isListening ? 'Streaming input' : isSpeaking ? mentorName : 'Voice Active'}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Sub-text hint */}
      <div className="mt-3 text-center">
        <p className="text-xs text-[#94A3B8] font-mono flex items-center gap-2 justify-center">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          Neural Nexus Ready · 24ms Speech RTT
        </p>
      </div>
    </div>
  );
};
