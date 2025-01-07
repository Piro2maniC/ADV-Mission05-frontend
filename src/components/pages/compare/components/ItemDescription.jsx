import React from "react";
import styles from "./ItemDescription.module.css";

const ItemDescription = ({ listing }) => {
  return (
    <div className={styles.descriptionContainer}>
      <h3>Item Description</h3>
      <div className={styles.description}>{listing.description}</div>
    </div>
  );
};

export default ItemDescription;
