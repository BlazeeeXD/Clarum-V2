import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Folder } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Learn',
      description: 'Visually deconstruct complex codebase architectures and map data flows instantly.',
      path: '/learn/input',
      icon: BookOpen,
      iconColor: 'text-[#0F172A]',
      iconBg: 'bg-white border border-[#E5E5EA] shadow-sm',
    },
    {
      title: 'Build',
      description: 'Generate OS-aware installation sandboxes to safely orchestrate local environments.',
      path: '/build/input',
      icon: Terminal,
      iconColor: 'text-[#0F172A]',
      iconBg: 'bg-white border border-[#E5E5EA] shadow-sm',
    },
    {
      title: 'My Projects',
      description: 'Resume your saved system blueprints and track your active execution pipelines.',
      path: '/projects',
      icon: Folder,
      iconColor: 'text-[#0F172A]',
      iconBg: 'bg-white border border-[#E5E5EA] shadow-sm',
    },
  ];

  return (
    <div className="flex flex-col items-center h-screen w-full max-w-7xl mx-auto px-10 pb-16">
      
      {/* TEXT POSITIONING:
        flex-1 and justify-center puts it in the middle.
        pt-24 pushes it slightly down from the center. Adjust this to move it up or down.
      */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex flex-col justify-center pt-24 text-center space-y-6 w-full"
      >
        <h1 className="text-[5.5rem] font-bold tracking-tight text-[#0F172A] leading-none">
          Clarum
        </h1>
        {/* max-w-4xl ensures the tagline has plenty of room to stay on one single line */}
        <p className="text-xl text-[#64748B] font-medium tracking-wide max-w-4xl mx-auto">
          Understand any codebase in minutes. Execute any project with confidence.
        </p>
      </motion.div>

      {/* gap-16 controls the horizontal spread between the cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full flex-shrink-0"
      >
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}

              className="group text-left bg-white border border-[#E5E5EA] p-8 rounded-[2rem] shadow-apple transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-[15rem] outline-none"
            >
              <div>
                <div className={`p-3.5 rounded-2xl w-fit mb-5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center ${card.iconBg} ${card.iconColor}`}>
                  <IconComponent size={24} strokeWidth={1.25} />
                </div>
                
                <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              <div className="mt-auto text-sm font-bold text-[#94A3B8] group-hover:text-[#0F172A] transition-colors duration-300 flex items-center gap-1.5">
                <span>Initialize</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
              </div>
            </button>
          );
        })}
      </motion.div>
      
    </div>
  );
}