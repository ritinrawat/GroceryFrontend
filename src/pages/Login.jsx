import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const logindata = {
        email: email,
        password: password
      };
      const response = await fetch(`https://grocery-x2ds.onrender.com/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logindata),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#059363] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>

        <div className="relative z-10 text-white max-w-md">
          <h1 className="text-6xl font-black mb-6 tracking-tight">
            Green<span className="text-yellow-400">Baskit</span>
          </h1>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Everything delivered in minutes.
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Log in to access your orders, saved addresses, and faster checkout experiences.
          </p>
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative h-screen">

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <FiArrowLeft className="text-2xl text-gray-400 group-hover:text-gray-900 transition-colors" />
        </button>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h3>
            <p className="text-gray-500 font-medium tracking-tight">Enter your details to access your account</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#059363] transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] transition-all font-medium text-gray-800"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <Link to="#" className="text-xs font-bold text-[#059363] hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#059363] transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] transition-all font-medium text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#059363] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#059363]/20 hover:shadow-[#059363]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Continue <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          {/* Social Login Separator */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-gray-100 flex-grow"></div>
            <span className="text-xs font-black text-gray-300 uppercase tracking-widest">OR</span>
            <div className="h-px bg-gray-100 flex-grow"></div>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?&nbsp;
              <Link to="/register" className="text-[#059363] font-black hover:underline underline-offset-4">
                Sign Up ⚡
              </Link>
            </p>
          </div>
        </div>

        {/* Floating Logo for Mobile */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:hidden">
          <h1 className="text-3xl font-black tracking-tight flex items-center">
            <span className="text-yellow-400">blink</span>
            <span className="text-[#059363]">it</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
