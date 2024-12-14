// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ArticleProvider } from './context/ArticleContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <ArticleProvider>
      <ThemeProvider>
      <App />
      </ThemeProvider>
      </ArticleProvider>
    </AuthProvider>
  </React.StrictMode>
);
