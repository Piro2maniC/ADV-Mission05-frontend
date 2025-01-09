/**
 * SearchCard Component
 * Displays an individual auction item in either grid or list view.
 * Features include:
 * - Image display with loading/error states
 * - Watchlist functionality
 * - Reserve status indication
 * - Current bid display
 * - Compare functionality
 * - Buy Now option
 * - Shipping information
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/SearchCard.module.css';
import compareIcon from '../../../assets/Compare icon.png';
import defaultImage from '../../../assets/placeholder.png';
import WatchlistIcon from '../../../assets/addToWatchlist.png';
import shippingIcon from '../../../assets/Truck.png';
import deliveryIcon from '../../../assets/Delivered.png';

/**
 * SearchCard Component
 * @param {Object} props - Component props
 * @param {string} props._id - Unique identifier for the auction item
 * @param {string} props.image_url - URL of the item's image
 * @param {string} props.location - Location of the item (city only)
 * @param {string} props.closing_date - Auction end date
 * @param {string} props.closing_time - Auction end time
 * @param {string} props.title - Item title/name
 * @param {number} props.reserve_price - Minimum price that must be met
 * @param {number} props.current_bid - Current highest bid
 * @param {number} props.buy_now_price - Price for immediate purchase
 * @param {function} props.onCompare - Callback for compare functionality
 * @param {boolean} props.isCompareDisabled - Whether compare button should be disabled
 * @param {string} props.viewMode - Current view mode ('grid' or 'list')
 */
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
  isCompareDisabled,
  viewMode
}) {
  // Navigation hook for routing
  const navigate = useNavigate();

  // State management for UI elements
  const [isCompared, setIsCompared] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  /**
   * Image preloading effect
   * Handles loading and error states for the item's image
   */
  useEffect(() => {
    // Create new image object for preloading
    const img = new Image();
    img.src = image_url;
    
    // Handle successful image load
    img.onload = () => {
      setIsImageLoading(false);
      setImageError(false);
    };
    
    // Handle image load failure
    img.onerror = () => {
      console.error('Failed to load image:', image_url);
      setIsImageLoading(false);
      setImageError(true);
    };
  }, [image_url]);

  /**
   * Formats the time remaining until auction close
   * @param {string} closingDate - The auction's closing date
   * @returns {string} Formatted time remaining string
   */
  const formatTimeRemaining = (closingDate) => {
    const now = new Date();
    const closing = new Date(closingDate);
    const diffMs = closing - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Handle expired auctions
    if (diffMs < 0) {
      return 'Auction ended';
    }

    // Format display based on time remaining
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

  /**
   * Updates the time remaining display
   * Runs every minute to keep the countdown current
   */
  useEffect(() => {
    const updateTimeRemaining = () => {
      setTimeRemaining(formatTimeRemaining(closing_date));
    };

    // Initial update
    updateTimeRemaining();
    
    // Set up interval for regular updates
    const interval = setInterval(updateTimeRemaining, 60000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [closing_date]);

  /**
   * Handles clicks on the compare button
   * @param {Event} e - Click event object
   */
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

  /**
   * Handles Buy Now button clicks
   * @param {Event} e - Click event object
   */
  const handleBuyNow = (e) => {
    e.preventDefault();
    // TODO: Implement buy now functionality
    alert(`Buy Now clicked! Price: $${buy_now_price}`);
  };

  /**
   * Handles clicks on the card itself
   * Navigates to the item's detailed view unless clicking buttons
   * @param {Event} e - Click event object
   */
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
    <div 
      className={`${styles.card} ${viewMode === 'list' ? styles.listView : ''}`}
      onClick={handleCardClick}
    >
      {/* Watchlist Icon */}
      <img src={WatchlistIcon} alt="Watchlist Icon" className={styles.watchlistIcon} />

      {/* Image Container with Loading States */}
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

      {/* Content Container */}
      <div className={styles.content}>
        {viewMode === 'list' ? (
          // List View Location and Time
          <div className={styles.locationTimeContainer}>
            <div className={styles.shippingInfo}>
              <p className={styles.shipping}>{getCity(location)}</p>
            </div>
            {timeRemaining && (
              <>
                <span className={styles.separator}>|</span>
                <div className={styles.timeRemaining}>{timeRemaining}</div>
              </>
            )}
          </div>
        ) : (
          // Grid View Location and Time
          <div className={styles.locationAndTime}>
            <p className={styles.location}>{getCity(location)}</p>
            <p className={styles.timeRemaining}>{timeRemaining}</p>
          </div>
        )}

        {/* Item Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Shipping Information */}
        <div className={styles.shippingInfo}>
          <img src={shippingIcon} alt="" className={styles.infoIcon} />
          <p className={styles.shipping}>$18 shipping to Auckland</p>
        </div>
        <div className={styles.shippingInfo}>
          <img src={deliveryIcon} alt="" className={styles.infoIcon} />
          <p className={styles.shipping}>Expected delivery 3-5 business days </p>
        </div>

        {/* Compare and Buy Now Section */}
        <div className={styles.compareAndBuyNow}>
          <button
            className={`${styles.compareButton} ${isCompared ? styles.compared : ''} ${isCompareDisabled && !isCompared ? styles.disabled : ''}`}
            onClick={handleCompareClick}
            disabled={isCompareDisabled && !isCompared}
          >
            <img src={compareIcon} alt="" className={styles.compareIcon} />
            {isCompared ? 'Remove' : 'Add to compare'}
          </button>

          {viewMode === 'list' ? (
            // List View Reserve Status and Bid
            <div className={styles.reserveAndBid}>
              <div className={styles.reserveStatus}>
                {current_bid >= reserve_price ? (
                  <span className={styles.reserveMet}>Reserve met</span>
                ) : (
                  <span className={styles.reserveNotMet}>Reserve not met</span>
                )}
              </div>
              <div className={styles.bidAmount}>
                ${current_bid ? current_bid.toFixed(2) : '0.00'}
              </div>
            </div>
          ) : (
            // Grid View Buy Now Button
            buy_now_price && (
              <button 
                className={styles.buyNowButton}
                onClick={handleBuyNow}
              >
                Buy Now <br /> <span className={styles.buyNowPrice}>${buy_now_price.toFixed(2)}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
