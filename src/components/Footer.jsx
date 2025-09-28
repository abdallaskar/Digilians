import { FaFacebook } from 'react-icons/fa'; // Make sure you have react-icons installed

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Logo and Name */}
        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="Digilians Logo" className="h-10 w-12 mr-2" />
          <span className="text-3xl font-bold text-green-500">Digilians</span>
        </div>

        {/* Description */}
        <p className="max-w-xl text-sm text-gray-400 mb-6">
          Empowering the next generation of digital leaders through hands-on training and expert-led programs.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-4 mb-6">
          <a
            href="https://www.facebook.com/digilians/?locale=ar_AR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition-colors">
            <FaFacebook size={24} />
          </a>
          {/* Add more social media icons here as needed, e.g., Twitter, LinkedIn */}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 w-full pt-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Digilians. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
