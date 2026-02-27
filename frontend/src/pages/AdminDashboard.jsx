import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Search, CheckCircle2, Clock, XCircle, MessageSquare, ShieldAlert, ChevronRight, LayoutGrid, List, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const fetchAllComplaints = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/complaints', {
        params: { status: filterStatus, category: filterCategory }
      });
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllComplaints();
  }, [filterStatus, filterCategory]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/complaints/${id}`, { status, adminRemarks: remarks });
      setUpdatingId(null);
      setRemarks('');
      fetchAllComplaints();
    } catch (err) {
      alert('Network error. Update aborted.');
    }
  };

  const statusIcons = {
    'Pending': <Clock className="w-5 h-5 text-amber-500" />,
    'In Progress': <Search className="w-5 h-5 text-blue-500" />,
    'Resolved': <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    'Rejected': <XCircle className="w-5 h-5 text-slate-500" />
  };

  const statusColors = {
    'Pending': 'text-amber-500 border-amber-500/20 bg-amber-500/5',
    'In Progress': 'text-blue-500 border-blue-500/20 bg-blue-500/5',
    'Resolved': 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
    'Rejected': 'text-slate-500 border-slate-500/20 bg-slate-500/5'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Admin Title Area */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 justify-center md:justify-start mb-4"
          >
            <ShieldAlert className="w-10 h-10 text-primary-500" />
            <h1 className="text-6xl font-black tracking-tighter uppercase italic">Control <span className="text-primary-500 not-italic">Center</span></h1>
          </motion.div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">University Maintenance Command & Control (UMCC)</p>
        </div>

        {/* Filters Panel */}
        <div className="glass !p-4 !rounded-[24px] flex flex-wrap gap-4 items-center shadow-2xl">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <Filter className="w-5 h-5 text-primary-500" />
          </div>

          <select
            className="bg-transparent border-none text-sm font-black uppercase tracking-widest px-4 focus:ring-0 cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

          <select
            className="bg-transparent border-none text-sm font-black uppercase tracking-widest px-4 focus:ring-0 cursor-pointer"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {loading ? (
          <div className="col-span-full text-center py-40 luxury-card animate-pulse tracking-[1em] text-slate-400 font-black uppercase">Decrypting Records...</div>
        ) : complaints.length === 0 ? (
          <div className="col-span-full h-96 luxury-card flex flex-col items-center justify-center border-dashed border-2">
            <XCircle className="w-16 h-16 text-slate-200 mb-6" />
            <p className="text-slate-500 font-bold uppercase tracking-widest">No matching records found in the current buffer.</p>
          </div>
        ) : (
          complaints.map((c, idx) => (
            <motion.div
              layout
              key={c._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`luxury-card flex flex-col group ${viewMode === 'list' ? 'md:flex-row !p-10' : ''}`}
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`badge-status border shrink-0 ${statusColors[c.status]}`}>
                      {c.status}
                    </div>
                    {c.isConfirmedByStudent && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        <CheckCircle className="w-3 h-3" /> Confirmed
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">#{c._id.slice(-6)}</span>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-black mb-2 leading-tight group-hover:text-primary-500 transition-colors">{c.title}</h3>
                  <div className="flex items-center flex-wrap gap-4">
                    <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {c.category}
                    </div>
                    <div className={`px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest ${c.priority === 'High' ? 'text-red-500' : 'text-slate-400'}`}>
                      {c.priority} Priority
                    </div>
                  </div>
                </div>

                <div className={`${c.imageUrl ? 'grid md:grid-cols-2 gap-4 mb-6' : ''}`}>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-4">
                    {c.description}
                  </p>
                  {c.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md h-32 md:h-full min-h-[100px]">
                      <img
                        src={c.imageUrl}
                        alt="Issue"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold">
                    {c.student?.name ? c.student.name[0] : '?'}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none">{c.student?.name || 'Unknown Student'}</p>
                    <p className="text-[10px] font-medium text-slate-400">{c.student?.email}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className={`pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 ${viewMode === 'list' ? 'md:border-t-0 md:border-l md:pt-0 md:pl-10 md:min-w-[280px] justify-center' : ''}`}>
                <div className="grid grid-cols-2 gap-2">
                  {['In Progress', 'Resolved', 'Rejected'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setUpdatingId(updatingId === c._id ? null : c._id)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${c.status === s ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {updatingId === c._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-3"
                    >
                      <textarea
                        placeholder="Log official remarks for the resident..."
                        className="input-field !py-3 !text-xs h-24 !rounded-xl !bg-white/50"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(c._id, 'Resolved')}
                          className="flex-grow bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20"
                        >
                          Confirm Fix
                        </button>
                        <button
                          onClick={() => setUpdatingId(null)}
                          className="px-4 bg-slate-200 dark:bg-slate-700 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Admin Rules Sidebar / Bottom Bar */}
      <footer className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 mb-6">Service Level Agreement</h5>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">Ensure all 'High' priority tickets are evaluated within 120 minutes of logging. Maintain 98% resolution accuracy.</p>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 mb-6">Security Protocol</h5>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">Remarks are visible to residents. Use professional language and specific instructions for follow-up.</p>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 mb-6">Reporting Console</h5>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">Export weekly maintenance logs every Sunday before system maintenance (02:00 AM UTC).</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
