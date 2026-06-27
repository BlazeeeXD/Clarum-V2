import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function BuildOverview({ report }) {
  const scrollToSandbox = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  // Ultimate failsafe: if report is completely missing, render nothing instead of crashing
  if (!report) return null;

  return (
    <section className="h-screen w-full snap-start flex flex-col justify-center px-10 relative">
      <div className="absolute top-8 left-10 font-bold text-lg text-[#0F172A] tracking-tight">
        Clarum
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            {/* Added optional chaining and a fallback title */}
            <h1 className="text-[4rem] font-bold tracking-tight text-[#0F172A] leading-tight">
              {report?.project_name || "Project Setup"}
            </h1>
            <p className="text-xl text-[#64748B] font-medium">
              Let's get this running on your local machine safely.
            </p>
          </div>
          
          <div className="flex gap-6 pt-4">
            <div className="bg-white px-8 py-6 rounded-[1.5rem] shadow-apple border border-[#E5E5EA]">
              <p className="text-xs text-[#64748B] uppercase tracking-[0.2em] mb-2 font-bold">Estimated Time</p>
              {/* Added optional chaining and a fallback */}
              <p className="text-2xl font-bold text-[#0F172A]">{report?.estimated_time || "N/A"}</p>
            </div>
            <div className="bg-white px-8 py-6 rounded-[1.5rem] shadow-apple border border-[#E5E5EA]">
              <p className="text-xs text-[#64748B] uppercase tracking-[0.2em] mb-2 font-bold">Difficulty</p>
              {/* Added optional chaining and a fallback */}
              <p className="text-2xl font-bold text-[#0F172A]">{report?.difficulty || "N/A"}</p>
            </div>
          </div>

          <button 
            onClick={scrollToSandbox}
            className="mt-8 bg-[#0F172A] text-white px-8 py-4 rounded-full font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-apple"
          >
            Begin Installation <ChevronDown size={20} />
          </button>
        </div>

        <div className="bg-white p-12 rounded-[2.5rem] shadow-apple border border-[#E5E5EA] space-y-6">
          <h3 className="text-2xl font-bold text-[#0F172A]">Required Software</h3>
          <ul className="space-y-4">
            {/* The ? map fix you correctly applied, fully integrated */}
            {report?.required_software?.map((req, i) => (
              <li key={i} className="flex items-center gap-4 text-[#475569] font-medium text-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-[#007AFF]" /> {req}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}