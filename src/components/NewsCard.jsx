import { useEffect, useState } from "react";

const NewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=4bce5e20d60c4de38f48b627175fd361",
        );
        const data = await response.json();
        console.log(data);
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading News.....</p>
      ) : articles.length > 0 ? (
        articles.map((article) => (
          <div
            className="card w-full bg-white shadow-md rounded-lg overflow-hidden"
            key={article.url}>
            <img src={article.urlToImage} alt={article.title} />
            <div className="card-content">
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <p>Published: {new Date(article.publishedAt).toLocaleString()}</p>
              <p>Source: {article.source?.name || "Unknown"}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No news articles found.</p>
      )}
    </>
  );
};

export default NewsCard;
