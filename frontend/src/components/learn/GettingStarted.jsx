import React from 'react';
import { motion } from 'framer-motion';

export default function GettingStarted({ report }) {
  return (
    <section className="h-screen w-full snap-start flex flex-col px-10 relative pt-28 pb-6">
      
      {/* Top Left Brand Tag strictly locked to the corner */}
      <div className="absolute top-8 left-10 font-bold text-lg text-[#0F172A] tracking-tight">
        Clarum
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl w-full mx-auto flex flex-col h-full"
      >
        
        {/* Left Aligned Header Block - Anchored at the top */}
        <div className="text-left w-full mb-6 flex-shrink-0">
          <h2 className="text-[3.5rem] font-bold tracking-tight text-[#0F172A]">
            Getting Started.
          </h2>
          <p className="text-xl text-[#64748B] mt-2 font-medium">
            A few files you should read first.
          </p>
        </div>

        {/* 
          THE MASKED CONTAINER: 
          Added a linear-gradient mask that fades the top 2rem (32px) and bottom 2rem to transparent.
          This gives the illusion of the cards sliding underneath the surface.
        */}
        <div className="flex-1 overflow-y-auto w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-2rem),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-2rem),transparent)]">
          
          {/* 
            Added pt-8 and pb-32 so the user can scroll the cards fully past the faded mask zone.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 pb-32 px-2">
            {report?.learning_path?.map((step) => (
              <div 
                key={step.step}
                className="bg-white p-8 rounded-[2rem] shadow-apple transition-transform duration-300 hover:-translate-y-1 border border-transparent hover:border-[#E5E5EA]"
              >
                <div className="text-[#007AFF] text-xs font-bold tracking-widest uppercase mb-4">
                  Step {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 tracking-tight break-all font-mono">
                  {step.file.split('/').pop()}
                </h3>
                <p className="text-base text-[#64748B] leading-relaxed font-medium">
                  {step.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}