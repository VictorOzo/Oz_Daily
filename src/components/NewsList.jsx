import NewsCard from "./NewsCard";

const NewsList = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold underline p-4">News Around the world.</h1>
      <div className="news ">
        <NewsCard />
      </div>
    </div>
  );
};

export default NewsList;
