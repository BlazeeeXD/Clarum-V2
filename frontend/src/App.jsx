import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import InputScreen from './pages/InputScreen';
import Learn from './pages/Learn';
import Build from './pages/Build';
import MyProjects from './pages/MyProjects';

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState(null);

  return (
    <Router>
      <div className="h-screen w-screen overflow-hidden bg-clarum-bg text-clarum-text">
        {/* Floating Navigation Pill - strictly fixed over the UI */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <Navigation/>
        </div>

        {/* Global Page Content Container - No padding, true full screen */}
        <main className="w-full h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/input" element={<InputScreen mode="learn" setActiveProject={setActiveProjectId} />} />
            <Route path="/build/input" element={<InputScreen mode="build" setActiveProject={setActiveProjectId} />} />
            <Route path="/learn/:id" element={<Learn setActiveProject={setActiveProjectId} />} />
            <Route path="/build/:id" element={<Build setActiveProject={setActiveProjectId} />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}