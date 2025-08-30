import React, { useEffect, useState } from "react";
import StateMessage from "../components/stateMesagge";

const News = () => {
  const fetchNews = async () => {
    // const response = await fetch("http://localhost:3000/api/news");
    const response = await fetch("http://localhost:3000/api/news/");
    const news = response.json();
    console.log(news) 
    return news
  }
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetchNews().then(setNews);
  }, []);
    const renderNews = (newsArray) => {
    if(newsArray.message){
      return (<StateMessage message= "No hay noticias que mostrar"/>)}
    return(
      
      newsArray.map(
        item => (
        <div key={item.news_id} className="row justify-content-center pt-3 pb-3">
        <div className="col-md-8">
          <div className="bg-white rounded-4 shadow-lg p-4">
            <h1 className="text-center mb-3">{item.title}</h1>
            <hr className="my-3" />
            <p className="text-center mb-0">{item.content}</p>
          </div>
        </div>
      </div>          
        )
      )            
    )
  }
  return(
  <div
    className="container-fluid"
    style={{
      minHeight: "80vh",
      position: "relative",
      backgroundImage: "url('../thumb-1920-1042582.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    <div
      className="container-lg justify-content-center"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
        {news.length < 1 ? (
  <StateMessage message= "No se encontraron noticias"/>
) : (
  
  renderNews(news)
)}
    </div>
  </div>
)};

export default News;