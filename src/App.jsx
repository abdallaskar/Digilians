import Navbar from './components/Navbar';
import General from './pages/General';
import Software from './pages/Software';
import Marketing from './pages/Marketing';
import AI from './pages/AI';
import DataAnalytics from './pages/DataAnalytics';
import Security from './pages/Security';
import AppliedTech from './pages/AppliedTech';
import { Routes, Route, Navigate } from 'react-router';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <Routes>
            {/* Public routes - accessible without login */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes - require login */}
            <Route path="/" element={
              <ProtectedRoute>
                <General />
              </ProtectedRoute>
            } />
            <Route path="/software" element={
              <ProtectedRoute>
                <Software />
              </ProtectedRoute>
            } />
            <Route path="/marketing" element={
              <ProtectedRoute>
                <Marketing />
              </ProtectedRoute>
            } />
            <Route path="/ai" element={
              <ProtectedRoute>
                <AI />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <DataAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/security" element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            } />
            <Route path="/applied" element={
              <ProtectedRoute>
                <AppliedTech />
              </ProtectedRoute>
            } />

            {/* Catch-all route - redirect to login for any undefined routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
