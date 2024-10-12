import { useParams, useLocation } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams(); // Get the news ID from the URL
  const location = useLocation(); // Use location to get the full article details from the state

  // Get the news article passed via state from the NewsList component
  const article = location.state?.article;

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="article-details">
      <h1>{article.title}</h1>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-96 object-cover"
      />
      <p>{article.content}</p>
      <p>Source: {article.source?.name || "Unknown"}</p>
      <p>Published: {new Date(article.publishedAt).toLocaleString()}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>
    </div>
  );
};

export default ArticleDetails;
