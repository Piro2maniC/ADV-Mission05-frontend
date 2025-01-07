import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "./compare.module.css";

const ComparePage = () => {
  const [listing1, setListing1] = useState(null);
  const [listing2, setListing2] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title1 = searchParams.get("title1");
  const title2 = searchParams.get("title2");

  const fetchListings = async () => {
    try {
      if (!title1 || !title2) {
        console.error("Missing listing titles");
        return;
      }

      const baseURL = "http://localhost:5001"; // Changed from 5000 to 5001
      console.log(
        "Fetching from URLs:",
        `${baseURL}/find?search=${encodeURIComponent(title1)}`,
        `${baseURL}/find?search=${encodeURIComponent(title2)}`
      );

      const [response1, response2] = await Promise.all([
        axios.get(`${baseURL}/find?search=${encodeURIComponent(title1)}`),
        axios.get(`${baseURL}/find?search=${encodeURIComponent(title2)}`),
      ]);

      if (response1.data.length > 0) setListing1(response1.data[0]);
      if (response2.data.length > 0) setListing2(response2.data[0]);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [title1, title2]);

  const renderListingCard = (listing) => {
    if (!listing) return <div>Loading...</div>;

    return (
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h2 className={styles.cardTitle}>{listing.title}</h2>
          <div className={styles.cardText}>
            <strong>Description:</strong> {listing.description}
            <br />
            <strong>Start Price:</strong> ${listing.start_price}
            <br />
            <strong>Reserve Price:</strong> ${listing.reserve_price}
          </div>
          <Link to={`/search`} className={styles.button}>
            View All Listings
          </Link>
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
