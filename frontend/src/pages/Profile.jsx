import { useState, useEffect } from 'react';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.user.getProfile();
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setError('Unable to fetch profile data');
        }
      } catch (err) {
        console.error('Profile Error:', err);
        setError('Session expired. Please sign in again.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/signin'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black">
      <Navbar />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header section */}
        <div className="relative mb-16">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              <div className="w-3 h-3 border-2 border-gray-500 transform rotate-45"></div>
              <div className="w-48 h-px bg-gray-500"></div>
              <div className="w-3 h-3 border-2 border-gray-500 transform rotate-45"></div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-gray-500 to-transparent"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-white font-orbitron relative inline-block w-full">
            <div className="relative z-10 px-8 py-2 bg-black transform skew-x-12">
              <span className="inline-block transform -skew-x-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400">
                Profile
              </span>
            </div>
          </h1>
        </div>

        {/* Profile Content */}
        <div className="relative overflow-hidden mx-auto max-w-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(0, 0, 0, 0.3))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(107, 114, 128, 0.2)',
            boxShadow: '0 0 20px rgba(107, 114, 128, 0.2)',
            clipPath: 'polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))'
          }}>
          
          {/* Profile Header */}
          <div className="relative p-8 border-b border-gray-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col md:flex-row items-center md:space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-500/10 
                              flex items-center justify-center text-gray-400 text-4xl font-bold border border-gray-500/20
                              shadow-[0_0_15px_rgba(107,114,128,0.2)] mb-4 md:mb-0"
                     style={{
                       clipPath: 'polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))'
                     }}>
                  {user?.username?.[0]?.toUpperCase()}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white font-orbitron mb-1">
                    {user?.username}
                  </h2>
                  <p className="text-gray-400/80 text-sm">{user?.email}</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 md:mt-0 group flex items-center space-x-2 bg-black/50 border border-gray-500/20
                         hover:border-gray-500/50 text-gray-400 px-4 py-2 transition-all duration-300"
                style={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                }}
              >
                <span>Logout</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className="p-8 space-y-6">
            <h3 className="text-lg font-orbitron text-gray-400 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'USERNAME', value: user?.username },
                { label: 'EMAIL', value: user?.email },
                { label: 'MEMBER SINCE', value: new Date(user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })},
                { label: 'ACCOUNT STATUS', value: 'Active' }
              ].map((item, index) => (
                <div key={item.label} 
                     className="p-4 bg-black/50 border border-gray-500/20 hover:border-gray-500/50 transition-all duration-300 group"
                     style={{ 
                       clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
                       animationDelay: `${index * 100}ms` 
                     }}>
                  <p className="text-gray-500/60 text-xs font-orbitron mb-1">{item.label}</p>
                  <p className="text-white font-medium group-hover:text-gray-400 transition-colors">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
