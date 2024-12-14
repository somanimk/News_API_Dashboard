import React from 'react';

const DashboardStats = ({ articles }) => {
  return (
    <div className="stat flex justify-around p-4 bg-white shadow-md rounded-lg my-4 text-gray-800">
      <div className="stat-item">
        <p className="stat-title text-lg font-semibold">Total Articles</p>
        <p className="stat-value text-xl font-bold">{articles.length}</p>
      </div>
      <div className="stat-item">
        <p className="stat-title text-lg font-semibold">Total Authors</p>
        <p className="stat-value text-xl font-bold">{new Set(articles.map(article => article.author)).size}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
