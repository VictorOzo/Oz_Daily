import NewsCard from "./NewsCard";

const NewsList = () => {
  return (
    <div>
      <h2>News Around the world.</h2>
      <div className="news flex">
        <NewsCard />
      </div>
    </div>
  );
};

export default NewsList;
