import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, Menu, X, BookOpen, LayoutDashboard,
  LogIn, LogOut, UserPlus, ChevronDown, User
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 whitespace-nowrap px-1 py-0.5
     ${isActive
       ? 'text-white'
       : 'text-white/60 hover:text-white'
     }`;

  return (
    <header className="sticky top-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo — flex-shrink-0 ensures it never shrinks */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg leading-none">
              LearnPro
            </span>
          </Link>

          {/* Desktop Nav — min-w-0 allows truncation if needed */}
          <nav className="hidden md:flex items-center gap-1 flex-1 min-w-0 justify-center">
            <NavLink to="/"        className={navLinkClass} end>Home</NavLink>
            <span className="text-white/20 px-1">·</span>
            <NavLink to="/courses" className={navLinkClass}>Courses</NavLink>
            {user && (
              <>
                <span className="text-white/20 px-1">·</span>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
              </>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                             text-white/80 hover:text-white hover:bg-white/5
                             border border-transparent hover:border-white/10
                             transition-all duration-150"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 z-20
                                    bg-surface-900 border border-white/10 rounded-2xl
                                    shadow-xl shadow-black/30 overflow-hidden
                                    animate-fade-in">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-white/40 truncate mt-0.5">{user.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm
                                   text-white/70 hover:text-white hover:bg-white/5
                                   transition-colors duration-150"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm
                                   text-red-400 hover:text-red-300 hover:bg-red-500/10
                                   transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"    className="btn-ghost text-sm">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white
                       hover:bg-white/5 transition-colors duration-150 flex-shrink-0"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-surface-950/95 backdrop-blur-xl
                        animate-fade-in">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                 ${isActive ? 'bg-brand-500/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <BookOpen className="w-4 h-4" /> Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                 ${isActive ? 'bg-brand-500/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <BookOpen className="w-4 h-4" /> Courses
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                   ${isActive ? 'bg-brand-500/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </NavLink>
            )}

            <div className="divider my-2" />

            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <img src={user.avatarUrl} alt={user.name}
                       className="w-8 h-8 rounded-full ring-1 ring-white/10" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm
                             text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link to="/login"    className="btn-outline w-full justify-center"
                      onClick={() => setMobileOpen(false)}>
                  <LogIn className="w-4 h-4" /> Sign in
                </Link>
                <Link to="/register" className="btn-primary w-full justify-center"
                      onClick={() => setMobileOpen(false)}>
                  <UserPlus className="w-4 h-4" /> Get started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}