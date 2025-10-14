import React, { useState, useContext } from 'react';
// Corrected import path: should be one level up to get to components/auth/RegisterForm
import RegisterForm from '../../components/auth/RegisterFrom';
import { Link, useNavigate } from 'react-router';
// NOTE: Assuming you are using react-router-dom for navigation.

// import { AuthContext } from '../../context/AuthContext'; // Future import

/**
 * RegisterPage container component.
 * This component is responsible for managing the registration state (loading, error)
 * and calling the registration function from the context.
 */
const RegisterPage = () => {
  // const { register } = useContext(AuthContext); // Uncomment when AuthContext is ready
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Placeholder for the actual registration logic (will use AuthContext/authService)
  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // --- REPLACE THIS BLOCK WITH ACTUAL LOGIC ---
      console.log('Attempting to register with:', formData);
      // Example of how you would call the context/service:
      // await register(formData.name, formData.email, formData.password);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Registration successful (simulated)!');

      // On successful registration, redirect to the login page or home page
      navigate('/login');
      // --- END OF BLOCK TO REPLACE ---
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please check your inputs and try again.';
      setError(errorMessage);
      console.error('Registration Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-2xl rounded-2xl transform transition duration-500 hover:shadow-3xl">
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />

        <div className="text-sm text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
