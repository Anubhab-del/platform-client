import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, UserPlus, Loader2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const pwRules = [
  { label: 'At least 6 characters', test: v => v.length >= 6 },
  { label: 'Contains a letter',      test: v => /[a-zA-Z]/.test(v) },
  { label: 'Contains a number',      test: v => /[0-9]/.test(v) },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Please enter your name.'); return; }
    if (!form.email.trim()) { toast.error('Please enter your email.'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }

    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim().toLowerCase(), form.password);
      toast.success('Account created! Welcome to LearnPro 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Create your account</h1>
          <p className="text-white/50 text-sm mt-1">Start learning for free today</p>
        </div>

        <div className="card p-7 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="label">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Anubhab Das"
                className="input"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40
                             hover:text-white/70 transition-colors p-1"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  {pwRules.map(({ label, test }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        test(form.password) ? 'bg-emerald-500' : 'bg-surface-700'
                      }`}>
                        {test(form.password) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs ${test(form.password) ? 'text-emerald-400' : 'text-white/30'}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                : <><UserPlus className="w-4 h-4" /> Create account</>
              }
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-white/40 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-white/25 mt-3">
          By creating an account you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}