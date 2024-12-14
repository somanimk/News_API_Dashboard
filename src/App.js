import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashBoard';
import AuthorDashboard from './components/AuthorDashboard';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Footer from './components/Footer'; 

import './index.css';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/author-dashboard" element={<AuthorDashboard />} />
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;

