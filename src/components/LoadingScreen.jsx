import { GraduationCap } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#00000a' }}
    >
      {/* Deep background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Particle dots bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              left:       `${Math.random() * 100}%`,
              top:        `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
              opacity:    Math.random() * 0.4 + 0.1,
              animation:  `glowPulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-10 z-10">

        {/* Icon with concentric rings */}
        <div className="relative flex items-center justify-center">
          {/* Ring 3 */}
          <div
            className="absolute w-40 h-40 rounded-full"
            style={{
              border: '1px solid rgba(99,102,241,0.08)',
              animation: 'ping-slow 3s ease-out infinite',
              animationDelay: '0.5s',
            }}
          />
          {/* Ring 2 */}
          <div
            className="absolute w-28 h-28 rounded-full"
            style={{
              border: '1px solid rgba(99,102,241,0.15)',
              animation: 'ping-slow 3s ease-out infinite',
            }}
          />
          {/* Ring 1 */}
          <div
            className="absolute w-20 h-20 rounded-full"
            style={{
              border: '1px solid rgba(99,102,241,0.25)',
              animation: 'glowPulse 2s ease-in-out infinite',
            }}
          />

          {/* Core icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
            style={{
              background: 'linear-gradient(135deg, #818cf8 -20%, #6366f1 40%, #4338ca 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.15) inset, 0 0 0 1px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.8), 0 0 120px rgba(99,102,241,0.4)',
            }}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <div
            className="font-display font-black mb-1"
            style={{
              fontSize: '2.2rem',
              letterSpacing: '-0.05em',
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 30%, #a5b4fc 60%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
            }}
          >
            LearnPro
          </div>
          <div
            className="text-[10px] font-black uppercase"
            style={{ color: 'rgba(165,180,252,0.4)', letterSpacing: '0.28em' }}
          >
            EdTech Platform
          </div>
        </div>

        {/* Loading bar */}
        <div
          className="w-56 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(99,102,241,0.12)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #6366f1, #818cf8, #c4b5fd, #818cf8, #6366f1, transparent)',
              backgroundSize: '400% 100%',
              animation: 'shimmer 1.8s ease-in-out infinite',
              boxShadow: '0 0 10px rgba(99,102,241,0.8)',
            }}
          />
        </div>

        {/* Three dots */}
        <div className="flex items-center gap-2.5">
          {[
            { c: '#6366f1', d: '0ms' },
            { c: '#8b5cf6', d: '200ms' },
            { c: '#c4b5fd', d: '400ms' },
          ].map(({ c, d }, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                background: c,
                boxShadow: `0 0 8px ${c}`,
                animationDelay: d,
                animationDuration: '1.2s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}