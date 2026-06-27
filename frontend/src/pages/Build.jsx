import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { storage } from '../lib/storage';
import LoadingText, { TOTAL_LOADING_TIME } from '../components/LoadingText';

import BuildOverview from '../components/build/BuildOverview';
import BuildSandbox from '../components/build/BuildSandbox';
import BuildSuccess from '../components/build/BuildSuccess';

export default function Build({ setActiveProject }) {
  const { id } = useParams();
  const location = useLocation();
  const fromInput = location.state?.fromInput;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saved = storage.loadProgress(id);
  const [currentStep, setCurrentStep] = useState(saved?.currentStep ?? 0);
  const [completedSteps, setCompletedSteps] = useState(saved?.completedSteps ?? []);
  const [os, setOs] = useState(saved?.os ?? 'Windows');
  const [copied, setCopied] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      const startTime = Date.now();
      try {
        const data = await api.getProject(id);
        let buildData = data.build_data || await api.analyzeBuild(id);

        if (typeof buildData === 'string') {
          try {
            buildData = JSON.parse(buildData);
          } catch (e) {
            console.error('Critical: Build data is a malformed string', e);
          }
        }

        setReport(buildData);
        setActiveProject(id);

        if (!saved) {
          storage.saveProgress(id, 0, [], 'Windows');
        }

        if (fromInput) {
          const elapsed = Date.now() - startTime;
          const remaining = TOTAL_LOADING_TIME - elapsed;
          if (remaining > 0) await new Promise(r => setTimeout(r, remaining));
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load build instructions.');
        setLoading(false);
      }
    }
    fetchProject();
  }, [id, setActiveProject, fromInput]);

  // Persist step + os changes
  useEffect(() => {
    if (report) storage.saveProgress(id, currentStep, completedSteps, os);
  }, [currentStep, completedSteps, os]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompleteStep = () => {
    if (!report) return;
    const isLastStep = currentStep === report.steps.length - 1;
    const alreadyDone = completedSteps.includes(currentStep);

    if (isLastStep && alreadyDone) {
      setShowSuccessPage(true);
      return;
    }

    const updated = alreadyDone
      ? completedSteps.filter(s => s !== currentStep)
      : [...completedSteps, currentStep];

    setCompletedSteps(updated);

    if (!alreadyDone && !isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (loading) return <LoadingText />;
  if (error) return <div className="text-[#FF3B30] text-center mt-20 font-bold">{error}</div>;
  if (showSuccessPage) return <BuildSuccess report={report} />;

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#F5F5F7]">
      <BuildOverview report={report} />
      <BuildSandbox
        report={report}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        completedSteps={completedSteps}
        handleCompleteStep={handleCompleteStep}
        os={os}
        setOs={setOs}
        copied={copied}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}