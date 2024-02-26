import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import newsData from '../assets/News.json';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const index = parseInt(id); 
  const newsItem = newsData[index];
  const [showAlert, setShowAlert] = useState(false);
  const [randomNews, setRandomNews] = useState([]);
  const [startY, setStartY] = useState(null);
  //test
  const maxCards = 11;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false); 
    }, 1000);
    return () => clearTimeout(timeout);
  }, [showAlert]);
  useEffect(() => {
    generateRandomNews(index); 
  }, []);
  const generateRandomNews = (indexId) => {
    const selectedNews = newsData[indexId];

    if (selectedNews) {
      const randomSources = getRandomSources(selectedNews.source, 10);
      const newsWithSources = [selectedNews, ...randomSources];
      setRandomNews(newsWithSources);
    }
  };

  const getRandomSources = (selectedSource, count) => {
    const availableSources = newsData.filter((news) => news.source !== selectedSource);
    const shuffledSources = availableSources.sort(() => Math.random() - 0.5);
    return shuffledSources.slice(0, count);
  };
  const handlers = useSwipeable({
    onSwipedUp: () => handleSwipe('UP'),
    onSwipedDown: () => handleSwipe('DOWN'),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true
  });

  const handleSwipe = (direction) => {
    if (direction === 'UP' && currentIndex < randomNews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'DOWN' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    if (direction === 'UP' && currentIndex === randomNews.length - 1) {
      setShowAlert(true); 
    } else {
      setShowAlert(false);
    }
  };

  return (
    <div>
      <div className="swipe-cards" {...handlers}>
        {randomNews.map((card, index) => {
          const publishedDateString = card.publishedAt;
          const publishedDate = new Date(publishedDateString);
          const today = new Date();
          const timeDiff = today.getTime() - publishedDate.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
          return (
            <div
              key={index}
              className={`card ${index === currentIndex ? 'active' : ''}`}
              style={{
                backgroundColor: 'white',
                transition: 'transform 1s ease-in-out;',
                transform: index === currentIndex ? 'translateY(0)' : `translateY(-${Math.abs(index - currentIndex) * 100}%)`
              }}
            >

              <img className="car-img" src={card.urlToImage} alt="img-card" />
              <h2>{card.title}</h2>
              <div className="card-content">{card.description} </div>
              <p className='publisher'>Published by {card.source.name} {daysDiff > 1 ? <span>{daysDiff} days ago</span> : <span>a day ago</span>}</p>
              <div className="read" style={{ backgroundImage: `url(${card.urlToImage})` }}>
                <button className="read-more-button" onClick={() => { window.open(card.url, '_blank'); }}>Read More</button>
              </div>

            </div>
          )
        })}

      </div>
      {showAlert && (
        <div className="alert">
          You have reached the bottom!
        </div>
      )}
    </div>
  );
};

export default Card;
