import Navbar from './components/layout/Navbar';
import General from './pages/General';
import Admin from './pages/admin/Admin';
import { Routes, Route, Navigate } from 'react-router';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public routes - accessible without login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin route - without Navbar */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          {/* Protected routes - require login */}
          <Route path="/" element={
            <>
              <Navbar />
              <div className="p-6">
                <ProtectedRoute>
                  <General />
                </ProtectedRoute>
              </div>
            </>
          } />

          {/* Catch-all route - redirect to login for any undefined routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
