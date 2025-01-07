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
  const id1 = searchParams.get("id1");
  const id2 = searchParams.get("id2");

  const fetchListings = useCallback(async () => {
    try {
      if (!id1 || !id2) {
        console.error("Missing listing IDs");
        return;
      }

      const baseURL = "http://localhost:5001";
      const [response1, response2] = await Promise.all([
        axios.get(`${baseURL}/find/${id1}`),
        axios.get(`${baseURL}/find/${id2}`),
      ]);

      setListing1(response1.data);
      setListing2(response2.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }, [id1, id2]);

  useEffect(() => {
    if (id1 && id2) {
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
