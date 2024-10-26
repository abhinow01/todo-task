// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Top Section with Background */}
        <div className="relative bg-blue-500 h-64 flex items-center justify-center">
          {/* Decorative Patterns */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-blue-600 rounded-full opacity-30"></div>
          <div className="absolute bottom-8 right-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12h18M3 16h18M3 8h18" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Bottom Section with Text */}
        <div className="p-6 text-center flex flex-col justify-between" >
          <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Manage What To Do</h2>
          <p className="text-gray-500 mb-6">The best way to manage what you have to do, don't forget your plans</p>
          </div>
          <div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors" onClick={() => navigate('/todo')}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
