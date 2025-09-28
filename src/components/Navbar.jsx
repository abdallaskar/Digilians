// File: src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // npm i lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'GENERAL', href: '/' },
    { name: 'SOFTWARE', href: '/software' },
    { name: 'DIGITAL MARKETING', href: '/marketing' },
    { name: 'AI & DATA SCIENCE', href: '/ai' },
    { name: 'DATA ANALYTICS', href: '/analytics' },
    { name: 'SECURITY', href: '/security' },
    { name: 'APPLIED TECHNOLOGIES', href: '/applied' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo (Clickable → General page) */}
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-12 mr-2" />
            <span className="text-2xl font-bold text-green-600">Digilians</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="block text-gray-700 hover:text-green-600 font-medium">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
