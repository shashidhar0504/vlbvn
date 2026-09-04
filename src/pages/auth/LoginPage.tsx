import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { VlbvnLogo } from '../../components/common/VlbvnLogo';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentRoute, switchRole } = useDemo();
  const [email, setEmail] = useState('rajesh@patilsolar.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole('MEMBER');
    setCurrentRoute('/member/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-stone-200 rounded-3xl shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-3">
          <VlbvnLogo size="lg" className="justify-center" />
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Member Portal Login</h1>
          <p className="text-stone-500 text-xs">Enter your credentials to access VLBVN business network.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-stone-600">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-amber-600 rounded" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setCurrentRoute('/forgot-password')}
              className="text-amber-700 font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm py-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Member Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher Presets */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2 text-xs">
          <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wider">Demo Quick Access</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                switchRole('MEMBER');
                setCurrentRoute('/member/dashboard');
              }}
              className="p-2 bg-white border border-stone-200 rounded-lg hover:border-amber-500 text-left"
            >
              <div className="font-bold text-stone-900">Member Portal</div>
              <div className="text-[10px] text-stone-500">Rajesh Patil</div>
            </button>
            <button
              onClick={() => {
                switchRole('COMMUNITY_ADMIN');
                setCurrentRoute('/admin/dashboard');
              }}
              className="p-2 bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-300 rounded-lg hover:border-amber-500 text-left"
            >
              <div className="font-bold text-stone-900">Admin Control</div>
              <div className="text-[10px] text-stone-600">Anand Deshmukh</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
