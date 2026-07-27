'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-brand-offwhite">
      {/* Left Column: Premium Fashion Imagery (Desktop Only) */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden bg-brand-charcoal shadow-2xl z-10">
        <img 
          src="/brand/covers/cover.png" 
          alt="Fashion Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-pink-500/10 mix-blend-overlay"></div>
        
        <div className="absolute bottom-16 left-16 right-16 z-20 text-white">
          <img src="/brand/logos/logo-hollow.png" alt="Logo" className="h-16 w-auto mb-8 brightness-0 invert opacity-90 drop-shadow-md" />
          <h2 className="font-heading text-5xl mb-6 leading-[1.1] tracking-tight">
            Curate Your <br/>
            <span className="text-brand-pink-300 italic">Collection.</span>
          </h2>
          <p className="text-white/70 font-light text-lg max-w-md leading-relaxed">
            Welcome to the central command for 20-July Shop. Manage your inventory, oversee categories, and shape the future of your boutique.
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-brand-pink-200/40 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-brand-purple-200/30 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="w-full max-w-[420px] px-8 z-10">
          {/* Mobile-only Logo */}
          <div className="text-center mb-10 lg:hidden">
            <img src="/brand/logos/logo-hollow.png" alt="Logo" className="h-14 w-auto mx-auto mb-4 drop-shadow-sm" />
            <h1 className="font-heading text-3xl text-brand-charcoal tracking-wide mb-1">
              20-July
            </h1>
            <p className="text-brand-pink-500 font-bold text-[10px] tracking-[0.3em] uppercase">
              Admin Portal
            </p>
          </div>

          <div className="hidden lg:block text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-white/60 rounded-3xl backdrop-blur-md border border-brand-pink-100 mb-6 shadow-sm">
              <Sparkles className="w-8 h-8 text-brand-pink-500" />
            </div>
            <h1 className="font-heading text-4xl text-brand-charcoal tracking-wide mb-2">
              Welcome Back
            </h1>
            <p className="text-brand-charcoal/50 text-sm">
              Please enter your credentials to continue.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-xl shadow-brand-pink-100/50 border border-white p-8 relative overflow-hidden group/card">
            {/* Subtle hover gradient effect on card */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-50/50 via-transparent to-brand-purple-50/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-brand-charcoal/60 ml-1">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-charcoal/30 group-focus-within/input:text-brand-pink-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-brand-pink-100 bg-white/50
                                 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400 focus:bg-white
                                 text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300 shadow-inner shadow-black/5"
                      placeholder="admin@20julyshop.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-xs font-bold tracking-widest uppercase text-brand-charcoal/60 ml-1">
                    Password
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-charcoal/30 group-focus-within/input:text-brand-pink-500 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-brand-pink-100 bg-white/50
                                 focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-brand-pink-400 focus:bg-white
                                 text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300 shadow-inner shadow-black/5"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group w-full py-4 rounded-2xl font-medium tracking-wide text-white flex items-center justify-center gap-3
                           bg-brand-charcoal hover:bg-black
                           focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 shadow-xl shadow-brand-charcoal/20
                           hover:shadow-2xl hover:shadow-brand-charcoal/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center flex flex-col items-center gap-2">
            <p className="text-[10px] text-brand-charcoal/30 uppercase tracking-widest mt-1">
              © {new Date().getFullYear()} 20-July Shop Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
