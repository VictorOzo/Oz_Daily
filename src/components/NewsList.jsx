import NewsCard from "./NewsCard";

const NewsList = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold underline">News Around the world.</h1>
      <div className="news grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <NewsCard />
      </div>
    </div>
  );
};

export default NewsList;
