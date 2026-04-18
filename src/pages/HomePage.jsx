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
  { icon: BookOpen,  label: 'Expert Courses',  value: '30+',   color: '#6366f1' },
  { icon: Users,     label: 'Active Learners',  value: '500K+', color: '#8b5cf6' },
  { icon: Award,     label: 'Certificates',     value: '120K+', color: '#06b6d4' },
  { icon: Globe,     label: 'Countries',        value: '90+',   color: '#10b981' },
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
  { icon: Zap,        title: 'Self-paced',       desc: 'Learn on your schedule. Pause, rewind, replay.',               color: '#f59e0b' },
  { icon: Shield,     title: 'Expert-built',     desc: 'Crafted by practitioners with decade-long experience.',        color: '#6366f1' },
  { icon: TrendingUp, title: 'Real progress',    desc: 'Live dashboards tracking exactly where you stand.',           color: '#10b981' },
  { icon: Sparkles,   title: 'AI assistant',     desc: 'LearnBot answers every question 24/7.',                       color: '#8b5cf6' },
  { icon: Trophy,     title: 'Certificates',     desc: 'Verifiable certificates to show in interviews.',              color: '#f59e0b' },
  { icon: Target,     title: 'Job-ready',        desc: 'Curriculum built with top tech company hiring managers.',     color: '#ec4899' },
];

const testimonials = [
  { name: 'Anika Sharma', role: 'Frontend Engineer · Google',    text: 'Took me from zero to Google in 8 months. Best thing I ever did.',         avatar: 'Anika', color: '#6366f1' },
  { name: 'Rohan Mehta',  role: 'ML Engineer · Microsoft',       text: 'The AI courses are world-class. No fluff, pure depth with real projects.', avatar: 'Rohan', color: '#8b5cf6' },
  { name: 'Priya Nair',   role: 'Full Stack Dev · Flipkart',     text: 'Best career investment I ever made. The projects built my entire portfolio.', avatar: 'Priya', color: '#06b5d4' },
];

/* ── Reusable section header ──────────────────────── */
function SectionHeader({ tag, title, sub }) {
  return (
    <div className="text-center mb-14">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase mb-5"
        style={{
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.25)',
          color: '#a5b4fc',
          letterSpacing: '0.12em',
          boxShadow: '0 0 20px rgba(99,102,241,0.12)',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"
          style={{ boxShadow: '0 0 6px #818cf8' }}
        />
        {tag}
      </div>

      <h2
        className="font-display font-black text-white"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {sub && (
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.015em' }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    api
      .get('/courses?limit=6&sort=popular')
      .then(({ data }) => setCourses(data.data.courses))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1,
      col: Math.random() > 0.5 ? '#6366f1' : '#8b5cf6',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.col + Math.round(p.a * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <main className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center">

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.6 }}
        />

        {/* Massive orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute animate-orb"
            style={{
              top: '-30%',
              left: '10%',
              width: '900px',
              height: '900px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />

          <div
            className="absolute animate-orb"
            style={{
              bottom: '-20%',
              right: '-5%',
              width: '700px',
              height: '700px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 60%)',
              filter: 'blur(80px)',
              animationDelay: '-6s',
            }}
          />

          {/* FIXED THIRD ORB */}
          <div
            className="absolute"
            style={{
              top: '30%',
              right: '20%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(6,182,212,0.20) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

      </section>

    </main>
  );
}