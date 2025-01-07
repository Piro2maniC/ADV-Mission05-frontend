import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./compare.module.css";

const ComparePage = () => {
  const [listing1, setListing1] = useState(null);
  const [listing2, setListing2] = useState(null);

  const fetchListings = async () => {
    try {
      const response1 = await axios.get("/api/listings/1");
      const response2 = await axios.get("/api/listings/2");

      setListing1(response1.data);
      setListing2(response2.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const renderListingCard = (listing) => {
    if (!listing) return <div>Loading...</div>;

    return (
      <div className={styles.card}>
        <img
          className={styles.cardImage}
          src={listing.photos[0] || "placeholder-image.jpg"}
          alt={listing.title}
        />
        <div className={styles.cardBody}>
          <h2 className={styles.cardTitle}>{listing.title}</h2>
          <div className={styles.cardText}>
            <strong>Location:</strong> {listing.location}
            <br />
            <strong>Buy Now Price:</strong> ${listing.buyNowPrice}
            <br />
            <strong>Current Bid:</strong> ${listing.currentBid}
            <br />
            <strong>Time Remaining:</strong> {listing.timeRemaining}
          </div>
          <button className={styles.button}>View Full Listing</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Link to="/search" className={styles.backButton}>
          Back to Search
        </Link>
        <h1 className={styles.title}>Compare Listings</h1>
      </div>
      <div className={styles.row}>
        {renderListingCard(listing1)}
        {renderListingCard(listing2)}
      </div>
    </div>
  );
};

export default ComparePage;
