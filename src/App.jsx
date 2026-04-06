import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseLearnPage from './pages/CourseLearnPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ChatBot from './components/ChatBot';
import LoadingScreen from './components/LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user)   return <Navigate to="/login" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user)    return <Navigate to="/dashboard" replace />;
  return children;
};

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <Routes>
        <Route path="/"                  element={<HomePage />} />
        <Route path="/courses"           element={<CoursesPage />} />
        <Route path="/courses/:id"       element={<CourseDetailPage />} />
        <Route path="/login"             element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register"          element={<GuestRoute><RegisterPage /></GuestRoute>} />

        <Route path="/dashboard"         element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/learn/:courseId"   element={<ProtectedRoute><CourseLearnPage /></ProtectedRoute>} />
        <Route path="/checkout/:courseId"element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/payment-success"   element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {user && <ChatBot />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}