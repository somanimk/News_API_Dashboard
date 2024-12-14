import React, { useState } from 'react';

const ArticleTable = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);

  const formatTitle = (title) => {
    if (!title) return '';  
    const words = title.split(' ');
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
  };

  const formatAuthor = (author) => {
    if (!author) return '';  
    const names = author.split(' ');
    return names.slice(0, 2).join(' ') + (names.length > 2 ? '...' : '');
  };

  // Calculate the current articles to display
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Determine total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto relative shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Author</th>
            <th className="text-left p-4">Published At</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article, index) => (
            <tr key={index}>
              <td className="p-4">{formatTitle(article.title)}</td>
              <td className="p-4">{formatAuthor(article.author)}</td>
              <td className="p-4">{new Date(article.publishedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="py-2 flex justify-center items-center gap-0px">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`mx-1 px-3 py-1 rounded text-white ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`mx-1 px-3 py-1 rounded text-white ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default ArticleTable;
