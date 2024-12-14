// src/components/Header.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <header className={`bg-blue-500 text-white p-4 text-center flex justify-between items-center ${theme}`}>
      <span className="text-3xl font-bold">News Dashboard</span>
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="flex items-center w-10 h-12 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          aria-label="Toggle dark/light mode"
        >
          {theme === 'dark' ? (
            <svg className="w-1px h-1px" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0-11a1 1 0 001-1V1a1 1 0 10-2 0v2a1 1 0 001 1zm0 12a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zM4.343 5.757a1 1 0 001.414-1.414L4.343 2.929a1 1 0 00-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414ZM4 10a1 1 0 00-1-1H1a1 1 0 100 2h2a1 1 0 001-1Zm15-1h-2a1 1 0 10 0 2h2a1 1 0 000-2ZM4.343 14.243l-1.414 1.414a1 1 0 101.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414ZM14.95 6.05a1 1 0 00.707-.293l1.414-1.414a1 1 0 10-1.414-1.414l-1.414 1.414a1 1 0 00.707 1.707Z" />
            </svg>
          ) : (
            <svg className="w-1px h-1px" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.8 13.75a1 1 0 00-.859-.5A7.488 7.488 0 0010.52 2a1 1 0 000-.969A1.035 1.035 0 009.687.5h-.113a9.5 9.5 0 108.222 14.247 1 1 0 00.004-.997Z" />
            </svg>
          )}
          <span className="sr-only">Toggle dark/light mode</span>
        </button>
        {!isLoginPage && (
          <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
