import { Link } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, Lock } from 'lucide-react';

const levelColor = {
  Beginner:     'badge-green',
  Intermediate: 'badge-amber',
  Advanced:     'badge-red',
};

export default function CourseCard({ course }) {
  const {
    _id, title, thumbnail, instructor, category,
    level, duration, price, isFree, rating, reviewCount,
    enrolledCount, shortDescription,
  } = course;

  return (
    <Link to={`/courses/${_id}`} className="group block">
      <div className="card-hover h-full flex flex-col overflow-hidden">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-surface-800 flex-shrink-0">
          <img
            src={thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price badge */}
          <div className="absolute top-3 right-3">
            {isFree ? (
              <span className="badge-green text-xs font-bold px-2.5 py-1">FREE</span>
            ) : (
              <span className="bg-surface-950/90 text-white text-xs font-bold
                               px-2.5 py-1 rounded-full border border-white/10">
                ${price}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Category + Level */}
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <span className="badge-brand text-xs">{category}</span>
            <span className={`${levelColor[level] || 'badge-brand'} text-xs`}>{level}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white leading-snug mb-1.5
                          line-clamp-2 group-hover:text-brand-300 transition-colors">
            {title}
          </h3>

          {/* Short description */}
          {shortDescription && (
            <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed">
              {shortDescription}
            </p>
          )}

          {/* Instructor */}
          <p className="text-xs text-white/40 mb-3">by {instructor}</p>

          {/* Stats */}
          <div className="mt-auto flex items-center justify-between text-xs text-white/40 pt-3
                          border-t border-white/5">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-white/70 font-medium">{rating?.toFixed(1)}</span>
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