import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, Menu, X, BookOpen,
  LayoutDashboard, LogIn, LogOut, UserPlus, ChevronDown, Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [scrollY,     setScrollY]     = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const blur = Math.min(24, 12 + scrollY * 0.05);
  const bg   = scrolled
    ? `rgba(3, 5, 15, ${Math.min(0.92, 0.6 + scrollY * 0.001)})`
    : 'rgba(3, 5, 15, 0.4)';

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-200 px-1 py-0.5 whitespace-nowrap
     ${isActive ? 'text-white' : 'text-white/45 hover:text-white/85'}`;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: bg,
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid rgba(255,255,255,0.03)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center
                            transition-all duration-500 group-hover:scale-110
                            group-hover:rotate-3"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 16px rgba(99,102,241,0.5)',
                }}
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div
                className="absolute -inset-1.5 rounded-xl blur-md opacity-0
                            group-hover:opacity-50 transition-opacity duration-500 -z-10"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4338ca)' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-[17px] tracking-tight">
                Learn<span style={{
                  background: 'linear-gradient(135deg, #a5b4fc, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Pro</span>
              </span>
              <span className="text-[9px] text-white/25 font-medium tracking-widest uppercase -mt-0.5">
                EdTech Platform
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 min-w-0 justify-center">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/courses', label: 'Courses' },
              ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
            ].map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 px-3 py-1.5 rounded-lg block
                                     transition-colors duration-200"
                          style={isActive ? {
                            background: 'rgba(99,102,241,0.1)',
                          } : {}}>
                      {label}
                    </span>
                    {isActive && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2
                                   h-px w-4/5 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #818cf8, transparent)',
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop Right ─────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl
                             transition-all duration-300"
                  style={{
                    background: profileOpen
                      ? 'rgba(99,102,241,0.12)'
                      : 'rgba(255,255,255,0.04)',
                    border: profileOpen
                      ? '1px solid rgba(99,102,241,0.3)'
                      : '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset',
                  }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                      style={{ boxShadow: '0 0 0 2px rgba(99,102,241,0.4)' }}
                    />
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5
                                  rounded-full ring-2"
                      style={{
                        background: '#10b981',
                        ringColor: '#03050f',
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white/80 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/30 transition-transform duration-300
                                ${profileOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div
                      className="absolute right-0 top-full mt-2.5 w-60 z-20 rounded-2xl
                                  overflow-hidden animate-scale-in"
                      style={{
                        background: 'rgba(8, 12, 28, 0.97)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(40px)',
                        boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 16px rgba(99,102,241,0.1)',
                      }}
                    >
                      {/* User info header */}
                      <div
                        className="px-4 py-4"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                            style={{ boxShadow: '0 0 0 2px rgba(99,102,241,0.4)' }}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-white/35 truncate">{user.email}</p>
                          </div>
                        </div>
                        <div
                          className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg w-fit"
                          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs text-emerald-400 font-medium">Active session</span>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                     text-sm transition-all duration-200 text-left group"
                          style={{ color: 'rgba(252,165,165,0.8)' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                            e.currentTarget.style.color = '#fca5a5';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgba(252,165,165,0.8)';
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
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
                <Link to="/login" className="btn-ghost text-sm px-4">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm px-5"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ──────────────────────────── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2.5 rounded-xl transition-all duration-200 flex-shrink-0"
            style={{
              background: mobileOpen ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {mobileOpen
              ? <X    className="w-4.5 h-4.5 text-white/70" />
              : <Menu className="w-4.5 h-4.5 text-white/70" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden animate-slide-down"
          style={{
            background: 'rgba(3, 5, 15, 0.98)',
            backdropFilter: 'blur(40px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          }}
        >
          <nav className="px-4 py-4 space-y-1">
            {[
              { to: '/', label: 'Home', icon: BookOpen, end: true },
              { to: '/courses', label: 'Courses', icon: BookOpen },
              ...(user ? [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }] : []),
            ].map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to} to={to} end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                   ${isActive ? 'text-white' : 'text-white/45 hover:text-white/80'}`
                }
                style={({ isActive }) => ({
                  background: isActive
                    ? 'rgba(99,102,241,0.1)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(99,102,241,0.2)'
                    : '1px solid transparent',
                })}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '12px 0' }} />

            {user ? (
              <>
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <img src={user.avatarUrl} alt={user.name}
                       className="w-9 h-9 rounded-full"
                       style={{ boxShadow: '0 0 0 2px rgba(99,102,241,0.4)' }} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/35 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                             transition-all duration-200 text-left"
                  style={{ color: 'rgba(252,165,165,0.7)', border: '1px solid transparent' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2.5 pt-2">
                <Link to="/login" className="btn-outline w-full justify-center py-3">
                  <LogIn className="w-4 h-4" /> Sign in
                </Link>
                <Link to="/register" className="btn-primary w-full justify-center py-3">
                  <UserPlus className="w-4 h-4" /> Get started free
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}