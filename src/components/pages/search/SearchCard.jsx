import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/SearchCard.module.css';
import WatchlistIcon from "../../../assets/addToWatchlist.png"; 
import defaultImage from "../../../assets/placeholder.png";
import compareIcon from '../../../assets/Compare icon.png';
import shippingIcon from '../../../assets/Truck.png';
import deliveryIcon from '../../../assets/Delivered.png';

export default function SearchCard({ 
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
        _id
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

  // Extract city from location string format "City, Country")
  const getCity = (location) => {
    if (!location) return '';
    const parts = location.split(',');
    return parts[0].trim(); // Return just the city part
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
        <div className={styles.locationAndTime}>
        <p className={styles.location}>{getCity(location)}</p>
        <p className={styles.timeRemaining}>{timeRemaining}</p></div>
        <h3>{title}</h3>
        <div className={styles.shippingInfo}>
          <img src={shippingIcon} alt="" className={styles.infoIcon} />
          <p className={styles.shipping}>$18 shipping to Auckland</p>
        </div>
        <div className={styles.shippingInfo}>
          <img src={deliveryIcon} alt="" className={styles.infoIcon} />
          <p className={styles.shipping}>Expected delivery 3-5 business days </p>
        </div>
        <div className={styles.compareAndBuyNow}>
        <button
          className={`${styles.compareButton} ${isCompared ? styles.compared : ''} ${isCompareDisabled && !isCompared ? styles.disabled : ''}`}
          onClick={handleCompareClick}
          disabled={isCompareDisabled && !isCompared}
        >
          <img src={compareIcon} alt="" className={styles.compareIcon} />
          {isCompared ? 'Remove' : 'Add to compare'}
        </button>
        {buy_now_price && (
          <button 
            className={styles.buyNowButton}
            onClick={handleBuyNow}
          >
            Buy Now <br /> <span className={styles.buyNowPrice}>${buy_now_price.toFixed(2)}</span>
          </button>
         
        )}
         </div>
      </div>
    </div>
  );
}
