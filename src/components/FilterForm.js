import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';

const FilterForm = ({ setSearchTerm, resetFilters }) => {
  const [search, setSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const { articles } = useArticles();

  // Extract unique authors from articles
  const authors = [...new Set(articles.map(article => article.author).filter(author => author))];

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm({ search, selectedAuthor });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedAuthor('');
    resetFilters();
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow">
      <input
        type="text"
        placeholder="Search articles..."
        className="flex-grow-0 flex-shrink w-2/4 p-2 m-1 rounded border border-gray-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="w-1/4 m-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
      <select
  value={selectedAuthor}
  onChange={(e) => setSelectedAuthor(e.target.value)}
  className="w-1/4 m-1 p-2 border border-gray-300 rounded text-gray-900 bg-white dark:text-white dark:bg-gray-700"
>
  <option value="">All Authors</option>
  {authors.map((author, index) => (
    <option key={index} value={author}>{author}</option>
  ))}
</select>
      <button
        onClick={handleReset}
        className="w-1/4 m-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterForm;
