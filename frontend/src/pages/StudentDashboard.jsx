import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Clock, CheckCircle2, AlertTriangle, Send, History, FilterX, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    priority: 'Medium'
  });

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('/api/complaints/my');
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/complaints', formData);
      setShowForm(false);
      setFormData({ title: '', description: '', category: 'Plumbing', priority: 'Medium' });
      fetchComplaints();
    } catch (err) {
      alert('Transmission failed. Check network.');
    }
  };

  const statusThemes = {
    'Pending': 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
    'In Progress': 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
    'Resolved': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
    'Rejected': 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700'
  };

  const priorityThemes = {
    'Low': 'text-slate-400',
    'Medium': 'text-amber-500',
    'High': 'text-red-500 font-black'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Stat Area */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black tracking-tighter mb-4"
          >
            Resident <span className="text-primary-500 text-6xl">Terminal</span>
          </motion.h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> System Active
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
               {complaints.length} Tickets Logged
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`btn-primary flex items-center gap-3 transition-all duration-500 ${showForm ? '!bg-slate-800 !shadow-none' : ''}`}
        >
          {showForm ? 'Abort Filing' : <><Plus className="w-5 h-5" /> New Maintenance Log</>}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-20"
          >
            <form onSubmit={handleSubmit} className="luxury-card shadow-2xl space-y-8 !bg-white/80 dark:!bg-slate-900/80 backdrop-blur-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Issue Specification</label>
                  <input
                    required
                    className="input-field"
                    placeholder="Briefly state the hardware failure..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Department</label>
                  <select 
                    className="input-field appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Cleaning</option>
                    <option>Carpentry</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Detailed Description</label>
                <textarea
                  required
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Describe the exact location and nature of the issue. Be specific to ensure fast resolution."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl gap-6">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Urgency Level:</span>
                  <div className="flex gap-3">
                    {['Low', 'Medium', 'High'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority: p })}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all ${
                          formData.priority === p 
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl scale-110' 
                          : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto px-12 group">
                  <span className="flex items-center gap-3">
                    Transmit Signal <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complaints List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3 mb-8">
            <History className="w-6 h-6 text-primary-500" /> Active Registry
          </h2>
          
          {loading ? (
            <div className="text-center py-20 luxury-card animate-pulse">Scanning server registry...</div>
          ) : complaints.length === 0 ? (
            <div className="luxury-card text-center py-32 border-dashed border-2">
               <div className="bg-slate-50 dark:bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FilterX className="w-10 h-10 text-slate-300" />
               </div>
               <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Zero Faults Detected</h3>
               <p className="text-slate-500 font-medium">Your current environment is operating at 100% capacity.</p>
            </div>
          ) : (
            complaints.map((c, idx) => (
              <motion.div 
                layout
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="luxury-card group !p-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-2 block">
                      Case #{c._id.slice(-6)} • {c.category}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">{c.title}</h3>
                  </div>
                  <span className={`badge-status shadow-none border ${statusThemes[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">{c.description}</p>
                
                <div className="flex flex-wrap items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
                  <div className="flex gap-8">
                    <div className="space-y-1">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Logged</span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                         <Clock className="w-3 h-3" /> {new Date(c.createdAt).toLocaleDateString()}
                       </span>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Priority</span>
                       <span className={`text-xs font-black flex items-center gap-1.5 ${priorityThemes[c.priority]}`}>
                         <AlertTriangle className="w-3 h-3" /> {c.priority} Level
                       </span>
                    </div>
                  </div>
                  
                  {c.adminRemarks && (
                    <div className="flex-1 min-w-[300px] bg-primary-50/50 dark:bg-primary-950/20 p-5 rounded-2xl border border-primary-100/50 dark:border-primary-900/30 flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400 block mb-1">HQ Response</span>
                        <p className="text-sm font-bold text-primary-900 dark:text-primary-100 italic">{c.adminRemarks}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Sidebar Info/Rules */}
        <div className="space-y-8">
           <div className="luxury-card !bg-amber-500/5 dark/!bg-amber-500/10 border-amber-200/50 dark:border-amber-900/30">
              <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 mb-6 text-amber-700 dark:text-amber-400">
                <HelpCircle className="w-6 h-6" /> Protocols
              </h4>
              <ul className="space-y-4">
                {[
                  "Photos of evidence speed up processing.",
                  "High priority is for life-safety issues only.",
                  "Unauthorized repairs void warranty.",
                  "Maintenance windows are 9AM - 5PM Daily."
                ].map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-bold text-amber-800 dark:text-amber-200">
                    <span className="text-amber-400 font-black">0{idx+1}</span>
                    {rule}
                  </li>
                ))}
              </ul>
           </div>

           <div className="luxury-card overflow-hidden !p-0">
              <div className="bg-primary-600 p-8 text-white">
                 <h4 className="text-2xl font-black tracking-tighter uppercase mb-2">Help Center</h4>
                 <p className="text-white/70 text-sm font-bold">24/7 Concierge Support</p>
              </div>
              <div className="p-8 space-y-4">
                 <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">Call Support</button>
                 <button className="w-full py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-black uppercase tracking-widest hover:border-slate-200 transition-colors">Documentation</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
