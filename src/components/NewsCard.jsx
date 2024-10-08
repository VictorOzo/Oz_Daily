import { useEffect, useState } from "react";

const NewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.thenewsapi.com/v1/news/all?api_token=YliZ6XCYv7RKIZNki8FUQosldRQCBIsKKETcnoYh&language=en&limit=3",
        );
        const data = await response.json();
        setArticles(data.data);
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
      ) : (
        articles.map((article) => (
          <div className="card w-[200px]" key={article.uuid}>
            <img src={article.image_url} />
            <div className="card-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>Published: {article.published_at}</p>
              <p>Categories: {article.categories}</p>
              <p>Source: {article.source}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default NewsCard;
