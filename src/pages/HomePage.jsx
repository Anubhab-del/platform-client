import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, BookOpen, Users, Award, Globe,
  TrendingUp, Star, Zap, Shield, Play, ChevronRight,
  CheckCircle, Code2, Brain, Palette, Server, Lock,
  BarChart3, Flame, Trophy, Target, ArrowUpRight
} from 'lucide-react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';

const stats = [
  { icon: BookOpen, label: 'Expert Courses',  value: '30+',   color: '#6366f1' },
  { icon: Users,    label: 'Active Learners',  value: '500K+', color: '#8b5cf6' },
  { icon: Award,    label: 'Certificates',     value: '120K+', color: '#06b6d4' },
  { icon: Globe,    label: 'Countries',        value: '90+',   color: '#10b981' },
];

const categories = [
  { name: 'Web Development',       icon: Code2,     from: '#6366f1', to: '#4338ca', count: '12 courses' },
  { name: 'AI & Machine Learning', icon: Brain,     from: '#8b5cf6', to: '#7c3aed', count: '8 courses'  },
  { name: 'Data Science',          icon: BarChart3, from: '#06b6d4', to: '#0891b2', count: '6 courses'  },
  { name: 'UI/UX Design',          icon: Palette,   from: '#ec4899', to: '#db2777', count: '4 courses'  },
  { name: 'DevOps & Cloud',        icon: Server,    from: '#10b981', to: '#059669', count: '5 courses'  },
  { name: 'Cybersecurity',         icon: Lock,      from: '#ef4444', to: '#dc2626', count: '3 courses'  },
];

const features = [
  { icon: Zap,        title: 'Self-paced',      desc: 'Learn on your schedule. Pause, rewind, replay.',              color: '#f59e0b' },
  { icon: Shield,     title: 'Expert-built',    desc: 'Crafted by practitioners with decade-long experience.',       color: '#6366f1' },
  { icon: TrendingUp, title: 'Real progress',   desc: 'Live dashboards tracking exactly where you stand.',          color: '#10b981' },
  { icon: Sparkles,   title: 'AI assistant',    desc: 'LearnBot answers every question 24/7.',                      color: '#8b5cf6' },
  { icon: Trophy,     title: 'Certificates',    desc: 'Verifiable certificates to show in interviews.',             color: '#f59e0b' },
  { icon: Target,     title: 'Job-ready',       desc: 'Curriculum built with top tech company hiring managers.',    color: '#ec4899' },
];

const testimonials = [
  {
    name:   'Anika Sharma',
    role:   'Frontend Engineer · Google',
    text:   'Took me from zero to Google in 8 months. The React bootcamp is the best resource I have ever used.',
    avatar: 'Anika',
    color:  '#6366f1',
  },
  {
    name:   'Rohan Mehta',
    role:   'ML Engineer · Microsoft',
    text:   'The AI and ML courses are world-class. No fluff — pure depth with real projects I could show in interviews.',
    avatar: 'Rohan',
    color:  '#8b5cf6',
  },
  {
    name:   'Priya Nair',
    role:   'Full Stack Dev · Flipkart',
    text:   'Best career investment I ever made. The AI assistant answered every question I had at any hour.',
    avatar: 'Priya',
    color:  '#06b6d4',
  },
];

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    api.get('/courses?limit=6&sort=popular')
      .then(({ data }) => setCourses(data.data.courses))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── Particle canvas ─────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 1.6 + 0.3,
      vx:  (Math.random() - 0.5) * 0.25,
      vy:  (Math.random() - 0.5) * 0.25,
      a:   Math.random() * 0.5 + 0.1,
      col: Math.random() > 0.5 ? '#6366f1' : '#8b5cf6',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + Math.round(p.a * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main className="overflow-hidden">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex items-center">

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.55 }}
        />

        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { top: '-30%', left: '10%',  w: '900px', h: '900px', col: 'rgba(99,102,241,0.22)',  blur: '100px', delay: '0s'  },
            { bottom: '-20%', right: '-5%', w: '700px', h: '700px', col: 'rgba(139,92,246,0.18)', blur: '80px',  delay: '-6s' },
            { top: '30%',  right: '20%', w: '300px', h: '300px', col: 'rgba(6,182,212,0.1)',    blur: '40px',  delay: '-3s' },
          ].map((o, i) => (
            <div
              key={i}
              className="absolute animate-orb"
              style={{
                ...o,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${o.col} 0%, transparent 60%)`,
                filter: `blur(${o.blur})`,
                animationDelay: o.delay,
              }}
            />
          ))}
        </div>

        {/* Fine grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            maskImage:
              'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* Radial spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(99,102,241,0.18) 0%, transparent 65%)',
          }}
        />

        <div className="section relative z-10 py-36 w-full">
          <div className="max-w-6xl mx-auto text-center">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 animate-fade-in"
              style={{
                background: 'rgba(5, 3, 28, 0.8)',
                border: '1px solid rgba(99,102,241,0.3)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(99,102,241,0.18), 0 1px 0 rgba(255,255,255,0.06) inset',
              }}
            >
              <div className="relative w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                   style={{ background: 'rgba(99,102,241,0.3)' }}>
                <div className="absolute w-5 h-5 rounded-full animate-ping-slow"
                     style={{ background: 'rgba(99,102,241,0.4)' }} />
                <Flame className="w-3 h-3 text-yellow-300 relative z-10" />
              </div>
              <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>
                Groq AI assistant is now live — ask anything
              </span>
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black"
                style={{
                  background: 'rgba(99,102,241,0.25)',
                  border: '1px solid rgba(99,102,241,0.4)',
                  color: '#a5b4fc',
                }}
              >
                NEW <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black text-white mb-8 animate-slide-up"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.05em',
              }}
            >
              <span className="block">The platform</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 15%, #a5b4fc 35%, #818cf8 55%, #c4b5fd 75%, #e0e7ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 6s ease infinite',
                }}
              >
                where careers
              </span>
              <span className="block">are built.</span>
            </h1>

            <p
              className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto mb-14 animate-slide-up"
              style={{
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '-0.02em',
                animationDelay: '0.1s',
              }}
            >
              30+ expert-led courses. Real progress tracking.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>
                Join 500,000+ learners who already levelled up.
              </span>
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <Link
                to="/courses"
                className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl
                           text-white font-black text-lg overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #818cf8 -20%, #6366f1 35%, #4338ca 80%, #3730a3 120%)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.15) inset, 0 0 60px rgba(99,102,241,0.6), 0 12px 40px rgba(99,102,241,0.5), 0 4px 16px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.02em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.2) inset, 0 0 80px rgba(99,102,241,0.8), 0 20px 60px rgba(99,102,241,0.65), 0 8px 24px rgba(0,0,0,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.15) inset, 0 0 60px rgba(99,102,241,0.6), 0 12px 40px rgba(99,102,241,0.5), 0 4px 16px rgba(0,0,0,0.5)';
                }}
              >
                {/* Beam */}
                <div
                  className="absolute inset-0 opacity-30 animate-beam"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', width: '50%' }}
                />
                <span className="relative z-10">Explore all courses</span>
                <div
                  className="relative z-10 w-8 h-8 rounded-xl flex items-center justify-center
                               transition-transform duration-300 group-hover:translate-x-1"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                to="/register"
                className="group flex items-center gap-3 px-10 py-5 rounded-2xl
                           font-black text-lg transition-all duration-300"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  letterSpacing: '-0.02em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Play className="w-5 h-5" />
                Start for free
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in"
              style={{ animationDelay: '0.35s' }}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3.5">
                  {['Anika','Rohan','Priya','Dev','Sara','Kiran'].map((n, i) => (
                    <img
                      key={n}
                      src={`https://ui-avatars.com/api/?name=${n}&background=random&color=fff&size=40`}
                      alt={n}
                      className="w-10 h-10 rounded-2xl"
                      style={{ boxShadow: `0 0 0 3px #020008, 0 0 16px rgba(99,102,241,0.3)`, zIndex: 6 - i }}
                    />
                  ))}
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4))',
                      border: '3px solid #020008',
                      color: '#a5b4fc',
                      zIndex: 0,
                    }}
                  >
                    99k+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm font-black ml-1.5 text-white">4.9</span>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    from 50,000+ verified reviews
                  </p>
                </div>
              </div>

              <div className="hidden sm:block h-10 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

              <div className="flex items-center gap-8">
                {[
                  { v: '500K+', l: 'learners'   },
                  { v: '95%',   l: 'completion'  },
                  { v: '#1',    l: 'rated'        },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <div className="font-display font-black text-white" style={{ fontSize: '1.3rem', letterSpacing: '-0.04em' }}>
                      {v}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #020008)' }}
        />
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section className="section py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="relative group p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-500"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.5)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}45`;
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 1px 0 rgba(255,255,255,0.09) inset, 0 32px 64px rgba(0,0,0,0.6), 0 0 60px ${color}20`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.5)';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 20% 20%, ${color}0C, transparent 55%)` }}
              />
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: color, transform: 'translate(40%,-40%)' }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${color}22, ${color}10)`,
                  border: `1px solid ${color}30`,
                  boxShadow: `0 0 30px ${color}20`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <div
                className="font-display font-black mb-2 relative z-10"
                style={{
                  fontSize: 'clamp(2rem,4vw,2.8rem)',
                  letterSpacing: '-0.05em',
                  background: `linear-gradient(135deg, #ffffff, ${color})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </div>
              <div className="text-sm font-semibold relative z-10" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="section pb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-black uppercase mb-3"
              style={{ color: '#6366f1', letterSpacing: '0.2em' }}
            >
              Explore Topics
            </p>
            <h2
              className="font-display font-black text-white"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.04em' }}
            >
              What will you
              <br />
              <span className="gradient-text">master next?</span>
            </h2>
          </div>
          <Link
            to="/courses"
            className="hidden sm:flex items-center gap-2 text-sm font-bold transition-all duration-200 group"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ name, icon: Icon, from, to, count }) => (
            <Link
              key={name}
              to={`/courses?category=${encodeURIComponent(name)}`}
              className="group relative p-6 rounded-3xl overflow-hidden transition-all duration-400"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${from}50`;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.6), 0 0 50px ${from}18`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.4)';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(135deg, ${from}14, ${to}07)` }}
              />
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                style={{ background: from, transform: 'translate(50%,-50%)' }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${from}28, ${to}15)`,
                      border: `1px solid ${from}35`,
                      boxShadow: `0 0 30px ${from}15`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: from }} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm mb-0.5 transition-colors duration-200"
                        style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.025em' }}>
                      {name}
                    </h3>
                    <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.28)' }}>
                      {count}
                    </p>
                  </div>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ background: `${from}20`, border: `1px solid ${from}35` }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: from }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED COURSES
      ══════════════════════════════════════════ */}
      <section
        className="py-24 relative"
        style={{
          background: 'rgba(255,255,255,0.012)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.25 }}>
          <div className="absolute left-1/4 top-0 w-px h-full"
               style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.4), transparent)' }} />
          <div className="absolute right-1/4 top-0 w-px h-full"
               style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.4), transparent)' }} />
        </div>

        <div className="section relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-black uppercase mb-3" style={{ color: '#6366f1', letterSpacing: '0.2em' }}>
                Most popular
              </p>
              <h2 className="font-display font-black text-white"
                  style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.04em' }}>
                Featured courses
              </h2>
            </div>
            <Link
              to="/courses"
              className="hidden sm:flex items-center gap-2 text-sm font-bold transition-all duration-200 group"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden"
                     style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="skeleton" style={{ aspectRatio: '16/9' }} />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-6 w-1/3 rounded-full" />
                    <div className="skeleton h-5 w-full rounded-xl" />
                    <div className="skeleton h-4 w-4/5 rounded-xl" />
                    <div className="flex justify-between pt-2">
                      <div className="skeleton h-3.5 w-14 rounded" />
                      <div className="skeleton h-3.5 w-10 rounded" />
                      <div className="skeleton h-3.5 w-12 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section className="section py-24">
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase mb-3" style={{ color: '#6366f1', letterSpacing: '0.2em' }}>
            Built different
          </p>
          <h2
            className="font-display font-black text-white mb-5"
            style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', letterSpacing: '-0.04em' }}
          >
            Everything you need.
            <br />
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
          <p className="max-w-lg mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.015em' }}>
            We obsess over quality so you can obsess over learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group relative p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.6), 0 0 50px ${color}14`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.4)';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 15% 15%, ${color}0A, transparent 55%)` }}
              />
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: color, transform: 'translate(40%,-40%)' }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-all duration-400 group-hover:scale-110 group-hover:rotate-3 relative z-10"
                style={{ background: `${color}16`, border: `1px solid ${color}25`, boxShadow: `0 0 30px ${color}15` }}
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <h3 className="font-display font-black text-white mb-3 relative z-10"
                  style={{ fontSize: '1.15rem', letterSpacing: '-0.03em' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed relative z-10" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section
        className="py-24 relative"
        style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="section">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase mb-3" style={{ color: '#6366f1', letterSpacing: '0.2em' }}>
              Real results
            </p>
            <h2 className="font-display font-black text-white"
                style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.04em' }}>
              Learners who <span className="gradient-text">levelled up</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, text, avatar, color }) => (
              <div
                key={name}
                className="relative p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.025) 100%)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.5)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}35`;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = `0 1px 0 rgba(255,255,255,0.09) inset, 0 32px 64px rgba(0,0,0,0.6), 0 0 50px ${color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.5)';
                }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10"
                  style={{ background: color, transform: 'translate(30%,-30%)' }}
                />
                <div
                  className="absolute top-4 left-6 font-black select-none pointer-events-none"
                  style={{ fontSize: '8rem', lineHeight: 1, color, opacity: 0.07, fontFamily: 'Georgia,serif' }}
                >
                  "
                </div>
                <div className="flex items-center gap-0.5 mb-5 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-8 relative z-10"
                   style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.015em' }}>
                  "{text}"
                </p>
                <div className="flex items-center gap-3.5 relative z-10">
                  <img
                    src={`https://ui-avatars.com/api/?name=${avatar}&background=${color.slice(1)}&color=fff&size=48`}
                    alt={name}
                    className="w-12 h-12 rounded-2xl"
                    style={{ boxShadow: `0 0 0 2px ${color}60, 0 0 20px ${color}35` }}
                  />
                  <div>
                    <p className="font-display font-black text-white" style={{ letterSpacing: '-0.03em' }}>
                      {name}
                    </p>
                    <p className="text-xs mt-0.5 font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="section py-24">
        <div
          className="relative overflow-hidden text-center"
          style={{
            padding: 'clamp(3rem,8vw,7rem)',
            borderRadius: '3rem',
            background: 'linear-gradient(135deg, rgba(20,10,60,0.9) 0%, rgba(30,15,80,0.9) 30%, rgba(20,10,60,0.9) 60%, rgba(10,5,40,0.95) 100%)',
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 120px rgba(99,102,241,0.22), 0 0 240px rgba(99,102,241,0.1), 0 60px 120px rgba(0,0,0,0.7)',
          }}
        >
          {/* Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: '3rem' }}>
            <div className="absolute -top-1/2 -right-1/4 w-4/5 h-4/5 rounded-full blur-3xl opacity-35 animate-orb"
                 style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
            <div className="absolute -bottom-1/2 -left-1/4 w-3/5 h-3/5 rounded-full blur-3xl opacity-25 animate-orb"
                 style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDelay: '-4s' }} />
          </div>

          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              borderRadius: '3rem',
              overflow: 'hidden',
            }}
          />

          {/* Beam sweeps */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: '3rem' }}>
            <div
              className="absolute top-0 left-0 w-2/5 h-full animate-beam"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', transform: 'skewX(-20deg)' }}
            />
          </div>

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full mb-8"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)' }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>
                No credit card · Free forever · Cancel anytime
              </span>
            </div>

            <h2
              className="font-display font-black text-white mb-6"
              style={{
                fontSize: 'clamp(2.5rem,7vw,5.5rem)',
                letterSpacing: '-0.05em',
                lineHeight: 0.95,
                textShadow: '0 0 80px rgba(165,180,252,0.3)',
              }}
            >
              Start your journey
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe, #a5b4fc, #818cf8, #c4b5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 5s ease infinite',
                }}
              >
                today. For free.
              </span>
            </h2>

            <p className="text-xl max-w-lg mx-auto mb-12"
               style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em' }}>
              Join 500,000+ learners who have advanced their careers with LearnPro.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/register"
                className="group relative flex items-center gap-3 px-12 py-5 rounded-2xl
                           font-black text-lg overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #f0f4ff, #ffffff)',
                  color: '#1e1b4b',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 0 60px rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.025em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.7) inset, 0 0 80px rgba(255,255,255,0.2), 0 24px 60px rgba(0,0,0,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.6) inset, 0 0 60px rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.5)';
                }}
              >
                Create free account
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/courses"
                className="flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-lg transition-all duration-300"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  letterSpacing: '-0.02em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <BookOpen className="w-5 h-5" />
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}