// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Asset Imports
import shape1 from '../assets/images/shape1.svg';
import shape2 from '../assets/images/shape2.svg';
import shape3 from '../assets/images/shape3.svg';
import loginImg from '../assets/images/login.png';
import logo from '../assets/images/logo.svg';

// Icons
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

// ✅ Firebase
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await loginUser(formData);
      saveSession(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 Backend payload
      const payload = {
        email: user.email,
        password: user.uid, // temp হিসেবে
      };

      const res = await loginUser(payload);

      saveSession(res.data.token, res.data.user);
      navigate('/');

    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center py-12 px-4">
      
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 -z-10 opacity-40 select-none pointer-events-none">
        <img src={shape1} alt="" className="w-64 md:w-auto" />
      </div>
      <div className="absolute top-1/4 right-0 -z-10 opacity-40 select-none pointer-events-none">
        <img src={shape2} alt="" className="w-64 md:w-auto" />
      </div>
      <div className="absolute bottom-0 left-10 -z-10 opacity-30 select-none pointer-events-none">
        <img src={shape3} alt="" className="w-48 md:w-auto" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Side */}
          <div className="hidden lg:block lg:w-1/2 xl:w-3/5">
            <div className="relative animate-fadeIn">
              <img 
                src={loginImg} 
                alt="Login Illustration" 
                className="w-full max-w-[600px] mx-auto drop-shadow-2xl transform hover:translate-y-[-10px] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[450px] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100">
            
            {/* Header */}
            <div className="text-center lg:text-left mb-10">
              <img src={logo} alt="Logo" className="h-10 mb-8 mx-auto lg:mx-0" />
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">Welcome Back</p>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">Login to your account</h2>
            </div>

            {/* ✅ Google Sign-In */}
            <button 
              onClick={handleGoogleLogin}
              className="group w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] mb-8"
            >
              <FcGoogle size={24} />
              <span>Sign-in with Google</span>
            </button>

            {/* Divider */}
            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative px-4 bg-white text-slate-400 text-xs font-bold uppercase tracking-widest">Or</span>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                <div className="relative group">
                  <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Login now
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 font-extrabold hover:underline">
                  Create New Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;