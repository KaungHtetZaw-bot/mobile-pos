import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Calculator, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18nContext';

export function LoginView() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Simulate slight lag for a realistic premium loading effect
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields.');
        setIsLoading(false);
        return;
      }

      // Retrieve registered users from localStorage
      const savedUsers = localStorage.getItem('trp_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [
        {
          name: 'Alex Rivera',
          email: 'manager@mobilepulse.com',
          password: 'password123',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGqk-KEB4uJCWi5ry9wZR56s-IH4HGkJRa-AstffapKoMA2zoiirx4GFRy4KqLaaHzqFnPLRPSoBUc_L8nSYosp2ZnXvv2S6Q00icSLu4S_kaxo03OTNR3xOTeHtlSJFleg6BUm1u3pyLtz1T0pvl_N9YgpCxv3-SQsmwp3XVi8P4fJAFWDevF3soRrb6q5WR1nd2jSsuswUYsB3315VgY0A0hwOMfERR0EzDT0Y2fFxXn8BUpHLGXog'
        }
      ];

      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (!foundUser) {
        setError('No account found with this email.');
        setIsLoading(false);
        return;
      }

      if (foundUser.password !== password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }

      setSuccess('Sign in successful! Loading workspace...');
    }, 600);
  };

  const handleQuickFill = () => {
    setEmail('manager@mobilepulse.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] flex items-center justify-center p-4 sm:p-6 md:p-10 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-[#0f172a] rounded-[32px] overflow-hidden shadow-2xl shadow-slate-150 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
        
        {/* Left Side: Dynamic Visual / Brand panel */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] dark:from-[#0b0f19] dark:to-[#111827] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden border-r border-[#1e293b] dark:border-slate-800">
          <div className="relative z-10">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-slate-900 shadow-md shadow-[#38bdf8]/20">
                <Calculator className="w-6 h-6 stroke-2 text-slate-950" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight font-sans leading-none">MobilePulse</h1>
                <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wider font-mono mt-0.5">Premium Hub</p>
              </div>
            </div>

            {/* Title text */}
            <div className="space-y-4 max-w-sm">
              <h2 className="text-3xl font-black tracking-tight font-sans leading-tight">
                Empower Your Store Workspace.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Manage live inventories, complete high-speed checkouts, track multi-currency sales, and access rich bento insights.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <p className="text-xs font-semibold text-slate-300 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Store Analytics
            </p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-slate-400">Today's Store Target</span>
                <p className="text-xl font-bold font-sans mt-0.5 text-white">$14,500.00</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded-lg">
                +12.4% vs yesterday
              </span>
            </div>
          </div>

          {/* Glowing subtle nodes */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        </div>

        {/* Right Side: Form panel */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white dark:bg-[#0f172a]">
          <div className="max-w-md w-full mx-auto">
            
            {/* Heading */}
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                Manager Login
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
                Sign in to manage your premium store ecosystem
              </p>
            </div>

            {/* Error / Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{success}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@mobilepulse.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider font-mono">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#0f172a] hover:bg-[#1e293b] dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-slate-100 dark:shadow-sky-500/5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white dark:border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-4 h-4 stroke-2" />
                  </>
                )}
              </button>

            </form>

            {/* Quick Fill / Demo Credentials Link */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-[#151f32] rounded-2xl border border-dashed border-slate-200 dark:border-slate-850 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">Quick Access Demo</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">manager@mobilepulse.com</span>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-3 py-1.5 bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Auto-Fill
              </button>
            </div>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-[#0f172a] dark:text-sky-400 hover:underline">
                Create new account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
