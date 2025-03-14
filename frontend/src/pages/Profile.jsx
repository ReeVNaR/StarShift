import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

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
        <div className="flex justify-center items-center h-screen">
          <div className="text-white">Loading...</div>
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
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme.secondary} rounded-lg shadow-xl p-6 ${theme.border}`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{user?.username}</h3>
                <p className={theme.text}>{user?.email}</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4">
              <div className={`p-4 rounded-lg ${theme.input}`}>
                <p className="text-gray-400">Username</p>
                <p className="text-white">{user?.username}</p>
              </div>
              <div className={`p-4 rounded-lg ${theme.input}`}>
                <p className="text-gray-400">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
              <div className={`p-4 rounded-lg ${theme.input}`}>
                <p className="text-gray-400">Member Since</p>
                <p className="text-white">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
