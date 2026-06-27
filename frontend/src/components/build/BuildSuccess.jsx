import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function BuildSuccess({ report }) {
  return (
    <div className="h-screen w-full flex flex-col px-10 relative pt-24 pb-12 bg-[#F5F5F7]">
      
      {/* Top Left Brand Tag */}
      <div className="absolute top-8 left-10 font-bold text-lg text-[#0F172A] tracking-tight">
        Clarum
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
        className="max-w-7xl w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16 h-full items-center"
      >
        
        {/* LEFT SIDE: Congratulation Text */}
        <div className="flex flex-col justify-center text-left max-w-lg">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#34C759]/10 mb-8">
            <CheckCircle2 size={48} className="text-[#34C759]" />
          </div>
          <h1 className="text-[4rem] font-bold text-[#0F172A] tracking-tight leading-tight mb-6">
            Installation<br/>Complete.
          </h1>
          <p className="text-xl text-[#64748B] font-medium leading-relaxed">
            You have successfully configured <span className="text-[#0F172A] font-semibold">{report.project_name}</span>. The environment is now ready for local execution.
          </p>
        </div>

        {/* RIGHT SIDE: The Scalable Step Box */}
        <div className="h-[75vh] w-full bg-white border border-[#E5E5EA] rounded-[2.5rem] shadow-apple flex flex-col overflow-hidden">
          
          {/* Static Box Header - Never scrolls */}
          <div className="px-10 py-8 border-b border-[#E5E5EA] flex-shrink-0 bg-white z-10">
            <h3 className="text-xl font-bold text-[#0F172A]">Completed Setup Protocol</h3>
          </div>

          {/* 
            MASKED SCROLLING CONTAINER: 
            The list of steps lives here. It scrolls infinitely without a scrollbar,
            and dissolves smoothly at the top and bottom edges.
          */}
          <div className="flex-1 overflow-y-auto w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-2rem),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-2rem),transparent)]">
            
            {/* Generous padding to scroll past the dissolve zone */}
            <div className="px-10 pt-6 pb-24 space-y-6">
              {report.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  <CheckCircle2 size={24} className="text-[#34C759] flex-shrink-0 mt-0.5" />
                  <span className="text-[#475569] font-medium text-lg leading-relaxed">{step.title}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
        
      </motion.div>
    </div>
  );
}