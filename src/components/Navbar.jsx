// File: src/components/Navbar.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, Home } from 'lucide-react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const links = [
    { name: 'SOFTWARE', href: '/software' },
    { name: 'DIGITAL MARKETING', href: '/marketing' },
    { name: 'AI & DATA SCIENCE', href: '/ai' },
    { name: 'DATA ANALYTICS', href: '/analytics' },
    { name: 'SECURITY', href: '/security' },
    { name: 'APPLIED TECHNOLOGIES', href: '/applied' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleUserCircleClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsOpen(false); // Close mobile menu when user circle is clicked
  };

  // Get user initials from name or email
  const getUserInitials = () => {
    if (!user) return 'U';

    const name = user.name || user.email || '';
    const words = name.trim().split(' ');

    if (words.length >= 2) {
      // If full name, use first letter of first two words
      return (words[0][0] + words[1][0]).toUpperCase();
    } else {
      // If single word or email, use first two characters
      return name.substring(0, 2).toUpperCase();
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo (Clickable → General page) */}
          <Link to={isLoggedIn ? '/' : '/login'} className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-12 mr-2" />
            <span className="text-2xl font-bold text-green-600">Digilians</span>
          </Link>

          {/* Desktop Menu - only show if logged in */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-6">
              {/* Home Icon */}

              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Authentication Section */}
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Circle */}
                <button
                  onClick={handleUserCircleClick}
                  className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <span className="text-sm font-semibold">{getUserInitials()}</span>
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <LogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-green-600 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {/* Navigation links - only show if logged in */}
            {isLoggedIn && (
              <>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </>
            )}

            {/* Mobile Authentication Section */}
            <div className={`pt-4 border-t border-gray-200 ${isLoggedIn ? 'mt-4' : ''}`}>
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full">
                      <span className="text-xs font-semibold">{getUserInitials()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium w-full">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
