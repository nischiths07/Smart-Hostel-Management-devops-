import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials provided.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 px-4 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="luxury-card !p-12 shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 p-8">
          <div className="w-24 h-24 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="mb-12">
          <h2 className="text-5xl font-black mb-4 tracking-tighter">Auth <span className="text-primary-500">Gateway</span></h2>
          <p className="font-medium text-slate-500">Secure access to the maintenance ecosystem.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-4"
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 pl-1">
              Campus Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="email"
                required
                className="input-field pl-14"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 pl-1">
              Security Key
            </label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="password"
                required
                className="input-field pl-14"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary !py-5 text-lg flex items-center justify-center gap-3 mt-4"
          >
            {loading ? 'Authenticating...' : <><span className="tracking-widest uppercase font-black">Open Portal</span> <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="w-full flex items-center gap-4 text-slate-400">
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
            <span className="text-xs font-bold uppercase tracking-widest">or continue with</span>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
          </div>

          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Login Failed')}
              useOneTap
              theme="filled_black"
              shape="pill"
              size="large"
              width="100%"
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-500 font-medium">
            New to the system?{' '}
            <Link to="/register" className="text-primary-500 font-black hover:underline underline-offset-4 decoration-2">
              Apply for Access
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
