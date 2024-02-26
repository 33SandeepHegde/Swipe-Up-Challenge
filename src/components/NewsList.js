import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import News from '../assets/News.json';
import Nav from './Nav';
const NewsList = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    setNews(News);
  }, []);

  return (
    <>
      <Nav />
      <div className='news-list'>

        {news.map((article, index) => (

          <div className="news-card" key={index}>
            <Link to={`/card-swipe/${index}`} className="news-link">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
              <div className="news-info">
                <p>{article.title}</p>
              </div>
            </Link>


          </div>
        ))}
      </div>
    </>
  )
}

export default NewsList