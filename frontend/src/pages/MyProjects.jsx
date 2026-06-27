import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, CheckCircle } from 'lucide-react';
import { api } from '../lib/api';
import { storage } from '../lib/storage';

export default function MyProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({ isOpen: false, type: null, projectId: null, projectName: '' });

  useEffect(() => {
    async function loadProjects() {
      const localProjects = storage.getAllProjects();

      const enrichedProjects = await Promise.all(
        localProjects.map(async (local) => {
          try {
            const dbData = await api.getProject(local.projectId);
            
            const totalSteps = dbData.build_data?.steps?.length || 1;
            const completedCount = local.completedSteps?.length || 0;
            const progress = Math.min(100, Math.round((completedCount / totalSteps) * 100));
            
            return {
              ...local,
              repo_name: dbData.repo_name || 'Unknown Project',
              description: dbData.build_data?.project_summary || dbData.learn_data?.project_summary || 'Local installation blueprint.',
              hasLearn: !!dbData.learn_data,
              hasBuild: !!dbData.build_data,
              totalSteps,
              progress,
              isComplete: progress === 100,
            };
          } catch (err) {
            return null;
          }
        })
      );

      setProjects(enrichedProjects.filter(Boolean));
      setLoading(false);
    }

    loadProjects();
  }, []);

  const handleActionClick = (project, type) => {
    const hasData = type === 'learn' ? project.hasLearn : project.hasBuild;
    
    if (hasData) {
      navigate(`/${type}/${project.projectId}`);
    } else {
      setModal({ isOpen: true, type, projectId: project.projectId, projectName: project.repo_name });
    }
  };

  const confirmGeneration = () => {
    navigate(`/${modal.type}/${modal.projectId}`);
    setModal({ isOpen: false, type: null, projectId: null, projectName: '' });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-[#64748B] font-medium text-lg bg-[#F5F5F7]">
        Loading your workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F5F7] px-10 pt-32 pb-16 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <h1 className="text-[3.5rem] font-bold text-[#0F172A] tracking-tight">
            My Projects
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white border border-[#E5E5EA] rounded-[2.5rem] p-16 text-center shadow-apple max-w-2xl mx-auto mt-20">
            <Folder size={48} className="mx-auto text-[#94A3B8] mb-6 stroke-1" />
            <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Workspace is empty</h3>
            <p className="text-[#64748B] mb-8 text-lg">You haven't started any build pipelines yet.</p>
            <button 
              onClick={() => navigate('/build/input')}
              className="bg-[#0F172A] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-black transition-colors shadow-apple"
            >
              Start a new Build
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.projectId}
                className="group bg-white border border-[#E5E5EA] p-8 rounded-[2rem] shadow-apple hover:shadow-lg transition-all duration-300 flex flex-col h-[21rem]"
              >
                {/* Top Section */}
                <div className="mb-auto">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#0F172A] truncate pr-4">
                      {project.repo_name}
                    </h3>
                    {project.isComplete && (
                      <CheckCircle size={22} className="text-[#34C759] flex-shrink-0 stroke-2" />
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] line-clamp-3 leading-relaxed mt-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Section Cluster - Tighter spacing (space-y-4) */}
                <div className="space-y-4 pt-4">
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleActionClick(project, 'learn')}
                      className={`flex-1 py-2.5 rounded-[1rem] font-semibold text-sm transition-colors border ${
                        project.hasLearn
                          ? 'bg-[#0F172A] text-white border-transparent hover:bg-black shadow-sm'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] hover:bg-[#F1F5F9]' // True greyed out state
                      }`}
                    >
                      Learn
                    </button>
                    <button
                      onClick={() => handleActionClick(project, 'build')}
                      className={`flex-1 py-2.5 rounded-[1rem] font-semibold text-sm transition-colors border ${
                        project.hasBuild
                          ? 'bg-[#0F172A] text-white border-transparent hover:bg-black shadow-sm'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] hover:bg-[#F1F5F9]' // True greyed out state
                      }`}
                    >
                      Build
                    </button>
                  </div>

                  {/* Progress Bar Area */}
                  <div>
                    <div className="flex justify-end mb-2">
                      <span className={`text-xs font-bold ${project.isComplete ? 'text-[#34C759]' : 'text-[#34C759]'}`}>
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#E5E5EA] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#34C759] transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-xs font-medium text-[#94A3B8]">
                    Date of last opened: {new Date(project.lastAccessed).toLocaleDateString(undefined, { 
                      year: 'numeric', month: 'short', day: 'numeric' 
                    })}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* The Apple-Style Confirmation Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/10 backdrop-blur-sm"
              onClick={() => setModal({ ...modal, isOpen: false })}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl flex flex-col"
            >
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                Generate {modal.type === 'learn' ? 'Learn' : 'Build'} Data?
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed mb-8">
                The {modal.type} pipeline hasn't been run for <span className="font-semibold text-[#0F172A]">{modal.projectName}</span> yet. Would you like to initialize the AI analysis now?
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setModal({ ...modal, isOpen: false })}
                  className="flex-1 py-3.5 rounded-xl font-semibold text-[#64748B] bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmGeneration}
                  className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-[#0F172A] hover:bg-black transition-colors"
                >
                  Generate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}