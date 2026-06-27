// src/lib/storage.js

export const storage = {
  saveProgress: (projectId, currentStep, completedSteps, os) => {
    const data = { currentStep, completedSteps, os, lastAccessed: new Date().toISOString() };
    localStorage.setItem(`clarum_project_${projectId}`, JSON.stringify(data));
  },

  loadProgress: (projectId) => {
    const data = localStorage.getItem(`clarum_project_${projectId}`);
    return data ? JSON.parse(data) : null;
  },

  getAllProjects: () => {
    const projects = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('clarum_project_')) {
        const projectId = key.replace('clarum_project_', '');
        projects.push({ projectId, ...JSON.parse(localStorage.getItem(key)) });
      }
    }
    return projects.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
  }
};