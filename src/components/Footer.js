import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white text-center p-4 ">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} News Dashboard.</p>
        <p>Mayank Somani | 8302170029 | mayank06011999@gmail.com </p>
      </div>
    </footer>
  );
};

export default Footer;
