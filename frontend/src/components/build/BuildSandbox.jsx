import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Terminal, AlertTriangle, Check, CheckCircle2 } from 'lucide-react';

export default function BuildSandbox({ 
  report, currentStep, setCurrentStep, completedSteps, handleCompleteStep, os, setOs, copied, copyToClipboard 
}) {
  const stepData = report?.steps[currentStep];
  const progressPercentage = report?.steps ? (completedSteps.length / report.steps.length) * 100 : 0;

  if (!stepData) return null;

  return (
    <section className="h-screen w-full snap-start flex flex-col px-10 relative pt-24 pb-8">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full space-y-6">
        
        {/* Top Progress Bar */}
        <div className="w-full h-1.5 bg-[#E5E5EA] rounded-full overflow-hidden shadow-inner flex-shrink-0">
          <motion.div 
            className="h-full bg-[#34C759]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Header - OS Toggle Removed */}
        <div className="flex justify-between items-end flex-shrink-0 pt-4">
          <div>
            <p className="text-[#007AFF] font-bold tracking-[0.2em] text-xs uppercase mb-3">
              Step {currentStep + 1} of {report.steps.length}
            </p>
            <h2 className="text-4xl font-bold text-[#0F172A]">{stepData.title}</h2>
          </div>
        </div>

        {/* The Carousel Card */}
        <div className="flex items-stretch gap-6 flex-1 min-h-0">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className={`px-4 flex items-center justify-center rounded-2xl transition-colors hover:bg-black/5 ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-[#64748B]'}`}
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              className="flex-1 bg-white border border-[#E5E5EA] rounded-[2rem] shadow-apple p-10 flex flex-col overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="space-y-8 flex-1">
                <div>
                  <h4 className="text-[#64748B] text-xs font-bold uppercase tracking-[0.15em] mb-4">What this does</h4>
                  {/* whitespace-pre-line ensures that if the AI sends \n, they are respected */}
                  <p className="text-[#0F172A] text-lg leading-relaxed font-medium whitespace-pre-line">
                    {stepData.explanation}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[#64748B] text-xs font-bold uppercase tracking-[0.15em] mb-2">Why it's necessary</h4>
                  <p className="text-[#475569] leading-relaxed">{stepData.why_necessary}</p>
                </div>

                {stepData.command && (
                  <div className="mt-8 shadow-sm rounded-xl overflow-hidden border border-[#E5E5EA]">
                    <div className="flex justify-between items-center bg-[#F5F5F7] px-4 py-3 border-b border-[#E5E5EA]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF3B30]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFCC00]" />
                        <div className="w-3 h-3 rounded-full bg-[#34C759]" />
                      </div>
                      <button onClick={() => copyToClipboard(stepData.command)} className="text-xs text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5 font-semibold">
                        {copied ? <Check size={14} className="text-[#34C759]"/> : <Terminal size={14} />} {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-[#1D1D1F] p-6 font-mono text-[#34C759] text-sm overflow-x-auto">
                      $ {stepData.command}
                    </div>
                  </div>
                )}

                {stepData.troubleshooting?.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-[#E5E5EA]">
                    <h4 className="flex items-center gap-2 text-[#FF9500] text-xs font-bold uppercase tracking-[0.15em] mb-4">
                      <AlertTriangle size={16} /> Common Issues
                    </h4>
                    <div className="space-y-3">
                      {stepData.troubleshooting.map((tip, i) => (
                        <details key={i} className="group bg-[#F5F5F7] rounded-xl open:bg-white border border-transparent open:border-[#E5E5EA] transition-colors shadow-sm">
                          <summary className="px-5 py-4 cursor-pointer font-semibold text-[#0F172A] list-none flex justify-between items-center">
                            {tip.issue}
                            <span className="text-[#64748B] group-open:rotate-90 transition-transform">→</span>
                          </summary>
                          <div className="px-5 pb-5 text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                            {tip.solution}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E5EA] flex justify-end flex-shrink-0">
                <button 
                  onClick={handleCompleteStep}
                  className={`px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-all ${
                    completedSteps.includes(currentStep) 
                      ? 'bg-[#34C759] text-white shadow-md' 
                      : 'bg-[#F5F5F7] text-[#0F172A] hover:bg-[#E5E5EA]'
                  }`}
                >
                  {currentStep === report.steps.length - 1 && completedSteps.includes(currentStep) 
                    ? 'View Setup Summary' 
                    : (completedSteps.includes(currentStep) ? 'Completed' : 'Mark as Complete')} 
                  <CheckCircle2 size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={() => setCurrentStep(prev => Math.min(report.steps.length - 1, prev + 1))}
            className={`px-4 flex items-center justify-center rounded-2xl transition-colors hover:bg-black/5 ${currentStep === report.steps.length - 1 ? 'opacity-0 pointer-events-none' : 'text-[#64748B]'}`}
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}