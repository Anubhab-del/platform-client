import { GraduationCap } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#03050f' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-8">

        {/* Logo mark */}
        <div className="relative">
          {/* Outer ring */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-30 animate-pulse"
            style={{
              background: 'transparent',
              border: '1px solid rgba(99,102,241,0.5)',
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute -inset-2 rounded-2xl opacity-50 animate-glow"
            style={{
              background: 'transparent',
              border: '1px solid rgba(99,102,241,0.3)',
            }}
          />

          {/* Core */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 32px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.3)',
            }}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <div
            className="font-display text-2xl font-bold mb-1"
            style={{
              background: 'linear-gradient(135deg, #e0e7ff, #a5b4fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LearnPro
          </div>
          <div
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em' }}
          >
            EdTech Platform
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-40 h-px rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {[0, 200, 400].map((delay) => (
            <div
              key={delay}
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background: 'rgba(99,102,241,0.6)',
                animationDelay: `${delay}ms`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}