import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Bell, Clock, Building2, UserCheck, Scale, ClipboardList } from 'lucide-react';
import sahyadri from "../../public/sahyadri-.jpg";

const Landing = () => {
  const rules = [
    { icon: <Clock className="w-6 h-6 text-amber-500" />, title: "Reporting Time", desc: "All maintenance requests must be logged between 8:00 AM and 6:00 PM for same-day evaluation." },
    { icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, title: "Emergency Protocol", desc: "Water leakage or electrical short circuits must be reported via the 'High Priority' flag immediately." },
    { icon: <Scale className="w-6 h-6 text-primary-500" />, title: "Fair Use Policy", desc: "Requests are processed based on criticality and timestamp. Avoid duplicate filings for the same issue." },
    { icon: <ClipboardList className="w-6 h-6 text-indigo-500" />, title: "Resolution Feedback", desc: "Students are required to verify the fix and close the ticket within 24 hours of resolution." },
  ];

  const infoDocs = [
    { title: "Plumbing", details: "Handled by the Ground Floor maintenance crew. Average wait: 4 hours." },
    { title: "Electrical", details: "External contractors visit every Tuesday and Friday for non-emergencies." },
    { title: "Carpentry", details: "Requires explicit permission from the Hostel Warden for major furniture repairs." },
  ];

  return (
    <div className="pt-20 pb-20 px-4">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 text-sm font-bold tracking-widest uppercase mb-6 inline-block">
            Smart Campus Ecosystem
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            SahyadriOps: Smart <span className="text-gradient">Hostel Complaint Management</span> <br /> Made Simple.
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Experience luxury maintenance management. Fast, transparent, and completely paperless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-10">Get Started Now</Link>
            <Link to="/login" className="px-10 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
              <UserCheck className="w-5 h-5" /> Login Portal
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Rules Section */}
      <section className="container mx-auto max-w-6xl mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Operations & <span className="text-primary-500">Guidelines</span></h2>
          <p className="text-slate-500">Standard operating procedures for all residents.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="luxury-card group"
            >
              <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                {rule.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{rule.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{rule.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="container mx-auto max-w-6xl mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight">Everything You Need To <span className="text-blue-500 underline decoration-8 underline-offset-8">Know.</span></h2>
            <div className="space-y-6">
              {infoDocs.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-colors">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/40 rounded-lg">
                    <Zap className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-500/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="relative glass p-4 rounded-[40px] border-white/40">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-[30px] overflow-hidden flex items-center justify-center">
                <img
                  src={sahyadri}
                  alt="Sahyadri College"
                  className="w-full h-full object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="container mx-auto max-w-6xl pt-20 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-slate-400 text-sm font-medium">© 2026 Administered by the University Maintenance Council</p>
      </footer>
    </div>
  );
};

export default Landing;
