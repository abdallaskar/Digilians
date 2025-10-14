//     app.jsx
import Navbar from './components/Navbar';
import General from './pages/General';
import Software from './pages/Software';
import Marketing from './pages/Marketing';
import AI from './pages/AI';
import DataAnalytics from './pages/DataAnalytics';
import Security from './pages/Security';
import AppliedTech from './pages/AppliedTech';
import { Routes, Route } from 'react-router';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<General />} />
            <Route path="/software" element={<Software />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/analytics" element={<DataAnalytics />} />
            <Route path="/security" element={<Security />} />
            <Route path="/applied" element={<AppliedTech />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
      .
    </>
  );
}

export default App;
