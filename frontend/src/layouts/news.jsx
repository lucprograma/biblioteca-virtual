import React, { useEffect, useState } from "react";

const News = () => {
  const fetchNews = async () => {
    // const response = await fetch("http://localhost:3000/api/news");
    const news = [
      {
        news_id: 1,
        title: "dsaafs",
        content: "ldksafja"
      },
      {
        news_id: 2,
        title: "dsaafs",
        content: "ldksafja"

      }
    ];
    return news
  }
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetchNews().then(setNews);
  }, []);
    const renderNews = (news) => {
    console.table(news)
    return(
      news.map(
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
        {news.length === 0 ? (
  <div className="col-12 d-flex justify-content-center pb-5 pt-5">
    <div
      style={{
        width: '100%',
        backgroundColor: '#f0f0f0ff', // gris claro
        borderRadius: '12px',       // bordes redondeados
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      no se han encontrado documentos
    </div>
  </div>
) : (
  
  renderNews(news)
)}
    </div>
  </div>
)};

export default News;