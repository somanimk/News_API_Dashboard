import React, { useState, useContext } from 'react';
import ArticleTable from './ArticleTable';
import PayoutTable from './PayoutTable';
import FilterForm from './FilterForm';
import ExportButtons from './ExportButtons';
import DashboardStats from './DashboardStats';
import AnalyticsCharts from './AnalyticsCharts';
import PayoutCalculator from './PayoutCalculator';
import { useArticles } from '../context/ArticleContext';
import { UserContext } from '../context/UserContext';  
import './dashboard.css';

const Dashboard = () => {
  const { articles, loading, error } = useArticles();
  const { user } = useContext(UserContext);  // Get user info from context
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

  // Filter only author's articles if logged in as an author
  const authorArticles = user.role === 'author' ? filteredArticles.filter(article => article.authorId === user.id) : filteredArticles;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-4">{user.role === 'admin' ? 'Admin Dashboard' : 'Author Dashboard'}</h1>
      <DashboardStats articles={authorArticles} />
      <div className="flex justify-between space-x-4">
        <AnalyticsCharts articles={authorArticles} />
      </div>
      <FilterForm setSearchTerm={handleSetSearchTerm} resetFilters={handleResetFilters} />
      <ArticleTable articles={authorArticles} />
      <div className="flex flex-row justify-between my-4">
        {user.role === 'admin' && (
          <div className="flex-1 p-4 rounded-lg bg-white">
            <PayoutCalculator articles={authorArticles} />
          </div>
        )}
        <div className="flex-1 p-4 rounded-lg bg-white">
          <PayoutTable articles={authorArticles} />
        </div>
        <div className="flex-1 p-4 rounded-lg bg-white">
          <ExportButtons />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
