import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [name,setName]=useState("")
 const [number,setNumber]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
   const navigate=useNavigate()
 

  const submitHandler=async (e)=>{
   e.preventDefault()
     const registerdata={
  email:email,
  password:password,
  name:name,
  number:number
 
}
 try{
 const response = await fetch('https://grocery-x2ds.onrender.com/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(registerdata),
});
    if (!response.ok) throw new Error("404 or other error");
  
    if(response.status==200){
      const data=await response.json();
      console.log(data)
  localStorage.setItem('token', data.accessToken);
     
      navigate('/')
    }
    setName("")
    setEmail("")
    setNumber("")
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
      <h2 className="text-xl sm:text-2xl font-bold text-center">Sign Up</h2>
    </div>

    <form onSubmit={submitHandler}>
      
      {/* Name */}
      <div className="mt-3">
        <label className="block text-sm mb-1 font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2.5 sm:py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
        />
      </div>

      {/* Phone */}
      <div className="mt-3">
        <label className="block text-sm mb-1 font-medium text-gray-700">
          Phone number
        </label>
        <input
          type="tel"
          placeholder="Enter your number"
          onChange={(e) => setNumber(e.target.value)}
          className="w-full px-3 py-2.5 sm:py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
        />
      </div>

      {/* Email */}
      <div className="mt-3">
        <label className="block text-sm mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 sm:py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
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
          className="w-full px-3 py-2.5 sm:py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
        />
      </div>

      {/* Button */}
      <button className="w-full mt-6 bg-[#059363] text-white py-2.5 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-[#0A3D3F] font-semibold transition">
        Continue
      </button>
    </form>

    {/* Footer */}
    <p className="text-xs sm:text-sm text-center text-gray-500 mt-4">
      If you already have an account,&nbsp;
      <Link to="/login" className="underline cursor-pointer">
        please login
      </Link>
    </p>
  </div>
</div>

  );
};

export default SignUpPage;
