import React from "react";
import styles from "./ItemDescription.module.css";

const ItemDescription = ({ listing }) => {
  return (
    <div className={styles.descriptionContainer}>
      <h4 className={styles.heading}>Quick Overview</h4>
      <div className={styles.description}>{listing.description}</div>
      <button className={styles.fullListingButton}>See Full Listing</button>
    </div>
  );
};

export default ItemDescription;
