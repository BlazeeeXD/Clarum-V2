import React from 'react';
import { motion } from 'framer-motion';

export default function MissionBrief({ report }) {
  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center px-6 relative">
      
      {/* Top Left Brand Tag matching your mockup */}
      <div className="absolute top-8 left-8 font-bold text-lg text-[#0F172A] tracking-tight">
        Clarum
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl w-full space-y-12"
      >
        <div className="space-y-6">
          <h2 className="text-[3.5rem] font-bold tracking-tight text-[#0F172A]">
            Mission Brief.
          </h2>
          <p className="text-xl text-[#475569] leading-relaxed font-medium mx-auto">
            {report.project_summary}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="bg-white p-12 rounded-[2rem] shadow-apple flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-7xl font-semibold text-[#0F172A] tracking-tight">
              {report.learning_path?.length || 0}
            </span>
            <span className="text-xs font-bold text-[#64748B] tracking-[0.2em] uppercase">
              Files Mapped
            </span>
          </div>
          
          <div className="bg-white p-12 rounded-[2rem] shadow-apple flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-6xl font-semibold text-[#0F172A] tracking-tight">
               {report.architecture_summary?.includes('FastAPI') ? 'FastAPI' : 
                report.architecture_summary?.includes('React') ? 'React' : 'Python/JS'}
            </span>
            <span className="text-xs font-bold text-[#64748B] tracking-[0.2em] uppercase">
              Primary Stack
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}