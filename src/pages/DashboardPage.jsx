import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Trophy, TrendingUp, Clock, Play,
  CheckCircle, GraduationCap, ArrowRight, Star
} from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/enroll/my');
        setEnrollments(data.data);
      } catch { /* silent */ }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const completed   = enrollments.filter(e => e.progress?.isCompleted);
  const inProgress  = enrollments.filter(e => !e.progress?.isCompleted);
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + (e.progress?.percentComplete || 0), 0) / enrollments.length)
    : 0;

  const stats = [
    { icon: BookOpen,     label: 'Enrolled',    value: enrollments.length, color: 'text-brand-400',   bg: 'bg-brand-500/10'   },
    { icon: TrendingUp,   label: 'In progress', value: inProgress.length,  color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
    { icon: Trophy,       label: 'Completed',   value: completed.length,   color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: GraduationCap,label: 'Avg. progress',value: `${avgProgress}%`, color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  ];

  return (
    <main className="section py-8 pb-20">
      {/* Greeting */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user?.avatarUrl}
          alt={user?.name}
          className="w-14 h-14 rounded-full ring-2 ring-brand-500/30 flex-shrink-0"
        />
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-white/50 text-sm mt-0.5">Continue where you left off.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="font-display text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-white/40 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card p-5 flex gap-4 animate-pulse">
              <div className="skeleton w-28 h-20 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
                <div className="skeleton h-2 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : enrollments.length === 0 ? (
        <div className="card text-center py-16">
          <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-white mb-2">No courses yet</h3>
          <p className="text-white/40 mb-6 max-w-sm mx-auto">
            Browse our catalog and enroll in your first course to get started.
          </p>
          <Link to="/courses" className="btn-primary mx-auto">
            Browse courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* In Progress */}
          {inProgress.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                In progress
                <span className="badge-amber ml-1">{inProgress.length}</span>
              </h2>
              <div className="space-y-3">
                {inProgress.map(e => (
                  <EnrollmentCard key={e._id} enrollment={e} />
                ))}
              </div>
            </section>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-emerald-400" />
                Completed
                <span className="badge-green ml-1">{completed.length}</span>
              </h2>
              <div className="space-y-3">
                {completed.map(e => (
                  <EnrollmentCard key={e._id} enrollment={e} completed />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

function EnrollmentCard({ enrollment, completed }) {
  const { course, progress } = enrollment;
  if (!course) return null;

  const percent = progress?.percentComplete || 0;

  return (
    <div className="card p-5 flex gap-4 hover:border-white/20 transition-colors">
      <div className="w-28 h-20 rounded-xl overflow-hidden bg-surface-800 flex-shrink-0">
        <img
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80'}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm leading-snug truncate">
              {course.title}
            </h3>
            <p className="text-xs text-white/40 mt-0.5">by {course.instructor}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs text-white/60">{course.rating?.toFixed(1)}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/40">
              {progress?.completedLessons?.length || 0} / {course.lessons?.length || 0} lessons
            </span>
            <span className={`text-xs font-semibold ${completed ? 'text-emerald-400' : 'text-brand-400'}`}>
              {percent}%
            </span>
          </div>
          <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                completed
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  : 'bg-gradient-to-r from-brand-500 to-purple-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </div>
          {completed ? (
            <Link to={`/learn/${course._id}`} className="btn-ghost text-xs gap-1 py-1.5 px-3">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Review course
            </Link>
          ) : (
            <Link to={`/learn/${course._id}`} className="btn-primary text-xs gap-1 py-1.5 px-3">
              <Play className="w-3.5 h-3.5" />
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}