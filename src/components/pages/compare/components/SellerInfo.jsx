import React from "react";
import styles from "./SellerInfo.module.css";

const SellerInfo = ({ listing }) => {
  return (
    <div className={styles.sellerContainer}>
      <h3>Seller Information</h3>
      <div className={styles.sellerDetails}>
        <div>Seller: {listing.seller_name || "Anonymous"}</div>
        <div>Location: {listing.location}</div>
        <div>Rating: {listing.seller_rating || "N/A"}</div>
        <button className={styles.contactButton}>Contact Seller</button>
      </div>
    </div>
  );
};

export default SellerInfo;
