import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ArticleContext = createContext(null);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const fromDate = yesterday.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    fetchArticles(fromDate);
  }, []);

  const fetchArticles = async (fromDate, attempt = 0) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'tesla',
          from: fromDate,
          sortBy: 'publishedAt',
          apiKey: '14aa1d4527af47158a89fb7b78b2d4f4'
        }
      });
      setArticles(response.data.articles);
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        if (attempt < 3) { // Retry up to 3 times with an exponential back-off
          setTimeout(() => fetchArticles(fromDate, attempt + 1), 2000 * (attempt + 1));
        } else {
          setError("Error: No response from server. Check your network connection.");
        }
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => useContext(ArticleContext);

export default ArticleProvider;
