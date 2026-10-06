import React from 'react';
import { Mic, BookOpen, Activity, Award, Radio } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomDockProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isListening: boolean;
  isSpeaking: boolean;
  onToggleMic: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  activeTab,
  onSelectTab,
  isListening,
  isSpeaking,
  onToggleMic,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex justify-center pointer-events-none pb-3 px-3">
      <div className="relative pointer-events-auto max-w-md w-full bg-[#111827]/90 backdrop-blur-2xl border border-white/10 rounded-2xl px-3 py-2 shadow-2xl flex items-center justify-between">
        {/* Subtle top edge glow */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/40 to-transparent" />

        {/* Tab 1: Voice Studio */}
        <button
          onClick={() => onSelectTab('studio')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'studio' ? 'text-[#06B6D4]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <div className="relative">
            <Radio className="w-5 h-5" />
            {activeTab === 'studio' && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
            )}
          </div>
          <span className="text-[10px] font-heading font-medium tracking-tight mt-1">
            Studio
          </span>
        </button>

        {/* Tab 2: Academy Tracks */}
        <button
          onClick={() => onSelectTab('academy')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'academy' ? 'text-[#06B6D4]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {activeTab === 'academy' && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
            )}
          </div>
          <span className="text-[10px] font-heading font-medium tracking-tight mt-1">
            Academy
          </span>
        </button>

        {/* Central Floating Neural Mic (64x64px) with Pulsing Concentric Ring */}
        <div className="relative -top-5 px-2 flex items-center justify-center">
          {/* Animated concentric ring when listening or speaking */}
          {(isListening || isSpeaking) && (
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              className={`absolute inset-[-8px] rounded-full border-2 ${
                isListening ? 'border-[#06B6D4]' : 'border-[#8B5CF6]'
              }`}
            />
          )}

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={onToggleMic}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isListening
                ? 'bg-gradient-to-tr from-[#06B6D4] to-[#8B5CF6] scale-105 shadow-[0_0_30px_rgba(6,182,212,0.7)] ring-2 ring-white/50'
                : isSpeaking
                ? 'bg-gradient-to-tr from-[#8B5CF6] to-[#06B6D4] scale-105 shadow-[0_0_30px_rgba(139,92,246,0.7)] ring-2 ring-white/50'
                : 'bg-gradient-to-tr from-[#06B6D4] to-[#8B5CF6] shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:shadow-[0_0_26px_rgba(6,182,212,0.65)] ring-1 ring-white/20'
            }`}
            aria-label={isListening ? 'Deactivate microphone' : 'Activate neural microphone'}
          >
            <Mic
              className={`w-7 h-7 text-white transition-transform ${
                isListening ? 'animate-pulse' : ''
              }`}
            />
          </motion.button>
        </div>

        {/* Tab 3: Voice Lab & Telemetry */}
        <button
          onClick={() => onSelectTab('lab')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'lab' ? 'text-[#06B6D4]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <div className="relative">
            <Activity className="w-5 h-5" />
            {activeTab === 'lab' && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
            )}
          </div>
          <span className="text-[10px] font-heading font-medium tracking-tight mt-1">
            Voice Lab
          </span>
        </button>

        {/* Tab 4: Mastery Vault */}
        <button
          onClick={() => onSelectTab('vault')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'vault' ? 'text-[#06B6D4]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <div className="relative">
            <Award className="w-5 h-5" />
            {activeTab === 'vault' && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
            )}
          </div>
          <span className="text-[10px] font-heading font-medium tracking-tight mt-1">
            Vault
          </span>
        </button>
      </div>
    </div>
  );
};
