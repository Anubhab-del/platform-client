import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, Menu, X, BookOpen,
  LayoutDashboard, LogIn, LogOut,
  UserPlus, ChevronDown, Zap, Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrollY,     setScrollY]     = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const scrolled  = scrollY > 20;

  function handleLogout() {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate('/');
  }

  const navLinks = [
    { to: '/',        label: 'Home',      end: true },
    { to: '/courses', label: 'Courses' },
    ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <>
      {/* ── Aurora announcement bar ───────────────── */}
      <div
        className="relative overflow-hidden py-2.5 text-center text-xs font-bold"
        style={{
          background: 'linear-gradient(90deg, #1e1b4b, #312e81, #4338ca, #7c3aed, #4338ca, #312e81, #1e1b4b)',
          backgroundSize: '300% 100%',
          animation: 'aurora 8s ease infinite',
          color: '#c7d2fe',
          letterSpacing: '0.04em',
        }}
      >
        {/* Beam sweep */}
        <div
          className="absolute inset-0 pointer-events-none animate-beam"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            width: '30%',
          }}
        />
        <div className="relative z-10 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-yellow-300" />
          Groq AI assistant is live — ask anything, learn faster
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
      </div>

      {/* ── Main navbar ───────────────────────────── */}
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(2, 0, 8, 0.94)'
            : 'rgba(2, 0, 8, 0.3)',
          backdropFilter: `blur(${scrolled ? 48 : 16}px) saturate(200%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 48 : 16}px) saturate(200%)`,
          borderBottom: `1px solid rgba(255,255,255,${scrolled ? 0.08 : 0.04})`,
          boxShadow: scrolled
            ? '0 1px 0 rgba(255,255,255,0.05) inset, 0 20px 60px rgba(0,0,0,0.8), 0 0 120px rgba(99,102,241,0.05)'
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[68px] gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center
                              transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: 'linear-gradient(135deg, #818cf8 -20%, #6366f1 40%, #4338ca 100%)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.15) inset, 0 0 30px rgba(99,102,241,0.7), 0 4px 16px rgba(0,0,0,0.5)',
                  }}
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div
                  className="absolute -inset-2 rounded-3xl blur-lg opacity-0
                              group-hover:opacity-70 transition-all duration-500 -z-10"
                  style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
                />
              </div>
              <div>
                <div
                  className="font-display font-black text-[19px] leading-none"
                  style={{
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 60%, #a5b4fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  LearnPro
                </div>
                <div
                  className="text-[9px] font-black uppercase mt-0.5"
                  style={{ color: 'rgba(165,180,252,0.45)', letterSpacing: '0.22em' }}
                >
                  EdTech Platform
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1 min-w-0 justify-center">
              {navLinks.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end}>
                  {({ isActive }) => (
                    <div
                      className="relative px-4 py-2 rounded-xl text-sm font-bold
                                  transition-all duration-200 cursor-pointer"
                      style={{
                        color: isActive ? '#e0e7ff' : 'rgba(255,255,255,0.4)',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.1))'
                          : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(99,102,241,0.3)' : 'transparent'}`,
                        boxShadow: isActive ? '0 0 20px rgba(99,102,241,0.15)' : 'none',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
                    >
                      {label}
                      {isActive && (
                        <span
                          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-px"
                          style={{
                            background: 'linear-gradient(90deg, transparent, #818cf8, transparent)',
                            boxShadow: '0 0 8px #818cf8',
                          }}
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(p => !p)}
                    className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl
                                transition-all duration-300"
                    style={{
                      background: profileOpen
                        ? 'rgba(99,102,241,0.18)'
                        : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${profileOpen
                        ? 'rgba(99,102,241,0.45)'
                        : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: profileOpen
                        ? '0 0 30px rgba(99,102,241,0.2)'
                        : 'none',
                    }}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-xl object-cover"
                        style={{
                          boxShadow: '0 0 0 2px rgba(99,102,241,0.6), 0 0 16px rgba(99,102,241,0.3)',
                        }}
                      />
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
                        style={{
                          background: '#10b981',
                          border: '2px solid #020008',
                          boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <div
                        className="text-sm font-bold leading-none max-w-[100px] truncate"
                        style={{ color: '#e0e7ff', letterSpacing: '-0.02em' }}
                      >
                        {user.name}
                      </div>
                      <div
                        className="text-[10px] mt-0.5 font-semibold"
                        style={{ color: 'rgba(165,180,252,0.6)' }}
                      >
                        Student
                      </div>
                    </div>
                    <ChevronDown
                      className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: 'rgba(165,180,252,0.4)',
                        transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </button>

                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setProfileOpen(false)}
                      />
                      <div
                        className="absolute right-0 top-full mt-3 w-64 z-20 rounded-3xl
                                    overflow-hidden animate-scale-in"
                        style={{
                          background: 'rgba(4, 2, 18, 0.98)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(60px)',
                          boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 80px rgba(99,102,241,0.15), 0 40px 80px rgba(0,0,0,0.9)',
                        }}
                      >
                        <div
                          className="relative p-5 overflow-hidden"
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <div
                            className="absolute inset-0 opacity-40"
                            style={{
                              background: 'radial-gradient(ellipse at 80% 0%, rgba(99,102,241,0.4), transparent 60%)',
                            }}
                          />
                          <div className="relative flex items-center gap-3">
                            <img
                              src={user.avatarUrl}
                              alt={user.name}
                              className="w-12 h-12 rounded-2xl"
                              style={{
                                boxShadow: '0 0 0 2px rgba(99,102,241,0.6), 0 0 24px rgba(99,102,241,0.4)',
                              }}
                            />
                            <div className="min-w-0">
                              <p
                                className="text-sm font-black truncate"
                                style={{ color: '#e0e7ff', letterSpacing: '-0.02em' }}
                              >
                                {user.name}
                              </p>
                              <p
                                className="text-xs truncate mt-0.5"
                                style={{ color: 'rgba(255,255,255,0.35)' }}
                              >
                                {user.email}
                              </p>
                              <div
                                className="flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full w-fit"
                                style={{
                                  background: 'rgba(16,185,129,0.15)',
                                  border: '1px solid rgba(16,185,129,0.3)',
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-400">
                                  ACTIVE
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                                        text-sm font-bold transition-all duration-200 text-left"
                            style={{ color: 'rgba(252,165,165,0.7)' }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'rgba(239,68,68,0.12)';
                              e.currentTarget.style.color = '#fca5a5';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'rgba(252,165,165,0.7)';
                            }}
                          >
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center"
                              style={{
                                background: 'rgba(239,68,68,0.12)',
                                border: '1px solid rgba(239,68,68,0.22)',
                              }}
                            >
                              <LogOut className="w-3.5 h-3.5" />
                            </div>
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost px-5 text-sm">
                    Sign in
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    <Zap className="w-3.5 h-3.5" />
                    Get started free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden ml-auto p-2.5 rounded-2xl transition-all duration-200 flex-shrink-0"
              style={{
                background: mobileOpen
                  ? 'rgba(99,102,241,0.18)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${mobileOpen
                  ? 'rgba(99,102,241,0.35)'
                  : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              {mobileOpen
                ? <X    className="w-5 h-5 text-white/70" />
                : <Menu className="w-5 h-5 text-white/70" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden animate-slide-down"
            style={{
              background: 'rgba(2, 0, 8, 0.99)',
              backdropFilter: 'blur(60px)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
            }}
          >
            <nav className="px-4 py-4 space-y-1.5">
              {navLinks.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end}>
                  {({ isActive }) => (
                    <div
                      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl
                                  text-sm font-bold transition-all duration-200"
                      style={{
                        color: isActive ? '#e0e7ff' : 'rgba(255,255,255,0.45)',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))'
                          : 'transparent',
                        border: `1px solid ${isActive
                          ? 'rgba(99,102,241,0.3)'
                          : 'transparent'}`,
                      }}
                    >
                      {label}
                    </div>
                  )}
                </NavLink>
              ))}

              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.07)',
                  margin: '10px 0',
                }}
              />

              {user ? (
                <>
                  <div
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-2xl"
                      style={{
                        boxShadow: '0 0 0 2px rgba(99,102,241,0.5), 0 0 16px rgba(99,102,241,0.3)',
                      }}
                    />
                    <div className="min-w-0">
                      <p
                        className="text-sm font-black text-white truncate"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl
                                text-sm font-bold transition-all duration-200 text-left"
                    style={{
                      color: 'rgba(252,165,165,0.7)',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'rgba(239,68,68,0.12)',
                        border: '1px solid rgba(239,68,68,0.22)',
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                    </div>
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2.5 pt-1">
                  <Link to="/login" className="btn-outline w-full justify-center py-3.5">
                    <LogIn className="w-4 h-4" /> Sign in
                  </Link>
                  <Link to="/register" className="btn-primary w-full justify-center py-3.5">
                    <Zap className="w-4 h-4" /> Get started free
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}