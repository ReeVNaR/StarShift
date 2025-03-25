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
    <div className="h-screen bg-black overflow-hidden">
      <Navbar />
      <div className="h-[calc(100vh-64px)] flex items-center justify-center px-6">
        <div className="w-full max-w-4xl bg-zinc-900 rounded-lg shadow-xl border border-zinc-800">
          <div className="relative p-8">
            {/* Profile Header */}
            <div className="flex items-center space-x-8 mb-8">
              <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold animate-pulse-glow">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{user?.username}</h2>
                <p className="text-zinc-400 text-lg">{user?.email}</p>
              </div>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-2 gap-8 bg-black rounded-lg p-6 mb-6">
              <div>
                <p className="text-zinc-500 text-sm mb-2">USERNAME</p>
                <p className="text-white font-medium text-lg">{user?.username}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm mb-2">EMAIL</p>
                <p className="text-white font-medium text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm mb-2">MEMBER SINCE</p>
                <p className="text-white font-medium text-lg">
                  {new Date(user?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <div className="absolute top-8 right-8">
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-red-500 px-4 py-2 rounded-md transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
