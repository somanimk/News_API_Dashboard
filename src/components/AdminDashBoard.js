import React, { useState } from 'react';
import ArticleTable from './ArticleTable';
import PayoutTable from './PayoutTable';
import FilterForm from './FilterForm';
import ExportButtons from './ExportButtons';
import DashboardStats from './DashboardStats';
import AnalyticsCharts from './AnalyticsCharts';
import PayoutCalculator from './PayoutCalculator';
import { useArticles } from '../context/ArticleContext';
import './dashboard.css';

const AdminDashboard = () => {
  const { articles, loading, error } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({});

  const handleSetSearchTerm = (data) => {
    setSearchTerm(data.search);
    setFilter(data);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilter({});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter articles based on search term and author
  const filteredArticles = articles.filter(article =>
    (article.title ? article.title.toLowerCase().includes(searchTerm.toLowerCase()) : false) &&
    (filter.selectedAuthor ? article.author === filter.selectedAuthor : true)
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-4">Admin Dashboard</h1>
      <DashboardStats articles={filteredArticles} />
      <div className="flex justify-between space-x-4">
        <AnalyticsCharts articles={filteredArticles} />
      </div>
      <FilterForm setSearchTerm={handleSetSearchTerm} resetFilters={handleResetFilters} />
      <ArticleTable articles={filteredArticles} />
      <div className="flex flex-row justify-between my-4">
        <div className="stat flex-1 p-4 rounded-lg bg-white">
          <PayoutCalculator articles={filteredArticles} />
        </div>
        <div className="stat flex-1 p-4 rounded-lg bg-white">
          <PayoutTable articles={filteredArticles} />
        </div>
        <div className="stat flex-1 p-4 rounded-lg bg-white">
          <ExportButtons />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
