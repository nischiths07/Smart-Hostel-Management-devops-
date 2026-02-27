import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Shield, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 mb-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="luxury-card !p-12 shadow-2xl overflow-visible"
      >
        <div className="mb-12">
          <h2 className="text-5xl font-black mb-4 tracking-tighter">Join <span className="text-primary-500">HostelOps</span></h2>
          <p className="font-medium text-slate-500">Secure registration for students and admins.</p>
        </div>
        
        <AnimatePresence mode='wait'>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-4"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Identity */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 pl-1">
              Full Legal Name
            </label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                required
                className="input-field pl-14"
                placeholder="Johnathan Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 pl-1">
              Assign Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="password"
                required
                className="input-field pl-14"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 pl-1">
              Select Protocol Role
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'student' })}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                  formData.role === 'student' 
                  ? 'bg-primary-500/10 border-primary-500 text-primary-600 shadow-[0_10px_30px_rgba(14,165,233,0.2)]' 
                  : 'bg-slate-50 dark:bg-slate-800/30 border-transparent text-slate-400 grayscale'
                }`}
              >
                <div className={`p-3 rounded-2xl ${formData.role === 'student' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                   <User className="w-6 h-6" />
                </div>
                <span className="font-black text-sm uppercase tracking-widest">Resident</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'admin' })}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                  formData.role === 'admin' 
                  ? 'bg-primary-500/10 border-primary-500 text-primary-600 shadow-[0_10px_30px_rgba(14,165,233,0.2)]' 
                  : 'bg-slate-50 dark:bg-slate-800/30 border-transparent text-slate-400 grayscale'
                }`}
              >
                <div className={`p-3 rounded-2xl ${formData.role === 'admin' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                   <Shield className="w-6 h-6" />
                </div>
                <span className="font-black text-sm uppercase tracking-widest">Maintainer</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-5 text-xl flex items-center justify-center gap-3"
            >
              {loading ? 'Processing...' : <><span className="font-black uppercase tracking-widest">Initialize Account</span> <CheckCircle2 className="w-6 h-6" /></>}
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
           <p className="text-slate-500 font-medium">
            Already registered?{' '}
            <Link to="/login" className="text-primary-500 font-black hover:underline underline-offset-4 decoration-2">
              Access Vault
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
