import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
        );
        const data = await response.json();
        console.log(data);
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiKey]);

  return (
    <>
      {isLoading ? (
        <p className="text-center">Loading News.....</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : articles.length > 0 ? (
        articles.map((article, index) => (
          <Link
            to={`/news/${index}`} // Dynamic route using index or a unique key (like id)
            state={{ article }} // Pass the article data to the next component
            key={article.url || index}>
            <div className="card w-full bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="card-content p-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-gray-700">
                  {article.content?.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-500">
                  Published: {new Date(article.publishedAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Source: {article.source?.name || "Unknown"}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No news articles found.</p>
      )}
    </>
  );
};

export default NewsCard;
