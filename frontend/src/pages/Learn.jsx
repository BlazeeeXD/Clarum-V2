import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { storage } from '../lib/storage'; 
import LoadingText, { TOTAL_LOADING_TIME } from '../components/LoadingText';

import MissionBrief from '../components/learn/MissionBrief';
import SystemBlueprint from '../components/learn/SystemBlueprint';
import GettingStarted from '../components/learn/GettingStarted';

export default function Learn({ setActiveProject }) {
  const { id } = useParams();
  const location = useLocation();
  
  const fromInput = location.state?.fromInput;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      const startTime = Date.now();
      
      try {
        const data = await api.getProject(id);
        const learnData = data.learn_data || await api.analyzeLearn(id);
        
        setReport(learnData);
        setActiveProject(id);

        const saved = storage.loadProgress(id);
        if (saved) {
          storage.saveProgress(id, saved.currentStep, saved.completedSteps, saved.os);
        } else {
          storage.saveProgress(id, 0, [], 'Windows');
        }

        if (fromInput) {
          const elapsed = Date.now() - startTime;
          const remainingTime = TOTAL_LOADING_TIME - elapsed;
          
          if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime));
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load architecture data. Please try again.');
        setLoading(false);
      }
    }
    fetchProject();
  }, [id, setActiveProject, fromInput]);

  if (loading) return <LoadingText />;
  
  if (error) return <div className="text-[#FF3B30] text-center mt-20 font-bold tracking-wide">{error}</div>;

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#F5F5F7]">
      <MissionBrief report={report} />
      <SystemBlueprint report={report} />
      <GettingStarted report={report} />
    </div>
  );
}