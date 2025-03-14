import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/signup", form);
    navigate("/signin");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-800 shadow-2xl rounded-lg m-4 border border-blue-500/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 border border-gray-600 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 border border-gray-600 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 border border-gray-600 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-full rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/50">
          Sign Up
        </button>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
