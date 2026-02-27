import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Shield, User, Building2, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-6 mx-4 md:mx-auto max-w-6xl z-50 rounded-[32px] px-8 py-4 transition-all duration-500 shadow-2xl shadow-primary-500/10">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-primary-600 rounded-2xl shadow-lg shadow-primary-500/30 group-hover:rotate-12 transition-all duration-500">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">
            Hostel<span className="text-primary-500">Ops</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-8">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-400"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold bg-white/50 dark:bg-slate-800/50 px-5 py-2.5 rounded-2xl border border-white/40 dark:border-slate-700/50">
                {user.role === 'admin' ? <Shield className="w-4 h-4 text-primary-500" /> : <User className="w-4 h-4 text-primary-500" />}
                <span className="text-sm">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline text-sm uppercase tracking-widest font-black">Quit</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-500 px-4 py-2">Login</Link>
              <Link to="/register" className="btn-primary py-2.5 px-6 !rounded-2xl text-sm">Join System</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
