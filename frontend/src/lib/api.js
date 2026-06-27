// src/lib/api.js
const API_BASE = 'https://clarum-v2.onrender.com';

export const api = {
  createRepository: async (url) => {
    const res = await fetch(`${API_BASE}/repositories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error('Failed to clone repository');
    return res.json();
  },

  analyzeLearn: async (id) => {
    const res = await fetch(`${API_BASE}/analyze/learn/${id}`, { method: 'POST' });
    if (!res.ok) throw new Error('Learn analysis failed');
    return res.json();
  },

  analyzeBuild: async (id) => {
    const res = await fetch(`${API_BASE}/analyze/build/${id}`, { method: 'POST' });
    if (!res.ok) throw new Error('Build analysis failed');
    return res.json();
  },

  getProject: async (id) => {
    const res = await fetch(`${API_BASE}/project/${id}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  }
};