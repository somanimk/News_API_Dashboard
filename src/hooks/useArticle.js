import { useState, useEffect } from 'react';
import axios from 'axios';

function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const today = new Date();
      const startDate = new Date('2024-12-01'); 
      const dateStringToday = today.toISOString().split('T')[0]; 
      const dateStringStart = startDate.toISOString().split('T')[0]; 

      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=${startDate}&to=${dateStringToday}&sortBy=popularity&apiKey=14aa1d4527af47158a89fb7b78b2d4f4`);
        setArticles(response.data.articles);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

export default useArticles;
