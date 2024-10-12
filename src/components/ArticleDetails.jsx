import { useParams, useLocation, Link } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{article.description}</p>
          <p className="text-sm text-gray-500">
            Source:
            <span className="font-semibold">
              {article.source|| "Unknown"}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Author: 
            <span className="font-semibold">
              {article.author|| "Unknown"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Published: {new Date(article.published_at).toLocaleString()}
          </p>
          <div className="detailsLink flex justify-between">
            <Link
              to="/"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Back to Home
            </Link>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">
              Read Full Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
