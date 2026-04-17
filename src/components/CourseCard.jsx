import { Link } from 'react-router-dom';
import { Star, Clock, Users, Play } from 'lucide-react';

const levelConfig = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  label: 'Beginner'     },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', label: 'Intermediate' },
  Advanced:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.2)',  label: 'Advanced'     },
};

export default function CourseCard({ course }) {
  const {
    _id, title, thumbnail, instructor, category,
    level, duration, price, isFree, rating,
    reviewCount, enrolledCount, shortDescription,
  } = course;

  const lvl = levelConfig[level] || levelConfig.Beginner;

  return (
    <Link to={`/courses/${_id}`} className="group block h-full">
      <div
        className="h-full flex flex-col overflow-hidden rounded-2xl
                    transition-all duration-400"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 20px rgba(0,0,0,0.25)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.005)';
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.28)';
          e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.07) inset, 0 24px 50px rgba(0,0,0,0.4), 0 8px 20px rgba(99,102,241,0.12), 0 0 0 1px rgba(99,102,241,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 20px rgba(0,0,0,0.25)';
        }}
      >
        {/* ── Thumbnail ──────────────────────────────── */}
        <div className="relative overflow-hidden flex-shrink-0"
             style={{ aspectRatio: '16/9' }}>
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transformOrigin: 'center center' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />

          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(3,5,15,0.85) 0%, rgba(3,5,15,0.2) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, transparent 60%)',
            }}
          />

          {/* Play button on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center
                          transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(99,102,241,0.9)',
                boxShadow: '0 0 30px rgba(99,102,241,0.6)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3 z-10">
            {isFree ? (
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(16,185,129,0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.4)',
                }}
              >
                FREE
              </div>
            ) : (
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{
                  background: 'rgba(3,5,15,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                ${price}
              </div>
            )}
          </div>

          {/* Category bottom left */}
          <div className="absolute bottom-3 left-3 z-10">
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-semibold"
              style={{
                background: 'rgba(99,102,241,0.85)',
                backdropFilter: 'blur(8px)',
                color: '#e0e7ff',
                boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
              }}
            >
              {category}
            </div>
          </div>
        </div>

        {/* ── Content ────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-4">

          {/* Level pill */}
          <div className="flex items-center gap-2 mb-2.5">
            <div
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium"
              style={{
                background: lvl.bg,
                border: `1px solid ${lvl.border}`,
                color: lvl.color,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: lvl.color }} />
              {lvl.label}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-sm font-semibold leading-snug mb-1.5 line-clamp-2
                        transition-colors duration-200 group-hover:text-brand-300"
            style={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em' }}
          >
            {title}
          </h3>

          {/* Short desc */}
          {shortDescription && (
            <p
              className="text-xs line-clamp-2 mb-2.5 leading-relaxed flex-1"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {shortDescription}
            </p>
          )}

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=4338ca&color=fff&size=24`}
              alt={instructor}
              className="w-5 h-5 rounded-full"
            />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {instructor}
            </p>
          </div>

          {/* Stats bar */}
          <div
            className="flex items-center justify-between text-xs pt-3"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {rating?.toFixed(1)}
              </span>
              <span>({(reviewCount || 0).toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{(enrolledCount || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}