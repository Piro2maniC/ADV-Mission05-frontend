import React from "react";
import styles from "./ListingHeader.module.css";

const ListingHeader = ({ listing }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.imageContainer}>
        {listing.image_url && (
          <img
            src={listing.image_url}
            alt={listing.title}
            className={styles.image}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image+Available";
            }}
          />
        )}
      </div>
      <h2 className={styles.title}>{listing.title}</h2>
      <div className={styles.stats}>
        <div>Time left: {listing.closing_time}</div>
        <div>Views: {listing.views || 0}</div>
        <button className={styles.watchlistButton}>Add to Watchlist</button>
      </div>
    </div>
  );
};

export default ListingHeader;
