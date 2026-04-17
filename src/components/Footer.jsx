import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Browse Courses', to: '/courses' },
    { label: 'Dashboard',      to: '/dashboard' },
    { label: 'Register',       to: '/register' },
    { label: 'Sign In',        to: '/login' },
  ],
  Categories: [
    { label: 'Web Development',        to: '/courses?category=Web+Development' },
    { label: 'AI & Machine Learning',  to: '/courses?category=AI+%26+Machine+Learning' },
    { label: 'Data Science',           to: '/courses?category=Data+Science' },
    { label: 'UI/UX Design',           to: '/courses?category=UI%2FUX+Design' },
  ],
  Company: [
    { label: 'About',   to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Blog',    to: '/' },
    { label: 'Contact', to: '/' },
  ],
};

const socialLinks = [
  { label: 'GitHub',   href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter',  href: 'https://twitter.com' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(3, 5, 15, 0.98)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Newsletter strip */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(99,102,241,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="font-display text-xl font-bold text-white mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                Level up your skills today
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Join 500K+ learners advancing their careers with LearnPro.
              </p>
            </div>
            <Link
              to="/register"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl
                          font-semibold text-sm text-white flex-shrink-0
                          transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.3)';
              }}
            >
              Get started free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center
                            flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                  boxShadow: '0 0 16px rgba(99,102,241,0.4)',
                }}
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base leading-none">
                  Learn<span style={{ color: '#818cf8' }}>Pro</span>
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  EdTech Platform
                </div>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-[200px] mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Full-stack EdTech platform built with React, Node.js, MongoDB, Stripe, and Groq AI.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium
                              transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)';
                    e.currentTarget.style.color = '#a5b4fc';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-xs font-bold uppercase mb-5"
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.12em',
                }}
              >
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
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

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} LearnPro. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            Built with React · Node.js · MongoDB · Stripe · Groq AI
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link
                key={item}
                to="/"
                className="text-xs transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
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