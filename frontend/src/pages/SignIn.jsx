import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .signin-container {
      position: relative;
      overflow: hidden;
      }
      .signin-form {
      background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05),
      rgba(0, 0, 0, 0.3)
      );
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      box-shadow: 
      0 0 20px rgba(0, 0, 0, 0.5),
      inset 0 0 80px rgba(255, 255, 255, 0.05);
      animation: boxGlow 4s ease-in-out infinite;
      }
      .shop-now-button {
      background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.1)
      );
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .shop-now-button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.15)
      );
      }
      /* Rest of your existing animations and styles remain the same */
      @keyframes buttonGlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
      }
      @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
      }
      @keyframes buttonGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
      }
      @keyframes rgbCycle {
      0% { background-position: 0% 50%; }
      50% { background-position: 75% 50%; }
      100% { background-position: 150% 50%; }
      }
      @keyframes formColorCycle {
      0% { border-color: rgba(255, 255, 255, 0.05); }
      50% { border-color: rgba(255, 255, 255, 0.1); }
      100% { border-color: rgba(255, 255, 255, 0.05); }
      }
      @keyframes colorCycle {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
      }
      .hexagon-grid {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60Z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3C/svg%3E");
      background-size: 60px 60px;
      animation: hexMove 40s linear infinite;
      }
      .corner-accent {
      position: absolute;
      width: 150px;
      height: 150px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: cornerPulse 4s infinite;
      }
      @keyframes cornerPulse {
      0%, 100% { border-color: rgba(255, 255, 255, 0.05); }
      50% { border-color: rgba(255, 255, 255, 0.1); }
      }
      @keyframes hexMove {
      0% { background-position: 0 0; }
      100% { background-position: 60px 60px; }
      }
      @keyframes beam-slide {
        0% { 
          transform: translateX(-200%) rotate(-45deg) scaleY(1);
          opacity: 0;
        }
        15% { opacity: 0.7; }
        50% { 
          transform: translateX(-50%) rotate(-45deg) scaleY(2);
          opacity: 0.3;
        }
        85% { 
          transform: translateX(50%) rotate(-45deg) scaleY(2);
          opacity: 0.7;
        }
        100% { 
          transform: translateX(200%) rotate(-45deg) scaleY(1);
          opacity: 0;
        }
      }
      @keyframes beam-slide-reverse {
        0% { 
          transform: translateX(200%) rotate(45deg) scaleY(1);
          opacity: 0;
        }
        15% { opacity: 0.7; }
        50% { 
          transform: translateX(50%) rotate(45deg) scaleY(2);
          opacity: 0.3;
        }
        85% { 
          transform: translateX(-50%) rotate(45deg) scaleY(2);
          opacity: 0.7;
        }
        100% { 
          transform: translateX(-200%) rotate(45deg) scaleY(1);
          opacity: 0;
        }
      }
      @keyframes boxGlow {
      0%, 100% { 
      border-color: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5),
            inset 0 0 80px rgba(255, 255, 255, 0.03);
      }
      50% { 
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.6),
            inset 0 0 100px rgba(255, 255, 255, 0.05);
      }
      }
      @keyframes subtlePulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.85; }
      }
      @keyframes glowPulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        50% { opacity: 0.8; box-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
      }
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
        50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
      }
      @keyframes floatEffect {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeInRotate {
        from { 
          opacity: 0;
          transform: translateY(20px) rotate(-5deg);
        }
        to { 
          opacity: 1;
          transform: translateY(0) rotate(0);
        }
      }
      @keyframes cyberGlow {
        0%, 100% { text-shadow: 0 0 10px rgba(16, 185, 129, 0.7), 0 0 20px rgba(16, 185, 129, 0.4); }
        50% { text-shadow: 0 0 15px rgba(16, 185, 129, 0.9), 0 0 30px rgba(16, 185, 129, 0.6); }
      }

      @keyframes textShine {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }

      .feature-title {
        transition: all 0.3s ease;
      }

      .feature-title:hover {
        animation: cyberGlow 2s infinite;
        letter-spacing: 0.15em;
        background: linear-gradient(90deg, #10b981, #34d399, #10b981);
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        animation: textShine 3s linear infinite;
      }

      .feature-description {
        position: relative;
        transition: all 0.3s ease;
      }

      .feature-description:hover {
        color: #ffffff;
        text-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
        transform: translateY(-2px);
      }

      .grid-item {
        padding: 1rem;
        transition: all 0.3s ease;
      }

      .grid-item:hover {
        background: rgba(16, 185, 129, 0.1);
        border-radius: 0.5rem;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
      }

      .feature-description::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 50%;
        background: linear-gradient(90deg, transparent, #10b981, transparent);
        transition: all 0.3s ease;
      }

      .grid-item:hover .feature-description::after {
        width: 100%;
        left: 0;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/login", form);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
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

        {/* Hexagon Grid Background */}
        <div className="hexagon-grid"></div>

        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>

        {/* Left Content */}
        <div className="flex flex-col items-center relative z-10 max-w-2xl w-full lg:w-[60%] px-2 sm:px-4 md:px-6" 
             style={{ animation: "fadeInUp 1s ease-out" }}>
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <div className="flex items-center">
              <div className="w-12 lg:w-16 h-1 bg-emerald-500 rounded mr-4"
             style={{ animation: "glowPulse 2s ease-in-out infinite" }}></div>
              <Link to="/" className="cursor-pointer hover:scale-105 transition-transform duration-300">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-orbitron tracking-wider text-center" 
            style={{ 
              animation: "textGlow 3s ease-in-out infinite, floatEffect 6s ease-in-out infinite"
            }}>
                  STARSHIFT
                </h1>
              </Link>
              <div className="w-12 lg:w-16 h-1 bg-emerald-500 rounded ml-4"
             style={{ animation: "glowPulse 2s ease-in-out infinite" }}></div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-emerald-400 font-orbitron tracking-wide text-center"
                style={{ animation: "slideIn 1s ease-out" }}>
              Premium Gaming Gear
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-xl mx-auto px-2 sm:px-0">
            <Link to="/products" className="text-center grid-item hover:scale-105 transition-transform duration-300 cursor-pointer"
           style={{ animation: "fadeInRotate 0.6s ease-out forwards", animationDelay: "0.2s" }}>
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 tracking-wider feature-title">MOUSEPADS</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed feature-description">Pro-Grade Precision</div>
            </Link>
            <Link to="/products" className="text-center grid-item hover:scale-105 transition-transform duration-300 cursor-pointer"
           style={{ animation: "fadeInRotate 0.6s ease-out forwards", animationDelay: "0.4s" }}>
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 tracking-wider feature-title">ACCESSORIES</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed feature-description">Custom Design</div>
            </Link>
            <Link to="/about" className="text-center grid-item hover:scale-105 transition-transform duration-300 cursor-pointer"
           style={{ animation: "fadeInRotate 0.6s ease-out forwards", animationDelay: "0.6s" }}>
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 tracking-wider feature-title">QUALITY</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed feature-description">Premium Build</div>
            </Link>
            <Link to="/about" className="text-center grid-item hover:scale-105 transition-transform duration-300 cursor-pointer"
           style={{ animation: "fadeInRotate 0.6s ease-out forwards", animationDelay: "0.8s" }}>
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 tracking-wider feature-title">DESIGN</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed feature-description">Future-Ready</div>
            </Link>
          </div>
        </div>

        {/* Right Content - Sign In Form */}
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[35%] flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
          <form onSubmit={handleSubmit} className="signin-form w-full max-w-md p-4 sm:p-6 lg:p-8 rounded-lg relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-10 text-center text-white font-orbitron tracking-wider">
              Access Your Account
            </h2>
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
            <button className="shop-now-button w-full p-4 rounded-lg text-white font-bold font-orbitron tracking-wider transition-all duration-300 mt-2">
              Sign In
            </button>
            <p className="mt-10 text-center text-gray-400 font-orbitron">
              Don't have an account?{" "}
              <a href="/signup" className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] font-medium transition-all duration-300 hover:underline animate-random-text">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
