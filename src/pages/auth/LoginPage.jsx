import React, { useContext, useEffect } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // If already logged in, don't render the login form
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-2xl rounded-2xl transform transition duration-500 hover:shadow-3xl">
        <LoginForm />

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
