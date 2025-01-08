import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../../styles/listing.module.css';
import defaultImage from '../../../assets/placeholder.png';

export default function Listing() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {

    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/auction-items/${id}`);
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  useEffect(() => {
    if (!listing) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const closing = new Date(listing.closing_date);
      const diffMs = closing - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (diffMs < 0) {
        setTimeRemaining('Auction ended');
        return;
      }

      if (diffDays > 0) {
        const date = closing.toLocaleDateString('en-NZ', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });
        setTimeRemaining(`Closes ${date}`);
      } else {
        setTimeRemaining(`${diffHours}h ${diffMinutes}m left`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000);

    return () => clearInterval(interval);
  }, [listing]);

  const handleBid = async (e) => {
    e.preventDefault();
    const bidAmount = e.target.elements[0].value;
    try {
      const response = await fetch(`http://localhost:5000/api/auction-items/${id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bid_amount: parseFloat(bidAmount) }),
      });
      if (response.ok) {
        const updatedListing = await response.json();
        setListing(updatedListing);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auction-items/${id}/buy-now`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedListing = await response.json();
        setListing(updatedListing);
      }
    } catch (error) {
      console.error('Error processing buy now:', error);
    }
  };

  if (!listing) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src={imageError ? defaultImage : listing.image_url}
          alt={listing.title}
          onError={() => setImageError(true)}
          className={styles.mainImage}
        />
      </div>
      
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{listing.title}</h1>
        <p className={styles.location}>{listing.location}</p>
        <p className={styles.timeRemaining}>{timeRemaining}</p>
        
        <div className={styles.bidSection}>
          <div className={styles.currentBid}>
            <h3>Current Bid</h3>
            <p className={styles.price}>${listing.current_bid}</p>
          </div>
          
          <div className={styles.reserveStatus}>
            <h3>Reserve Price</h3>
            <p className={styles.price}>${listing.reserve_price}</p>
            <p className={`${styles.status} ${listing.current_bid >= listing.reserve_price ? styles.met : styles.notMet}`}>
              {listing.current_bid >= listing.reserve_price ? 'Reserve met' : 'Reserve not met'}
            </p>
          </div>
        </div>

        <form className={styles.bidForm} onSubmit={handleBid}>
          <input
            type="number"
            min={listing.current_bid + 1}
            step="1"
            placeholder={`Enter bid amount (min $${listing.current_bid + 1})`}
            className={styles.bidInput}
            required
          />
          <button type="submit" className={styles.bidButton}>Place Bid</button>
        </form>

        {listing.buy_now_price && (
          <button 
            className={styles.buyNowButton}
            onClick={handleBuyNow}
          >
            Buy Now: ${listing.buy_now_price}
          </button>
        )}

        <div className={styles.description}>
          <h3>Description</h3>
          <p>{listing.description}</p>
        </div>

        <div className={styles.sellerInfo}>
          <h3>Seller Information</h3>
          <p>{listing.seller_info}</p>
        </div>
      </div>
    </div>
  );
}
