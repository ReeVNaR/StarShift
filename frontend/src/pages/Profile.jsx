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

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(75, 85, 99, 0.3); }
        50% { box-shadow: 0 0 40px rgba(75, 85, 99, 0.6); }
      }

      .floating {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

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
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      {/* Animated cyber grid background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(75,85,99,0.05)_1px,transparent_1px),linear-gradient(rgba(75,85,99,0.05)_1px,transparent_1px)] bg-[size:64px_64px] bg-center"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(75,85,99,0.1),transparent_100%)]"></div>
      </div>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="relative z-10 w-full max-w-lg px-4">
          <div className="text-center">
            <div className="inline-block">
              <div className="relative rounded-full bg-gradient-to-r from-gray-500/20 to-gray-600/20 p-[2px] floating">
                <div className="rounded-full bg-[#0A0A0A] p-12 w-32 h-32 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-400 font-orbitron">
                    {user?.username?.[0]?.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-orbitron bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              {user?.username}
            </h1>
            <p className="mt-2 text-gray-500">{user?.email}</p>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 rounded-lg text-gray-400 font-orbitron hover:bg-gray-500/20 hover:border-gray-500/40 transition-all duration-300 flex items-center justify-center space-x-2 group mx-auto"
            >
              <span>DISCONNECT</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
