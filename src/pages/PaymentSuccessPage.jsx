import { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Play, BookOpen } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function PaymentSuccessPage() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const courseId  = params.get('courseId');

  // Handle Stripe redirect flow (if redirect was needed)
  useEffect(() => {
    const paymentIntentId = params.get('payment_intent');
    if (!paymentIntentId || !courseId) return;

    const confirm = async () => {
      try {
        await api.post('/checkout/confirm', { courseId, paymentIntentId });
      } catch {
        // idempotent — may already be enrolled
      }
    };
    confirm();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30
                        flex items-center justify-center mx-auto mb-6 animate-fade-in">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-3">
          Payment successful!
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          You are now enrolled. Start watching your first lesson right now.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {courseId && (
            <Link to={`/learn/${courseId}`} className="btn-primary px-6 py-3">
              <Play className="w-4 h-4" />
              Start learning
            </Link>
          )}
          <Link to="/dashboard" className="btn-outline px-6 py-3">
            <BookOpen className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}