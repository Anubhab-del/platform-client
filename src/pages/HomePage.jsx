import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, BookOpen, Users, Award,
  TrendingUp, Star, Zap, Shield, Globe, Play,
  ChevronRight, CheckCircle, Code2, Brain, Palette,
  Server, Lock, BarChart3
} from 'lucide-react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';

const stats = [
  { icon: BookOpen,   label: 'Expert Courses',  value: '30+',   color: '#6366f1', glow: 'rgba(99,102,241,0.3)'  },
  { icon: Users,      label: 'Active Learners',  value: '500K+', color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)' },
  { icon: Award,      label: 'Certificates',     value: '120K+', color: '#06b6d4', glow: 'rgba(6,182,212,0.3)'  },
  { icon: Globe,      label: 'Countries',        value: '90+',   color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
];

const features = [
  { icon: Zap,        title: 'Self-paced learning',   desc: 'Access all content anytime. Rewind and replay on your schedule.',          color: '#f59e0b' },
  { icon: Shield,     title: 'Industry experts',      desc: 'Every course built by practitioners with decade-long experience.',          color: '#6366f1' },
  { icon: TrendingUp, title: 'Visual progress',       desc: 'Real-time dashboards showing exactly how far you have come.',              color: '#10b981' },
  { icon: Sparkles,   title: 'AI study assistant',    desc: 'LearnBot answers your questions, explains concepts and guides you.',        color: '#8b5cf6' },
  { icon: Code2,      title: 'Real projects',         desc: 'Build production-ready apps you can show in interviews.',                   color: '#06b6d4' },
  { icon: BarChart3,  title: 'Job-ready skills',      desc: 'Curriculum designed with hiring managers at top companies.',               color: '#ec4899' },
];

const categories = [
  { name: 'Web Development',       icon: Code2,    from: '#6366f1', to: '#4338ca', desc: '12 courses' },
  { name: 'AI & Machine Learning', icon: Brain,    from: '#8b5cf6', to: '#7c3aed', desc: '8 courses'  },
  { name: 'Data Science',          icon: BarChart3,from: '#06b6d4', to: '#0891b2', desc: '6 courses'  },
  { name: 'UI/UX Design',          icon: Palette,  from: '#ec4899', to: '#db2777', desc: '4 courses'  },
  { name: 'DevOps & Cloud',        icon: Server,   from: '#10b981', to: '#059669', desc: '5 courses'  },
  { name: 'Cybersecurity',         icon: Lock,     from: '#ef4444', to: '#dc2626', desc: '3 courses'  },
];

const testimonials = [
  { name: 'Anika Sharma',   role: 'Frontend Dev @ Google',     text: 'LearnPro took me from zero to landing a job at Google in 8 months.',     avatar: 'Anika' },
  { name: 'Rohan Mehta',    role: 'ML Engineer @ Microsoft',   text: 'The AI and ML courses are genuinely world-class. No fluff, pure value.',  avatar: 'Rohan' },
  { name: 'Priya Nair',     role: 'Full Stack Dev @ Flipkart',  text: 'Best investment I have made. The projects gave me a real portfolio.',     avatar: 'Priya' },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loadingCourses,  setLoadingCourses]  = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    api.get('/courses?limit=6&sort=popular')
      .then(({ data }) => setFeaturedCourses(data.data.courses))
      .catch(() => {})
      .finally(() => setLoadingCourses(false));
  }, []);

  return (
    <main className="overflow-hidden">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center">

        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary orb */}
          <div
            className="absolute animate-orb"
            style={{
              top: '-10%', left: '30%',
              width: '700px', height: '700px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Secondary orb */}
          <div
            className="absolute animate-orb"
            style={{
              bottom: '0%', right: '10%',
              width: '500px', height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
              animationDelay: '-4s',
            }}
          />
          {/* Tertiary orb */}
          <div
            className="absolute animate-orb"
            style={{
              top: '40%', left: '-5%',
              width: '400px', height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animationDelay: '-2s',
            }}
          />
        </div>

        {/* Fine grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="section relative z-10 py-28 w-full">
          <div className="max-w-5xl mx-auto text-center">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                          animate-fade-in"
              style={{
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.2)',
                boxShadow: '0 0 24px rgba(99,102,241,0.1)',
              }}
            >
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}
              >
                <Sparkles className="w-3 h-3" />
                NEW
              </div>
              <span className="text-sm font-medium text-white/60">
                Groq AI-powered learning assistant is now live
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            </div>

            {/* Main headline */}
            <h1
              className="font-display font-bold text-white leading-[1.0] tracking-tight
                          mb-6 animate-slide-up"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            >
              The platform where{' '}
              <br className="hidden sm:block" />
              <span
                className="animate-text-glow"
                style={{
                  background: 'linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 30%, #818cf8 60%, #c4b5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                }}
              >
                careers are built
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12
                          animate-slide-up"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.01em' }}
            >
              30+ expert-led courses in web development, AI, data science, and design.
              Track progress, earn certificates, and land your dream role.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4
                          mb-16 animate-slide-up"
            >
              <Link
                to="/courses"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                           text-white font-semibold text-base transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset, 0 12px 32px rgba(99,102,241,0.45), 0 4px 8px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.15) inset, 0 20px 48px rgba(99,102,241,0.55), 0 8px 16px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.15) inset, 0 12px 32px rgba(99,102,241,0.45), 0 4px 8px rgba(0,0,0,0.2)';
                }}
              >
                Explore all courses
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center
                               transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl
                           text-white/65 font-semibold text-base
                           hover:text-white transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Play className="w-4 h-4" />
                Watch demo
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in">
              {/* Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['Anika', 'Rohan', 'Priya', 'Dev', 'Sara', 'Kiran'].map((name, i) => (
                    <img
                      key={name}
                      src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=40`}
                      alt={name}
                      className="w-9 h-9 rounded-full"
                      style={{
                        boxShadow: '0 0 0 2.5px #03050f',
                        zIndex: 6 - i,
                      }}
                    />
                  ))}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'rgba(99,102,241,0.3)',
                      border: '2.5px solid #03050f',
                      color: '#a5b4fc',
                      zIndex: 0,
                    }}
                  >
                    +99k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-white/70 ml-1">4.9</span>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    from 50,000+ reviews
                  </p>
                </div>
              </div>

              <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.08)' }}
                   className="hidden sm:block" />

              <div className="flex items-center gap-4">
                {[
                  { value: '500K+', label: 'learners' },
                  { value: '30+',   label: 'courses' },
                  { value: '95%',   label: 'completion' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-base font-bold text-white">{value}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #03050f)' }}
        />
      </section>

      {/* ══════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════ */}
      <section className="section py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, color, glow }) => (
            <div
              key={label}
              className="relative group p-6 rounded-2xl overflow-hidden
                          transition-all duration-500 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = `${color}30`;
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 40px ${color}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${color}08 0%, transparent 65%)` }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${color}14`,
                  border: `1px solid ${color}22`,
                  boxShadow: `0 0 20px ${color}15`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>

              <div
                className="font-display text-4xl font-bold mb-1.5 relative z-10"
                style={{
                  background: `linear-gradient(135deg, #ffffff, ${color})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </div>
              <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {label}
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20"
                style={{ background: color, transform: 'translate(30%, -30%)' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════════ */}
      <section className="section pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#6366f1', letterSpacing: '0.15em' }}
            >
              Explore Topics
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              What do you want to{' '}
              <span className="gradient-text">master?</span>
            </h2>
          </div>
          <Link
            to="/courses"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 group"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            View all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ name, icon: Icon, from, to, desc }) => (
            <Link
              key={name}
              to={`/courses?category=${encodeURIComponent(name)}`}
              className="group relative p-5 rounded-2xl overflow-hidden transition-all duration-400"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = `${from}35`;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${from}12`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(135deg, ${from}10, ${to}05)` }}
              />

              {/* Corner blob */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl
                            opacity-0 group-hover:opacity-20 transition-opacity duration-400"
                style={{ background: from, transform: 'translate(40%, -40%)' }}
              />

              <div className="relative z-10 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                               transition-all duration-400 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${from}20, ${to}10)`,
                    border: `1px solid ${from}25`,
                    boxShadow: `0 0 20px ${from}10`,
                  }}
                >
                  <Icon className="w-6 h-6 transition-colors duration-300"
                        style={{ color: from }} />
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-semibold text-sm leading-snug mb-0.5 transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    {name}
                  </h3>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{desc}</p>
                </div>
                <ChevronRight
                  className="w-4 h-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-60
                               transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ color: from }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURED COURSES
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="section">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: '#6366f1', letterSpacing: '0.15em' }}
              >
                Most popular
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Featured courses
              </h2>
            </div>
            <Link
              to="/courses"
              className="hidden sm:flex items-center gap-2 text-sm font-medium
                          transition-colors duration-200 group"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              View all courses
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loadingCourses ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden">
                  <div className="skeleton" style={{ aspectRatio: '16/9' }} />
                  <div className="p-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="skeleton h-5 w-20 rounded-full" />
                      <div className="skeleton h-5 w-16 rounded-full" />
                    </div>
                    <div className="skeleton h-5 w-full rounded-lg" />
                    <div className="skeleton h-4 w-4/5 rounded-lg" />
                    <div className="skeleton h-4 w-2/3 rounded-lg" />
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                      <div className="flex justify-between">
                        <div className="skeleton h-3.5 w-16 rounded" />
                        <div className="skeleton h-3.5 w-12 rounded" />
                        <div className="skeleton h-3.5 w-14 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCourses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════════════ */}
      <section className="section py-20">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#6366f1', letterSpacing: '0.15em' }}
          >
            Built different
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything you need.{' '}
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
            We obsess over quality so you can obsess over learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, color }, idx) => (
            <div
              key={title}
              className="group relative p-6 rounded-2xl overflow-hidden
                          transition-all duration-400 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transitionDelay: `${idx * 30}ms`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = `${color}25`;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${color}10`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 20% 20%, ${color}08, transparent 60%)` }}
              />
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl
                            opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                style={{ background: color, transform: 'translate(40%, -40%)' }}
              />

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5
                             transition-all duration-400 group-hover:scale-110 relative z-10"
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}20`,
                  boxShadow: `0 0 24px ${color}10`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>

              <h3 className="font-semibold text-white mb-2 relative z-10">{title}</h3>
              <p className="text-sm leading-relaxed relative z-10"
                 style={{ color: 'rgba(255,255,255,0.4)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="section">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#6366f1', letterSpacing: '0.15em' }}
            >
              Learner stories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Results that speak
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, text, avatar }, i) => (
              <div
                key={name}
                className="relative p-6 rounded-2xl transition-all duration-400 group cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(99,102,241,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Quote mark */}
                <div
                  className="text-5xl font-serif leading-none mb-4 opacity-20"
                  style={{ color: '#6366f1', fontFamily: 'Georgia, serif' }}
                >
                  "
                </div>

                <p className="text-sm leading-relaxed mb-6"
                   style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {text}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${avatar}&background=6366f1&color=fff&size=40`}
                    alt={name}
                    className="w-10 h-10 rounded-full"
                    style={{ boxShadow: '0 0 0 2px rgba(99,102,241,0.4)' }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="section py-20">
        <div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.12) 50%, rgba(67,56,202,0.18) 100%)',
            border: '1px solid rgba(99,102,241,0.18)',
            boxShadow: '0 0 80px rgba(99,102,241,0.12), 0 32px 64px rgba(0,0,0,0.4)',
          }}
        >
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-25 animate-orb"
              style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 animate-orb"
              style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDelay: '-3s' }}
            />
          </div>

          {/* Fine grid inside banner */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              No credit card required · Free to start
            </div>

            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              Start your learning journey
              <br />
              <span className="gradient-text">today. For free.</span>
            </h2>

            <p className="mb-10 text-lg max-w-lg mx-auto"
               style={{ color: 'rgba(255,255,255,0.5)' }}>
              Join 500,000+ learners who are advancing their careers with LearnPro.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group flex items-center gap-3 px-10 py-4 rounded-2xl
                           font-bold text-base text-surface-950 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #e0e7ff, #ffffff)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.8) inset',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.8) inset';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.8) inset';
                }}
              >
                Create free account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/courses"
                className="flex items-center gap-2.5 px-10 py-4 rounded-2xl
                           font-semibold text-base text-white/70 hover:text-white
                           transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <BookOpen className="w-4 h-4" />
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}