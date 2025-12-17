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
    <div className="fixed inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl w-[90%] sm:w-[400px] md:w-[460px] p-8 relative shadow-xl">
        
        {/* Optional Back Arrow */}
        <div className="absolute top-4 left-4 text-gray-500 text-xl cursor-pointer">
          ←
        </div>

        {/* Logo + Heading */}
        <div className="flex flex-col items-center mb-6 mt-4">
      
          <h2 className="text-2xl font-bold text-center">SignUp</h2>
        </div>

        {/* Email Input */}
        <form onSubmit={(e)=>submitHandler(e)} action="">
      
        <div className="mt-4">
          <label className="block text-sm mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1 font-medium text-gray-700">Phone number</label>
          <input
            type="text"
           
            placeholder="Enter your number"
            onChange={(e)=>setNumber(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
          />
        </div>
         <div className="mt-4">
          <label className="block text-sm mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="block text-sm mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
             onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ring-[#059363]"
          />
        </div>
       


        {/* Login Button */}
        <button  className="w-full mt-6 bg-[#059363] text-white py-3 rounded-lg text-lg hover:bg-[#0A3D3F] font-semibold  transition">
          Continue
        </button>

        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-5">
         if you alreaddy have an account,
          <span className="underline cursor-pointer"><Link to="/login" >please login</Link></span> &{' '}
         
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
