/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clarum-bg': '#F5F5F7',      
        'clarum-card': '#FFFFFF',    
        'clarum-text': '#1D1D1F',    
        'clarum-subtext': '#86868B', 
        'clarum-accent': '#34C759',  
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"San Francisco"', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 4px 24px rgba(0, 0, 0, 0.04)', 
      }
    },
  },
  plugins: [],
}