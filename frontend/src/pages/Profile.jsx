 import { useState, useEffect } from 'react';
import axios from 'axios';
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

    axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setError('Unable to fetch profile data');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Profile Error:', err);
        setError('Session expired. Please sign in again.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/signin'), 2000);
        setLoading(false);
      });
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
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-zinc-900 rounded-lg shadow-xl p-6 border border-zinc-800">
          <div className="space-y-6">
            {/* User Banner with Centered Content */}
            <div className="relative">
              <div className="h-32 bg-zinc-800 rounded-t-lg"></div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full bg-blue-600 border-8 border-zinc-900 flex items-center justify-center text-white text-4xl font-bold">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Centered User Info */}
            <div className="pt-20 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{user?.username}</h2>
              <p className="text-zinc-400 text-lg">{user?.email}</p>
            </div>

            {/* User Details */}
            <div className="mt-8 space-y-4 p-6 bg-black rounded-lg">
              <p className="text-zinc-500 text-sm uppercase mb-4">Account Details</p>
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-500 text-xs">USERNAME</p>
                  <p className="text-white font-medium mt-1">{user?.username}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">EMAIL</p>
                  <p className="text-white font-medium mt-1">{user?.email}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">MEMBER SINCE</p>
                  <p className="text-white font-medium mt-1">
                    {new Date(user?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button - Bottom Right */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-2 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-red-500 px-4 py-2 rounded-md transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
