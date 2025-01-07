import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./compare.module.css";
import ListingHeader from "./components/ListingHeader";
import BiddingInfo from "./components/BiddingInfo";
import ItemDescription from "./components/ItemDescription";
import SellerInfo from "./components/SellerInfo";

const ComparePage = () => {
  const [listing1, setListing1] = useState(null);
  const [listing2, setListing2] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title1 = searchParams.get("title1");
  const title2 = searchParams.get("title2");

  const fetchListings = useCallback(async () => {
    try {
      if (!title1 || !title2) {
        console.error("Missing listing titles");
        return;
      }

      const baseURL = "http://localhost:5001";
      const [response1, response2] = await Promise.all([
        axios.get(`${baseURL}/find?search=${encodeURIComponent(title1)}`),
        axios.get(`${baseURL}/find?search=${encodeURIComponent(title2)}`),
      ]);

      if (response1.data.length > 0) setListing1(response1.data[0]);
      if (response2.data.length > 0) setListing2(response2.data[0]);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }, [title1, title2]);

  useEffect(() => {
    if (title1 && title2) {
      fetchListings();
    }
  }, [fetchListings]);

  const renderListingCard = (listing) => {
    if (!listing) return <div>Loading...</div>;

    return (
      <div className={styles.card}>
        <ListingHeader listing={listing} />
        <BiddingInfo listing={listing} />
        <ItemDescription listing={listing} />
        <SellerInfo listing={listing} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Compare Listings</h1>
      <div className={styles.compareContainer}>
        <div className={styles.listingColumn}>
          {renderListingCard(listing1)}
        </div>
        <div className={styles.listingColumn}>
          {renderListingCard(listing2)}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
