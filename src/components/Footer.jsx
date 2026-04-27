import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Zap } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Browse Courses', to: '/courses' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Register', to: '/register' },
    { label: 'Sign In', to: '/login' },
  ],
  Categories: [
    { label: 'Web Development', to: '/courses?category=Web+Development' },
    { label: 'AI & Machine Learning', to: '/courses?category=AI+%26+Machine+Learning' },
    { label: 'Data Science', to: '/courses?category=Data+Science' },
    { label: 'UI/UX Design', to: '/courses?category=UI%2FUX+Design' },
  ],
  Company: [
    { label: 'About', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Contact', to: '/' },
  ],
};

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(to bottom, #020008, #010006)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>

      {/* CTA Strip */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(99,102,241,0.1), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3
                className="font-display font-black text-white mb-2"
                style={{ fontSize: '1.8rem', letterSpacing: '-0.04em' }}
              >
                Ready to level up?
              </h3>
              <p className="text-base" style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '-0.01em' }}>
                Join 500K+ learners advancing their careers with LearnPro.
              </p>
            </div>
            <Link
              to="/register"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                          font-black text-base text-white flex-shrink-0 transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #818cf8 -20%, #6366f1 40%, #4338ca 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.15) inset, 0 0 40px rgba(99,102,241,0.5), 0 8px 24px rgba(99,102,241,0.4)',
                letterSpacing: '-0.015em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.2) inset, 0 0 60px rgba(99,102,241,0.7), 0 16px 40px rgba(99,102,241,0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.15) inset, 0 0 40px rgba(99,102,241,0.5), 0 8px 24px rgba(99,102,241,0.4)';
              }}
            >
              <Zap className="w-4 h-4" />
              Get started free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-7 group w-fit">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #818cf8, #4338ca)', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div
                  className="font-display font-black leading-none"
                  style={{
                    fontSize: '1.2rem',
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, #e0e7ff, #a5b4fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  LearnPro
                </div>
                <div
                  className="text-[9px] font-black uppercase mt-0.5"
                  style={{ color: 'rgba(165,180,252,0.38)', letterSpacing: '0.2em' }}
                >
                  EdTech Platform
                </div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-[200px] mb-8"
              style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '-0.01em' }}>
              Full-stack EdTech platform. React · Node.js · MongoDB · Stripe · Groq AI.
            </p>

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.32)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.18)';
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)';
                    e.currentTarget.style.color = '#a5b4fc';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.32)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-xs font-black uppercase mb-6"
                style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.16em' }}
              >
                {heading}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm font-semibold transition-all duration-150 block"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#e0e7ff';
                        e.currentTarget.style.paddingLeft = '6px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.18)' }}>
            © {new Date().getFullYear()} LearnPro · All rights reserved.
          </p>
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.1)' }}>
            React · Node.js · MongoDB · Stripe · Groq AI
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link
                key={item}
                to="/"
                className="text-xs font-semibold transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.18)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}