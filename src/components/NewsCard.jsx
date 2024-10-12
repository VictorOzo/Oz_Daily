import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  // Fetch news articles from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load news.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiKey]);

  // Filter the articles based on search, category, and source
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" || article.category?.toLowerCase() === category;
    const matchesSource = source === "all" || article.source?.name === source;

    return matchesSearch && matchesCategory && matchesSource;
  });

  return (
    <div className="">
      {/* Search and filter section */}
      <div className="mb-4 flex p-5">
        <input
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 mb-2 sm:mb-0 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mr-2 mb-2 sm:mb-0 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
        </select>

        {/* Source filter */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="mr-2 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Sources</option>
          {Array.from(new Set(articles.map((article) => article.source?.name)))
            .filter((source) => source)
            .map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
        </select>
      </div>

      {/* News Cards Grid */}
      {isLoading ? (
        <p className="text-center">Loading News.....</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {filteredArticles.map((article, index) => (
            <Link
              to={`/news/${index}`}
              state={{ article }}
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
          ))}
        </div>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
};

export default NewsList;
