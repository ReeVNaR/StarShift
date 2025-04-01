import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      // ...existing code from SignIn.jsx styleSheet.textContent...
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/signup", form);
    navigate("/signin");
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col bg-black overflow-hidden relative">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-16 gap-6 sm:gap-8 lg:gap-12 relative">
        {/* Light Beams */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-gray-900/0 via-gray-100/5 to-gray-900/0 -rotate-45 transform-gpu"
            style={{ animation: "beam-slide 8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
          ></div>
          <div
            className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-gray-900/0 via-gray-100/5 to-gray-900/0 rotate-45 transform-gpu"
            style={{ animation: "beam-slide-reverse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
          ></div>
        </div>

        <div className="hexagon-grid"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>

        {/* Left Content */}
        <div className="flex flex-col items-center relative z-10 max-w-2xl w-full lg:w-[60%] px-2 sm:px-4 md:px-6" 
             style={{ animation: "fadeInUp 1s ease-out" }}>
          <div className="flex flex-col items-center space-y-6 mb-12">
            <div className="flex items-center">
              <div className="w-12 lg:w-16 h-1 bg-emerald-500 rounded mr-4"
                   style={{ animation: "glowPulse 2s ease-in-out infinite" }}></div>
              <Link to="/" className="cursor-pointer hover:scale-105 transition-transform duration-300">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-orbitron tracking-wider text-center" 
                    style={{ animation: "textGlow 3s ease-in-out infinite, floatEffect 6s ease-in-out infinite" }}>
                  STARSHIFT
                </h1>
              </Link>
              <div className="w-12 lg:w-16 h-1 bg-emerald-500 rounded ml-4"
                   style={{ animation: "glowPulse 2s ease-in-out infinite" }}></div>
            </div>
            <h2 className="text-2xl lg:text-3xl text-emerald-400 font-orbitron tracking-wide text-center"
                style={{ animation: "slideIn 1s ease-out" }}>
              Premium Gaming Gear
            </h2>
          </div>
          
          {/* Grid Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl mx-auto">
            {/* Same grid items as SignIn.jsx */}
            // ...existing grid items from SignIn.jsx...
          </div>
        </div>

        {/* Right Content - Sign Up Form */}
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[35%] flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
          <form onSubmit={handleSubmit} 
            className="signin-form w-full max-w-md p-4 sm:p-6 lg:p-8 rounded-lg relative z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3))',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1.5rem',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(255, 255, 255, 0.05)',
              animation: 'boxGlow 4s ease-in-out infinite'
            }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-10 text-center text-white font-orbitron tracking-wider">
              Create Account
            </h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 p-4 rounded-lg bg-black/60 backdrop-blur-md border-2 border-[rgb(21,128,61)]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[rgb(34,197,94)]/40 focus:ring-2 focus:ring-[rgb(21,128,61)]/10 transition-all duration-300"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-4 rounded-lg bg-black/60 backdrop-blur-md border-2 border-[rgb(21,128,61)]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[rgb(34,197,94)]/40 focus:ring-2 focus:ring-[rgb(21,128,61)]/10 transition-all duration-300"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-4 rounded-lg bg-black/60 backdrop-blur-md border-2 border-[rgb(21,128,61)]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[rgb(34,197,94)]/40 focus:ring-2 focus:ring-[rgb(21,128,61)]/10 transition-all duration-300"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button 
              className="shop-now-button w-full p-4 rounded-lg text-white font-bold font-orbitron tracking-wider transition-all duration-300 mt-2"
              style={{
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))';
              }}>
              Sign Up
            </button>
            <p className="mt-10 text-center text-gray-400 font-orbitron">
              Already have an account?{" "}
              <a href="/signin" className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] font-medium transition-all duration-300 hover:underline animate-random-text">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
