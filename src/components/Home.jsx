import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { useParams } from "react-router-dom"; // Import useParams hook
import Shimmer from "./Shimmer";
const Home = () => {
  let { category } = useParams(); // Destructure category from useParams
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  if (category === undefined) {
    category = "general";
  }
  useEffect(() => {
    fetchData();
  }, [page, category]); //  this is used to reload the page when we change the page number or change the category

  useEffect(() => {
    setPage(1); // Reset page to 1 when category changes  
  }, [category]);


  // fetching the api using axios 
  const fetchData = async () => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=e3903e052cec486ea21e57ba83957028`
      );
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  
  // i using shimmer Ui for better user experience just like you tube during the time required for fetch the data from API
  if (loading) return <Shimmer />;
  // if any error occur than error display on UI
  if (error) return <p className="flex">Error fetching data: {error.message}</p>;

  // i filtered the articles based on the image url because some news image url not given in data do i filter out that news 
  const filteredArticles = articles.filter((article) => article.urlToImage);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      {filteredArticles.length !== 0 ? (
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
          Top News Headlines
        </h1>
      ) : (
        <div></div>
      )}
      
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {filteredArticles.length === 0 ? (
          <div className="font-bold text-lg sm:text-2xl lg:text-3xl text-center">
            Sorry! No more articles available. Check back later!
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))
        )}
      </div>
      <div className="flex gap-5 mt-10 md:mt-20">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="border p-2 w-20 font-bold bg-slate-300 rounded-md hover:scale-95"
          >
            Back
          </button>
        )}
        {filteredArticles.length !== 0 && (
          <button
            className="border p-2 w-20 font-bold bg-slate-300 rounded-md hover:scale-95"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;