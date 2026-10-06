import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isActive: boolean;
  isSpeaking: boolean;
  barCount?: number;
  className?: string;
  height?: number;
  mode?: 'cyan' | 'violet' | 'gradient';
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isActive,
  isSpeaking,
  barCount = 38,
  className = '',
  height = 48,
  mode = 'gradient'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bars = new Array(barCount).fill(4);

    const render = () => {
      phaseRef.current += (isActive || isSpeaking) ? 0.08 : 0.02;
      const phase = phaseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = 3;
      const gap = 3;
      const totalWidth = barCount * (barWidth + gap) - gap;
      const startX = (canvas.width - totalWidth) / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < barCount; i++) {
        const x = startX + i * (barWidth + gap);
        let targetH = 4;

        if (isActive) {
          // Dynamic harmonic audio simulation
          const wave1 = Math.sin(phase * 1.5 + i * 0.28) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 2.2 + i * 0.18) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.8 + i * 0.4) * 0.3;
          const bellCurve = Math.sin((i / barCount) * Math.PI);
          targetH = 4 + (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2) * bellCurve * (height - 8);
        } else if (isSpeaking) {
          // Mentor voice response waveform
          const wave1 = Math.sin(phase * 2.1 + i * 0.35) * 0.5 + 0.5;
          const wave2 = Math.sin(phase * 1.1 + i * 0.2) * 0.5 + 0.5;
          const bellCurve = Math.sin((i / barCount) * Math.PI);
          targetH = 4 + (wave1 * 0.6 + wave2 * 0.4) * bellCurve * (height - 10);
        } else {
          // Idle ambient resting state
          targetH = 4 + Math.sin(phase * 0.5 + i * 0.2) * 2;
        }

        // Smooth interpolation
        bars[i] += (targetH - bars[i]) * 0.25;
        const currentH = Math.max(3, bars[i]);

        // Rounded bar rendering
        ctx.beginPath();
        const topY = centerY - currentH / 2;
        const radius = barWidth / 2;

        if (ctx.roundRect) {
          ctx.roundRect(x, topY, barWidth, currentH, [radius]);
        } else {
          ctx.rect(x, topY, barWidth, currentH);
        }

        if (isActive || isSpeaking) {
          const gradient = ctx.createLinearGradient(0, topY, 0, topY + currentH);
          if (mode === 'cyan') {
            gradient.addColorStop(0, '#4cd7f6');
            gradient.addColorStop(1, '#06b6d4');
          } else if (mode === 'violet') {
            gradient.addColorStop(0, '#d0bcff');
            gradient.addColorStop(1, '#8b5cf6');
          } else {
            gradient.addColorStop(0, '#06B6D4');
            gradient.addColorStop(1, '#8B5CF6');
          }
          ctx.fillStyle = gradient;
          ctx.shadowColor = isActive ? 'rgba(6, 182, 212, 0.45)' : 'rgba(139, 92, 246, 0.45)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = '#374151';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isSpeaking, barCount, height, mode]);

  return (
    <canvas
      ref={canvasRef}
      width={barCount * 6 + 10}
      height={height}
      className={`block ${className}`}
    />
  );
};
