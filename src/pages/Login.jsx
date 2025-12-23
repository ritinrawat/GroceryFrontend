import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Login() {
      const [email,setEmail]=useState('')
      const [password,setPassword]=useState("")
         const navigate=useNavigate()
      const submitHandler=async(e)=>{
           e.preventDefault()
        try{
          const logindata={
            email:email,
            password:password
          }
  const response = await fetch('https://grocery-x2ds.onrender.com/auth/login', {
      method: 'POST',
        credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logindata),
    // 🔑 Send/receive cookies (for refresh token)
    });
    console.log("hello")
    if (!response.ok) throw new Error("404 or other error");
  
    if(response.status==200){
      const data=await response.json();
      console.log(data)
     localStorage.setItem('token', data.accessToken);
      navigate('/')
    } 
    setEmail("")
    setPassword("")
 }
 catch(error){
  console.log("Error fetching Logindata:", error);
 }
      }
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center z-50 px-3">
  {/* Modal Box */}
  <div className="bg-white rounded-2xl w-full max-w-[420px] p-5 sm:p-8 relative shadow-xl">

    {/* Back Arrow */}
    <div className="absolute top-4 left-4 text-gray-500 text-xl cursor-pointer">
      ←
    </div>

    {/* Heading */}
    <div className="flex flex-col items-center mb-5 mt-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center">Login</h2>
    </div>

    <form onSubmit={submitHandler}>

      {/* Email */}
      <div className="mt-3">
        <label className="block text-sm mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
        />
      </div>

      {/* Password */}
      <div className="mt-3">
        <label className="block text-sm mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
        />
      </div>

      {/* Button */}
      <button className="w-full mt-6 bg-[#059363] text-white py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#0A3D3F] transition">
        Continue
      </button>
    </form>

    {/* Footer */}
    <p className="text-xs sm:text-sm text-center text-gray-500 mt-4">
      If you don’t have an account,&nbsp;
      <Link to="/register" className="underline cursor-pointer">
        please Sign Up
      </Link>
    </p>
  </div>
</div>

  )
}

export default Login
