import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
      }
      @keyframes beam-slide-reverse {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
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
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row justify-between items-center signin-container px-4 sm:px-8 lg:px-16 py-8 lg:py-16 gap-8 lg:gap-0">
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
        <div className="flex flex-col items-center lg:items-start relative z-10 max-w-2xl w-full lg:w-auto">
          <div className="flex items-center mb-8">
            <div className="w-12 lg:w-20 h-1 bg-emerald-500 rounded mr-4 lg:mr-8"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-orbitron animate-pulse tracking-wider text-center lg:text-left">
              STARSHIFT
            </h1>
            <div className="w-12 lg:w-20 h-1 bg-emerald-500 rounded ml-4 lg:ml-8"></div>
          </div>
          <h2 className="text-2xl lg:text-3xl text-emerald-400 font-orbitron mb-8 lg:mb-16 ml-0 lg:ml-2 tracking-wide text-center lg:text-left">
            Premium Gaming Gear
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-x-16 lg:gap-y-12 w-full pl-0 lg:pl-2">
            <div className="text-center lg:text-left">
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 lg:mb-3 tracking-wider">MOUSEPADS</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed">Pro-Grade Precision</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 lg:mb-3 tracking-wider">ACCESSORIES</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed">Custom Design</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 lg:mb-3 tracking-wider">QUALITY</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed">Premium Build</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-emerald-500 text-lg lg:text-xl mb-2 lg:mb-3 tracking-wider">DESIGN</div>
              <div className="text-gray-400 text-sm lg:text-base leading-relaxed">Future-Ready</div>
            </div>
          </div>
        </div>

        {/* Right Content - Sign In Form */}
        <form onSubmit={handleSubmit} className="signin-form w-full max-w-md p-6 sm:p-8 lg:p-12 rounded-lg relative z-10 lg:-ml-12">
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
  );
};

export default SignIn;
