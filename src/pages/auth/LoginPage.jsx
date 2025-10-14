import React, { useState, useContext } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting to log in with:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (formData.email === 'test@example.com' && formData.password === 'password') {
        console.log('Login successful (simulated)!');
        navigate('/');
      } else {
        throw new Error('Invalid credentials (simulated)');
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-2xl rounded-2xl transform transition duration-500 hover:shadow-3xl">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

        <div className="text-sm text-center">
          <p className="text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
