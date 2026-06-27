import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LOADING_MESSAGES = [
  "Cloning codebase...",
  "Scanning directories...",
  "Extracting dependencies...",
  "Mapping architecture...",
  "Drafting blueprint...",
  "Generating onboarding path..."
];

export const TOTAL_LOADING_TIME = LOADING_MESSAGES.length * 1667; 

export default function LoadingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F7]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-3xl font-medium tracking-tight text-[#0F172A]"
        >
          {LOADING_MESSAGES[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}