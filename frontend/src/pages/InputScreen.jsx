import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { api } from '../lib/api';
import LoadingText from '../components/LoadingText'; 

export default function InputScreen({ mode, setActiveProject }) {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url.includes('github.com')) {
      setError('Please enter a valid GitHub URL.');
      return;
    }

    setError('');
    setIsAnalyzing(true);

    try {
      const repo = await api.createRepository(url);
      setActiveProject(repo.id);
      
      navigate(`/${mode}/${repo.id}`, { state: { fromInput: true } });
    } catch (err) {
      setError('Failed to analyze repository. Is the backend running?');
      setIsAnalyzing(false);
    }
  };

  const tagline = mode === 'learn' 
    ? 'Understand any codebase in minutes.' 
    : 'Get any open-source project running locally.';

  if (isAnalyzing) {
    return <LoadingText />;
  }

  return (

    <div className="flex flex-col items-center justify-center h-screen w-full px-6 pb-20 relative">
      
      {/* Top Left Brand Tag to maintain ecosystem consistency */}
      <div className="absolute top-8 left-10 font-bold text-lg text-[#0F172A] tracking-tight">
        Clarum
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-[5.5rem] font-bold tracking-tight text-[#0F172A] leading-none">
          Clarum
        </h1>
        <p className="text-xl text-[#64748B] font-medium tracking-wide">
          {tagline}
        </p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        onSubmit={handleAnalyze} 
        className="w-full max-w-2xl relative"
      >
        <div className="relative flex items-center">
          <div className="absolute left-6 text-[#94A3B8]">
            <Search size={22} strokeWidth={2.5} />
          </div>
          
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/company/project"
            className="w-full bg-white text-[#0F172A] pl-16 pr-36 py-5 rounded-full text-lg font-medium border border-[#E5E5EA] focus:outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 shadow-apple transition-all duration-300 placeholder:text-[#94A3B8]"
            required
          />
          
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-[#0F172A] hover:bg-black text-white px-8 rounded-full font-semibold transition-colors duration-200 shadow-sm"
          >
            Analyze
          </button>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="text-[#FF3B30] text-sm mt-6 text-center font-semibold tracking-wide"
          >
            {error}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}