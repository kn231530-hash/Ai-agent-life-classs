/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomDock } from './components/BottomDock';
import { VoiceStudio } from './components/VoiceStudio';
import { Academy } from './components/Academy';
import { VoiceLab } from './components/VoiceLab';
import { MasteryVault } from './components/MasteryVault';
import { MENTORS, ACADEMY_TRACKS, INITIAL_USER_PROGRESS } from './data/mockData';
import { Mentor, AcademyTrack, UserProgress } from './types';
import { audioService } from './services/audioService';
import { Wifi, Battery, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('studio');
  const [mentors] = useState<Mentor[]>(MENTORS);
  const [activeMentor, setActiveMentor] = useState<Mentor>(MENTORS[0]);
  const [tracks, setTracks] = useState<AcademyTrack[]>(ACADEMY_TRACKS);
  const [progress, setProgress] = useState<UserProgress>(INITIAL_USER_PROGRESS);

  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);

  // Toggle mic action
  const handleToggleMic = async () => {
    if (isListening) {
      setIsListening(false);
      audioService.stopMicrophone();
      audioService.stopSpeechRecognition();
    } else {
      setIsListening(true);
      const ok = await audioService.startMicrophone();
      // Start browser recognition if supported
      audioService.startSpeechRecognition(
        (transcript, isFinal) => {
          if (isFinal) {
            setIsListening(false);
            audioService.stopMicrophone();
          }
        },
        () => {
          // Fallback or silence
        }
      );
    }
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      audioService.stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  const handleCompleteLesson = (lessonId: string, earnedXp: number) => {
    setTracks((prev) =>
      prev.map((t) => {
        const updatedLessons = t.lessons.map((l) =>
          l.id === lessonId ? { ...l, status: 'completed' as const } : l
        );
        const completedCount = updatedLessons.filter((l) => l.status === 'completed').length;
        const progressPct = Math.round((completedCount / t.totalLessons) * 100);
        return {
          ...t,
          lessons: updatedLessons,
          completedLessons: completedCount,
          progressPercent: progressPct,
        };
      })
    );

    setProgress((prev) => {
      const nextXp = prev.currentXp + earnedXp;
      const leveledUp = nextXp >= prev.nextLevelXp;
      return {
        ...prev,
        currentXp: nextXp,
        level: leveledUp ? prev.level + 1 : prev.level,
        nextLevelXp: leveledUp ? prev.nextLevelXp + 2000 : prev.nextLevelXp,
      };
    });

    audioService.playTone('success');
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#06B6D4', '#8B5CF6', '#10B981'],
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#dfe2f1] flex flex-col font-sans selection:bg-[#06B6D4]/30">
      {/* Background radial gradient ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#06B6D4]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[140px]" />
      </div>

      {isMobilePreview ? (
        /* Dedicated Handheld Frame Preview (iPhone 16 Pro Style) */
        <div className="relative z-10 flex-1 flex items-center justify-center p-2 sm:p-6">
          <div className="relative w-full max-w-[420px] h-[880px] max-h-[95vh] bg-[#0B0F19] border-[6px] border-[#222838] rounded-[48px] shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden">
            {/* Dynamic Island / Top Notch */}
            <div className="absolute top-0 inset-x-0 h-10 z-50 flex items-center justify-between px-6 pt-2 pointer-events-none select-none">
              <span className="text-[12px] font-mono font-bold text-white tracking-tight">
                9:41
              </span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                <span className="text-[9px] font-mono text-[#06B6D4]">SYNTHETIX</span>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* In-Frame Header */}
            <div className="pt-8">
              <Navbar
                progress={progress}
                isMobilePreview={isMobilePreview}
                onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
              />
            </div>

            {/* In-Frame Screen Scroll Container */}
            <main className="flex-1 overflow-y-auto px-3 pt-2 pb-24 scrollbar-none">
              {activeTab === 'studio' && (
                <VoiceStudio
                  mentors={mentors}
                  activeMentor={activeMentor}
                  onSelectMentor={setActiveMentor}
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  onToggleMic={handleToggleMic}
                />
              )}

              {activeTab === 'academy' && (
                <Academy
                  tracks={tracks}
                  onCompleteLesson={handleCompleteLesson}
                />
              )}

              {activeTab === 'lab' && <VoiceLab />}

              {activeTab === 'vault' && (
                <MasteryVault progress={progress} />
              )}
            </main>

            {/* In-Frame Bottom Navigation Dock */}
            <BottomDock
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              isListening={isListening}
              isSpeaking={isSpeaking}
              onToggleMic={handleToggleMic}
            />
          </div>
        </div>
      ) : (
        /* Fluid Full-Bleed Responsive Canvas */
        <div className="relative z-10 flex-1 flex flex-col">
          <Navbar
            progress={progress}
            isMobilePreview={isMobilePreview}
            onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28">
            {activeTab === 'studio' && (
              <VoiceStudio
                mentors={mentors}
                activeMentor={activeMentor}
                onSelectMentor={setActiveMentor}
                isListening={isListening}
                isSpeaking={isSpeaking}
                onToggleMic={handleToggleMic}
              />
            )}

            {activeTab === 'academy' && (
              <Academy
                tracks={tracks}
                onCompleteLesson={handleCompleteLesson}
              />
            )}

            {activeTab === 'lab' && <VoiceLab />}

            {activeTab === 'vault' && (
              <MasteryVault progress={progress} />
            )}
          </main>

          <BottomDock
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            isListening={isListening}
            isSpeaking={isSpeaking}
            onToggleMic={handleToggleMic}
          />
        </div>
      )}
    </div>
  );
}
