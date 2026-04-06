import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, BookOpen, Users, Award,
  TrendingUp, Star, Zap, Shield, Globe
} from 'lucide-react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';

const stats = [
  { icon: BookOpen, label: 'Courses',   value: '30+' },
  { icon: Users,    label: 'Learners',  value: '500K+' },
  { icon: Award,    label: 'Certified', value: '120K+' },
  { icon: Globe,    label: 'Countries', value: '90+' },
];

const features = [
  {
    icon: Zap,
    title: 'Learn at your pace',
    desc: 'Access all content anytime. Pause, rewind, and replay on your schedule.',
  },
  {
    icon: Shield,
    title: 'Expert instructors',
    desc: 'Every course is built by industry practitioners with real-world experience.',
  },
  {
    icon: TrendingUp,
    title: 'Track progress',
    desc: 'Visual dashboards show exactly how far you have come and what\'s next.',
  },
  {
    icon: Sparkles,
    title: 'AI learning assistant',
    desc: 'Ask LearnBot anything — coding questions, concept explanations, career advice.',
  },
];

const categories = [
  { name: 'Web Development',      emoji: '🌐', color: 'from-blue-500/20 to-indigo-500/20  border-blue-500/20' },
  { name: 'AI & Machine Learning',emoji: '🤖', color: 'from-purple-500/20 to-pink-500/20   border-purple-500/20' },
  { name: 'Data Science',         emoji: '📊', color: 'from-emerald-500/20 to-teal-500/20  border-emerald-500/20' },
  { name: 'Mobile Development',   emoji: '📱', color: 'from-orange-500/20 to-amber-500/20  border-orange-500/20' },
  { name: 'DevOps & Cloud',       emoji: '☁️', color: 'from-cyan-500/20 to-blue-500/20     border-cyan-500/20' },
  { name: 'UI/UX Design',         emoji: '🎨', color: 'from-pink-500/20 to-rose-500/20     border-pink-500/20' },
  { name: 'Cybersecurity',        emoji: '🔐', color: 'from-red-500/20 to-orange-500/20    border-red-500/20' },
  { name: 'Business & Finance',   emoji: '💼', color: 'from-yellow-500/20 to-amber-500/20  border-yellow-500/20' },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/courses?limit=6&sort=popular');
        setFeaturedCourses(data.data.courses);
      } catch {
        // silent fail
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="overflow-hidden">

      {/* ───────────────────── Hero Section ───────────────────── */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                        rounded-full bg-brand-600/5 blur-3xl pointer-events-none" />

        <div className="section relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-brand-500/10 border border-brand-500/20 text-brand-300
                            text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-powered learning platform
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold
                           text-white leading-[1.05] tracking-tight mb-6 animate-slide-up">
              Learn skills that <span className="gradient-text">shape your future</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed
                          mb-10 animate-slide-up">
              30+ expert-led courses in web development, AI, data science, design,
              and more. Track your progress. Get certified. Land your dream role.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4
                            animate-slide-up">
              <Link to="/courses" className="btn-primary px-8 py-3.5 text-base shadow-lg
                                             shadow-brand-600/25 hover:shadow-brand-500/35
                                             transition-shadow duration-300">
                Explore courses
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link to="/register" className="btn-outline px-8 py-3.5 text-base">
                Start for free
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 mt-10 text-sm text-white/40">
              <div className="flex -space-x-2">
                {['Anika', 'Rohan', 'Priya', 'Dev'].map((name) => (
                  <img
                    key={name}
                    src={`https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&size=32`}
                    alt={name}
                    className="w-7 h-7 rounded-full ring-2 ring-surface-950"
                  />
                ))}
              </div>
              <span>Joined by <strong className="text-white/70">500,000+</strong> learners</span>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────── Stats Section ───────────────────── */}
      <section className="border-y border-white/5 bg-surface-900/30">
        <div className="section py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20
                                flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── Categories Section ─────────────────── */}
      <section className="section py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Browse by category
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From beginner to advanced — find the perfect course to grow your skills.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map(({ name, emoji, color }) => (
            <Link
              key={name}
              to={`/courses?category=${encodeURIComponent(name)}`}
              className={`group flex items-center gap-3 p-4 rounded-2xl
                          bg-gradient-to-br ${color}
                          border transition-all duration-200
                          hover:scale-[1.02] hover:shadow-lg`}
            >
              <span className="text-2xl flex-shrink-0" role="img">{emoji}</span>
              <span className="text-sm font-semibold text-white/80 group-hover:text-white
                               transition-colors leading-snug">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── Featured Courses / Top Courses ─────────────── */}
      <section className="section pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Top courses
            </h2>
            <p className="text-white/50">Loved by thousands of learners worldwide.</p>
          </div>
          <Link to="/courses" className="btn-outline hidden sm:flex text-sm">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingCourses ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="skeleton aspect-video" />
                <div className="p-4 space-y-2">
                  <div className="skeleton h-4 w-1/3 rounded" />
                  <div className="skeleton h-5 w-full rounded" />
                  <div className="skeleton h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Mobile View “View All” Button */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link to="/courses" className="btn-outline">
            View all
          </Link>
        </div>
      </section>

    </main>
  );
}