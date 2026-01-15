import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiPhone, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const registerdata = {
      email,
      password,
      name,
      number
    };
    try {
      const response = await fetch('https://grocery-x2ds.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerdata),
      });

      if (!response.ok) throw new Error("Registration failed");

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        navigate('/');
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#059363] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse"></div>

        <div className="relative z-10 text-white max-w-md">
          <h1 className="text-6xl font-black mb-6 tracking-tight">
            Green<span className="text-yellow-400">Baskit</span>
          </h1>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Join the quickest delivery network.
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Create an account to get your groceries, electronics, and essentials delivered to your doorstep in 10 minutes.
          </p>
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      </div>

      {/* Right Panel - SignUp Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative overflow-y-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <FiArrowLeft className="text-2xl text-gray-400 group-hover:text-gray-900 transition-colors" />
        </button>

        <div className="max-w-md w-full mx-auto my-auto py-8">
          <div className="mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-2">Create Account</h3>
            <p className="text-gray-500 font-medium tracking-tight">Join us and experience lightning-fast delivery</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#059363] transition-colors" size={18} />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] transition-all font-medium text-gray-800 text-sm"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#059363] transition-colors" size={18} />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] transition-all font-medium text-gray-800 text-sm"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#059363] transition-colors" size={18} />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] transition-all font-medium text-gray-800 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Create Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#059363] transition-colors" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] transition-all font-medium text-gray-800 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#059363] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#059363]/20 hover:shadow-[#059363]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Already have an account?&nbsp;
              <Link to="/login" className="text-[#059363] font-black hover:underline underline-offset-4">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Floating Logo for Mobile */}
    
      </div>
    </div>
  );
};

export default SignUpPage;
