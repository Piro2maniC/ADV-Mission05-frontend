import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Card.module.css';
import WatchlistIcon from "../../assets/addToWatchlist.png";
import defaultImage from "../../assets/placeholder.png";

export default function Card({ 
  _id,
  image_url, 
  location, 
  closing_date,
  closing_time, 
  title, 
  reserve_price,
  current_bid,
  buy_now_price, 
  onCompare,
  isCompareDisabled
}) {
  const navigate = useNavigate();
  const [isCompared, setIsCompared] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = image_url;
    img.onload = () => {
      setIsImageLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      console.error('Failed to load image:', image_url);
      setIsImageLoading(false);
      setImageError(true);
    };
  }, [image_url]);

  const formatTimeRemaining = (closingDate) => {
    const now = new Date();
    const closing = new Date(closingDate);
    const diffMs = closing - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffMs < 0) {
      return 'Auction ended';
    }

    if (diffDays > 0) {
      const date = closing.toLocaleDateString('en-NZ', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      return `Closes ${date}`;
    } else {
      return `${diffHours}h ${diffMinutes}m left`;
    }
  };

  useEffect(() => {
    const updateTimeRemaining = () => {
      setTimeRemaining(formatTimeRemaining(closing_date));
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000);

    return () => clearInterval(interval);
  }, [closing_date]);

  const handleCompareClick = (e) => {
    e.preventDefault();
    if (isCompareDisabled && !isCompared) return;
    
    setIsCompared(!isCompared);
    if (onCompare) {
      onCompare({
        image_url,
        location,
        closing_date,
        closing_time,
        title,
        reserve_price,
        current_bid,
        _id: Math.random().toString()
      });
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    // TODO: Implement buy now functionality
    alert(`Buy Now clicked! Price: $${buy_now_price}`);
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking compare or buy now buttons
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    navigate(`/listing/${_id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={WatchlistIcon} alt="Watchlist Icon" className={styles.watchlistIcon} />
      <div className={styles.imageContainer}>
        {isImageLoading && (
          <div className={styles.imagePlaceholder}>Loading...</div>
        )}
        <img 
          src={imageError ? defaultImage : image_url}
          alt={title}
          className={`${styles.picture} ${isImageLoading ? styles.hidden : ''}`}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.timeRemaining}>{timeRemaining}</p>
        <p className={styles.currentBid}>Current Bid: ${current_bid}</p>
        <p className={`${styles.reserveStatus} ${current_bid >= reserve_price ? styles.reserveMet : styles.reserveNotMet}`}>
          {current_bid >= reserve_price ? 'Reserve met' : 'Reserve not met'}
        </p>
        {buy_now_price && (
          <button 
            className={styles.buyNowButton}
            onClick={handleBuyNow}
          >
            Buy Now: ${buy_now_price}
          </button>
        )}
        <button
          className={`${styles.compareButton} ${isCompared ? styles.compared : ''} ${isCompareDisabled && !isCompared ? styles.disabled : ''}`}
          onClick={handleCompareClick}
          disabled={isCompareDisabled && !isCompared}
        >
          {isCompared ? 'Remove' : 'Compare'}
        </button>
      </div>
    </div>
  );
}
