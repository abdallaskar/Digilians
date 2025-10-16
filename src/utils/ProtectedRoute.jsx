import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext.jsx';

// This component checks for authentication status before rendering the requested element
const ProtectedRoute = ({ children }) => {
  // We get the necessary state from the AuthContext
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication status is still being loaded, show a loader or null
  if (isLoading) {
    // You can return a simple spinner here, or null to hide content until ready
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    // NOTE: If you are not using react-router-dom, you would use window.location.href = '/login' here
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the requested children (the secured page)
  return children;
};

export default ProtectedRoute;
