import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, Clock, Users, BookOpen, Award, ChevronRight,
  Play, Lock, CheckCircle, ArrowLeft, Globe, BarChart2
} from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const levelColor = {
  Beginner:     'badge-green',
  Intermediate: 'badge-amber',
  Advanced:     'badge-red',
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course,     setCourse]     = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [enrolled,   setEnrolled]   = useState(false);
  const [checkingEnroll, setCheckingEnroll] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data.data);
      } catch {
        toast.error('Course not found');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (!user || !course) return;
    const checkEnroll = async () => {
      try {
        const { data } = await api.get(`/enroll/check/${id}`);
        setEnrolled(data.isEnrolled);
      } catch { /* silent */ }
    };
    checkEnroll();
  }, [user, course, id]);

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return; }

    if (course.isFree || course.price === 0) {
      setCheckingEnroll(true);
      try {
        await api.post(`/enroll/${id}`, { amountPaid: 0 });
        setEnrolled(true);
        toast.success('Enrolled successfully! Start learning now.');
      } catch (err) {
        if (err.response?.status === 409) {
          setEnrolled(true);
        } else {
          toast.error(err.response?.data?.message || 'Enrollment failed');
        }
      } finally {
        setCheckingEnroll(false);
      }
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="section py-8">
        <div className="animate-pulse space-y-6">
          <div className="skeleton h-8 w-2/3 rounded-xl" />
          <div className="skeleton h-64 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-4/5 rounded" />
              <div className="skeleton h-4 w-3/4 rounded" />
            </div>
            <div className="skeleton h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <main className="pb-20">
      {/* Back */}
      <div className="section pt-6">
        <Link to="/courses" className="btn-ghost text-sm -ml-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to courses
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-surface-900 border-y border-white/5 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80'}
            alt={course.title}
            className="w-full h-full object-cover opacity-10 blur-sm"
          />
        </div>
        <div className="section relative z-10 py-10 lg:py-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge-brand">{course.category}</span>
              <span className={levelColor[course.level] || 'badge-brand'}>{course.level}</span>
              {course.isFree && <span className="badge-green font-bold">FREE</span>}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white
                           leading-tight mb-4">
              {course.title}
            </h1>
            <p className="text-white/70 text-base mb-6 leading-relaxed">
              {course.shortDescription || course.description?.slice(0, 160)}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <strong className="text-white">{course.rating?.toFixed(1)}</strong>
                <span>({(course.reviewCount || 0).toLocaleString()} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {(course.enrolledCount || 0).toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {course.language || 'English'}
              </span>
            </div>
            <p className="text-sm text-white/50 mt-3">
              Created by <span className="text-brand-300 font-medium">{course.instructor}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Course Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview Video */}
            {course.previewVideoUrl && (
              <div className="rounded-2xl overflow-hidden bg-surface-900 border border-white/10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <Play className="w-4 h-4 text-brand-400" />
                  <span className="text-sm font-medium text-white/70">Course preview</span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={course.previewVideoUrl}
                    title="Course Preview"
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            )}

            {/* About */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-white mb-3">About this course</h2>
              <p className="text-white/60 leading-relaxed text-sm">{course.description}</p>
            </div>

            {/* Instructor */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">Your instructor</h2>
              <div className="flex items-start gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=6366f1&color=fff&size=80`}
                  alt={course.instructor}
                  className="w-14 h-14 rounded-full ring-2 ring-brand-500/30 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-white">{course.instructor}</h3>
                  <p className="text-sm text-white/50 mt-1 leading-relaxed">
                    {course.instructorBio || 'Expert instructor with years of industry experience.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            {course.lessons?.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-bold text-white">Course curriculum</h2>
                  <span className="text-sm text-white/40">{course.lessons.length} lessons</span>
                </div>
                <div className="space-y-2">
                  {course.lessons.map((lesson, idx) => (
                    <div
                      key={lesson._id || idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface-800/50
                                 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-brand-500/10 flex items-center
                                      justify-center flex-shrink-0 text-xs font-bold text-brand-400">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 truncate">{lesson.title}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-white/40">{lesson.duration}</span>
                        {enrolled ? (
                          <Play className="w-3.5 h-3.5 text-brand-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-white/20" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Enroll Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card p-6 space-y-5">
              {/* Thumbnail */}
              <div className="rounded-xl overflow-hidden aspect-video bg-surface-800">
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price */}
              <div>
                {course.isFree ? (
                  <p className="font-display text-3xl font-bold text-emerald-400">Free</p>
                ) : (
                  <p className="font-display text-3xl font-bold text-white">${course.price}</p>
                )}
              </div>

              {/* CTA */}
              {enrolled ? (
                <Link to={`/learn/${course._id}`} className="btn-primary w-full justify-center py-3">
                  <Play className="w-4 h-4" />
                  Continue learning
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={checkingEnroll}
                  className="btn-primary w-full justify-center py-3"
                >
                  {checkingEnroll ? 'Processing…' : course.isFree ? 'Enroll for free' : 'Enroll now'}
                  {!checkingEnroll && <ChevronRight className="w-4 h-4" />}
                </button>
              )}

              {/* Course highlights */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                {[
                  { icon: Clock,     text: `${course.duration} of content` },
                  { icon: BookOpen,  text: `${course.lessons?.length || 0} lessons` },
                  { icon: BarChart2, text: `${course.level} level` },
                  { icon: Award,     text: 'Certificate of completion' },
                  { icon: Globe,     text: `${course.language || 'English'} language` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-white/60">
                    <Icon className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Tags */}
              {course.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {course.tags.map(tag => (
                    <span key={tag} className="badge-brand text-xs">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}