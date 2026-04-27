import { Link } from 'react-router-dom';
import { Star, Clock, Users, Play, ArrowUpRight } from 'lucide-react';

const levelConfig = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)'  },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
  Advanced:     { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)'  },
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
        className="h-full flex flex-col overflow-hidden rounded-3xl transition-all duration-400"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.08) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.09) inset, 0 8px 40px rgba(0,0,0,0.5)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.012)';
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99,102,241,0.2) inset, 0 1px 0 rgba(255,255,255,0.12) inset, 0 40px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.09) inset, 0 8px 40px rgba(0,0,0,0.5)';
        }}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/9' }}>
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(2,0,8,0.92) 0%, rgba(2,0,8,0.3) 55%, transparent 100%)' }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, transparent 60%)' }}
          />

          {/* Play */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(99,102,241,0.92)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.2) inset, 0 0 60px rgba(99,102,241,0.8)',
              }}
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>

          {/* Price */}
          <div className="absolute top-3 right-3 z-10">
            {isFree ? (
              <div
                className="px-3 py-1.5 rounded-xl text-xs font-black text-white"
                style={{
                  background: 'rgba(16,185,129,0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 0 20px rgba(16,185,129,0.6)',
                  letterSpacing: '0.04em',
                }}
              >
                FREE
              </div>
            ) : (
              <div
                className="px-3 py-1.5 rounded-xl text-xs font-black text-white"
                style={{
                  background: 'rgba(2,0,8,0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                ${price}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="absolute bottom-3 left-3 z-10">
            <div
              className="px-3 py-1.5 rounded-xl text-xs font-black"
              style={{
                background: 'rgba(99,102,241,0.92)',
                backdropFilter: 'blur(8px)',
                color: '#e0e7ff',
                border: '1px solid rgba(165,180,252,0.35)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.5)',
                letterSpacing: '-0.01em',
              }}
            >
              {category}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black"
              style={{ background: lvl.bg, border: `1px solid ${lvl.border}`, color: lvl.color }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: lvl.color, boxShadow: `0 0 8px ${lvl.color}` }} />
              {level}
            </div>
            <ArrowUpRight
              className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-all duration-300 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0"
              style={{ color: '#818cf8' }}
            />
          </div>

          <h3
            className="font-display font-black text-sm leading-snug mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-brand-300"
            style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.03em', fontSize: '0.96rem' }}
          >
            {title}
          </h3>

          {shortDescription && (
            <p className="text-xs line-clamp-2 mb-3 leading-relaxed flex-1"
               style={{ color: 'rgba(255,255,255,0.32)' }}>
              {shortDescription}
            </p>
          )}

          <div className="flex items-center gap-2 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=4338ca&color=fff&size=24`}
              alt={instructor}
              className="w-5 h-5 rounded-lg"
            />
            <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.32)' }}>
              {instructor}
            </p>
          </div>

          <div
            className="flex items-center justify-between text-xs pt-3.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.32)' }}
          >
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-black" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {rating?.toFixed(1)}
              </span>
              <span>({(reviewCount || 0).toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="font-semibold">{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span className="font-semibold">{(enrolledCount || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}