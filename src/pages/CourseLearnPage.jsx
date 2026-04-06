import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle, Circle, ChevronRight, ChevronLeft,
  ArrowLeft, RotateCcw, Trophy, Play
} from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function CourseLearnPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [marking, setMarking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const [courseRes, progressRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/progress/${courseId}`),
        ]);
        setCourse(courseRes.data.data);
        setProgress(progressRes.data.data);
      } catch (err) {
        if (err.response?.status === 404) {
          toast.error('You are not enrolled in this course.');
          navigate('/dashboard');
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [courseId, navigate]);

  const isLessonComplete = (lessonId) => {
    if (!progress?.completedLessons) return false;
    return progress.completedLessons
      .map(id => id.toString())
      .includes(lessonId.toString());
  };

  const markComplete = async () => {
    const lesson = course.lessons[activeLesson];
    if (!lesson || isLessonComplete(lesson._id)) return;

    setMarking(true);
    try {
      const { data } = await api.post(`/progress/${courseId}/complete`, {
        lessonId: lesson._id,
      });

      setProgress(data.data);

      if (data.data.isCompleted) {
        toast.success('🎉 Congratulations! You completed this course!', {
          duration: 5000,
        });
      } else {
        toast.success('Lesson marked complete!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to mark lesson complete.');
    } finally {
      setMarking(false);
    }
  };

  const goNext = () => {
    if (activeLesson < course.lessons.length - 1) {
      setActiveLesson((a) => a + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (activeLesson > 0) {
      setActiveLesson((a) => a - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="section py-8 animate-pulse space-y-4">
        <div className="skeleton h-8 w-1/2 rounded-xl" />
        <div className="skeleton aspect-video rounded-2xl" />
      </div>
    );
  }

  if (!course) return null;

  const currentLesson = course.lessons[activeLesson];
  const percent = progress?.percentComplete || 0;
  const totalLessons = course.lessons.length;
  const doneLessons = progress?.completedLessons?.length || 0;

  return (
    <main className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4 border-b border-white/5 mb-6 flex-wrap gap-3">
          <Link to="/dashboard" className="btn-ghost text-sm -ml-2">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>

          <div className="flex items-center gap-3 flex-1 min-w-0 justify-center px-4">
            <div className="flex-1 max-w-xs bg-surface-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-brand-500 to-emerald-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-white flex-shrink-0">
              {percent}%
            </span>
          </div>

          <span className="text-xs text-white/40 flex-shrink-0">
            {doneLessons}/{totalLessons} lessons
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-5">
            {/* Video Player */}
            <div className="rounded-2xl overflow-hidden bg-black border border-white/10">
              {currentLesson?.videoUrl ? (
                <div className="aspect-video">
                  <iframe
                    key={currentLesson._id}
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-surface-900">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-white/20 mx-auto mb-2" />
                    <p className="text-white/40 text-sm">No video available for this lesson</p>
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Info + Actions */}
            <div className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <p className="text-xs text-white/40 mb-1">
                    Lesson {activeLesson + 1} of {totalLessons}
                  </p>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                    {currentLesson?.title}
                  </h2>
                  {currentLesson?.duration && (
                    <p className="text-sm text-white/40 mt-1">{currentLesson.duration}</p>
                  )}
                </div>

                <div className="flex-shrink-0">
                  {isLessonComplete(currentLesson?._id) ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  ) : (
                    <button
                      onClick={markComplete}
                      disabled={marking}
                      className="btn-primary text-sm"
                    >
                      {marking ? (
                        <RotateCcw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      {marking ? 'Saving…' : 'Mark as complete'}
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/10">
                <button
                  onClick={goPrev}
                  disabled={activeLesson === 0}
                  className="btn-outline text-sm disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={goNext}
                  disabled={activeLesson === totalLessons - 1}
                  className="btn-primary text-sm disabled:opacity-30"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Completion Banner */}
            {progress?.isCompleted && (
              <div className="card p-6 border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">
                      Course completed! 🎉
                    </h3>
                    <p className="text-emerald-300/80 text-sm">
                      You have mastered all {totalLessons} lessons in this course.
                    </p>
                  </div>
                  <Link to="/dashboard" className="btn-primary text-sm ml-auto">
                    View certificate
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — Lesson List */}
          <div className="lg:col-span-1">
            <div className="card p-4 sticky top-24">
              <h3 className="font-semibold text-white mb-3 text-sm">Course content</h3>
              <div className="space-y-1 max-h-[65vh] overflow-y-auto scrollbar-hide pr-1">
                {course.lessons.map((lesson, idx) => {
                  const done = isLessonComplete(lesson._id);
                  const isActive = idx === activeLesson;

                  return (
                    <button
                      key={lesson._id || idx}
                      onClick={() => setActiveLesson(idx)}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all duration-150 text-sm
                                  ${
                                    isActive
                                      ? 'bg-brand-500/20 border border-brand-500/30 text-white'
                                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                                  }`}
                    >
                      <div className="flex-shrink-0">
                        {done ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <Play className="w-4 h-4 text-brand-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-white/20" />
                        )}
                      </div>
                      <span className="flex-1 min-w-0 truncate text-xs">{lesson.title}</span>
                      <span className="flex-shrink-0 text-xs text-white/30">{lesson.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}