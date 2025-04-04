import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-sm border-t border-emerald-500/20 py-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <span className="text-emerald-500 font-bold text-xl tracking-wider font-orbitron relative group cursor-pointer">
              STAR
              <span className="text-white">SHIFT</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>

          {/* Social Links with hover effects */}
          <div className="flex space-x-6">
            {/* Facebook */}
            <a href="https://facebook.com" className="footer-icon-link group">
              <div className="relative">
                <div className="w-10 h-10 flex items-center justify-center rounded border border-emerald-500/20 bg-black/50 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:scale-110">
                  <svg className="w-5 h-5 text-emerald-500/80 group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </div>
                <div className="absolute inset-0 rounded blur opacity-40 bg-emerald-500/20 group-hover:opacity-60 transition-opacity"></div>
              </div>
            </a>

            {/* Twitter */}
            <a href="https://twitter.com" className="footer-icon-link group">
              <div className="relative">
                <div className="w-10 h-10 flex items-center justify-center rounded border border-emerald-500/20 bg-black/50 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:scale-110">
                  <svg className="w-5 h-5 text-emerald-500/80 group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div className="absolute inset-0 rounded blur opacity-40 bg-emerald-500/20 group-hover:opacity-60 transition-opacity"></div>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" className="footer-icon-link group">
              <div className="relative">
                <div className="w-10 h-10 flex items-center justify-center rounded border border-emerald-500/20 bg-black/50 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:scale-110">
                  <svg className="w-5 h-5 text-emerald-500/80 group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </div>
                <div className="absolute inset-0 rounded blur opacity-40 bg-emerald-500/20 group-hover:opacity-60 transition-opacity"></div>
              </div>
            </a>
          </div>

          {/* Copyright with animated border */}
          <div className="text-gray-400 text-sm relative px-4 py-2">
            <div className="absolute inset-0 border border-emerald-500/20 rounded-lg"></div>
            <div className="relative">
              © {new Date().getFullYear()} StarShift_
              <span className="inline-block w-2 h-4 bg-emerald-500/80 ml-1 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
        
        .footer-icon-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(16, 185, 129, 0.2), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .footer-icon-link:hover::before {
          opacity: 1;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
