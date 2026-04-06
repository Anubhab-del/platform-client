import { GraduationCap } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-surface-950 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center
                        animate-pulse-slow">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}