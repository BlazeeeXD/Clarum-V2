import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', base: '/' },
    { label: 'Learn', path: '/learn/input', base: '/learn' },
    { label: 'Build', path: '/build/input', base: '/build' },
    { label: 'My Projects', path: '/projects', base: '/projects' },
  ];

  return (
    <nav className="bg-clarum-card px-8 py-3 rounded-full shadow-apple flex items-center space-x-12">
      {navItems.map((item) => {
        const isActive = item.base === '/' 
          ? location.pathname === '/' 
          : location.pathname.startsWith(item.base);
        
        return (
          <NavLink
            key={item.label}
            to={item.path}
            className={`text-sm font-medium tracking-wide transition-colors duration-200 outline-none ${
              isActive ? "text-clarum-text" : "text-clarum-subtext hover:text-clarum-text"
            }`}
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}