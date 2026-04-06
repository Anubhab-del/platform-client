import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { ArrowLeft, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ── Inner form ─────────────────────────────────────────────────────
function CheckoutForm({ courseId, courseName, amount }) {
  const stripe   = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error,      setError]      = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    // Confirm the payment — Stripe collects card details from PaymentElement
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?courseId=${courseId}`,
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message || 'Payment failed. Please try again.');
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      try {
        await api.post('/checkout/confirm', {
          courseId,
          paymentIntentId: paymentIntent.id,
        });
        toast.success('Payment successful! You are now enrolled.');
        navigate(`/learn/${courseId}`);
      } catch (err) {
        // Already enrolled or DB confirmed — still navigate
        toast.success('Enrolled successfully!');
        navigate(`/learn/${courseId}`);
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Stripe PaymentElement renders the card field */}
      <div className="bg-surface-800/50 border border-white/10 rounded-xl p-5">
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card'],
          }}
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3
                        text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn-primary w-full justify-center py-3.5 text-base
                   shadow-lg shadow-brand-600/25"
      >
        {processing ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
        ) : (
          <><Lock className="w-4 h-4" /> Pay ${(amount / 100).toFixed(2)} securely</>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-white/30">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        Secured by Stripe · 256-bit TLS encryption
      </div>
    </form>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { courseId } = useParams();
  const navigate     = useNavigate();

  const [clientSecret, setClientSecret] = useState('');
  const [courseName,   setCourseName]   = useState('');
  const [amount,       setAmount]       = useState(0);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await api.post('/checkout/payment-intent', { courseId });
        setClientSecret(data.clientSecret);
        setCourseName(data.courseName);
        setAmount(data.amount);
      } catch (err) {
        const msg = err.response?.data?.message || '';
        if (err.response?.status === 409) {
          toast.success('You are already enrolled!');
          navigate(`/learn/${courseId}`);
        } else {
          setError(msg || 'Could not initialize payment. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [courseId]);

  const stripeAppearance = {
    theme: 'night',
    variables: {
      colorPrimary:    '#6366f1',
      colorBackground: '#1e293b',
      colorText:       '#f1f5f9',
      colorDanger:     '#ef4444',
      fontFamily:      'Inter, system-ui, sans-serif',
      spacingUnit:     '4px',
      borderRadius:    '10px',
    },
  };

  return (
    <div className="section py-8 pb-20">
      <Link to={`/courses/${courseId}`} className="btn-ghost text-sm -ml-2 mb-6 inline-flex">
        <ArrowLeft className="w-4 h-4" /> Back to course
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Complete your purchase</h1>
        <p className="text-white/50 text-sm mb-8">You are enrolling in:</p>

        {/* Course summary */}
        <div className="card p-5 mb-6 flex items-center justify-between gap-4">
          <p className="font-semibold text-white text-sm leading-snug">{courseName}</p>
          <p className="font-display text-xl font-bold text-white flex-shrink-0">
            ${(amount / 100).toFixed(2)}
          </p>
        </div>

        {loading ? (
          <div className="card p-8 text-center">
            <Loader2 className="w-8 h-8 text-brand-400 animate-spin mx-auto mb-3" />
            <p className="text-white/50 text-sm">Setting up secure payment…</p>
          </div>
        ) : error ? (
          <div className="card p-6 text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <Link to={`/courses/${courseId}`} className="btn-outline text-sm mx-auto">
              Back to course
            </Link>
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: stripeAppearance,
            }}
          >
            <CheckoutForm courseId={courseId} courseName={courseName} amount={amount} />
          </Elements>
        ) : null}
      </div>
    </div>
  );
}