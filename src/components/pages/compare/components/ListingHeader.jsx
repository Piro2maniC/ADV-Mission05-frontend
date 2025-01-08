import React from "react";
import styles from "./ListingHeader.module.css";
import groupIcon from "../../../../assets/Group.png";

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
      <div className={styles.location}>{listing.location}</div>
      <h2 className={styles.title}>{listing.title}</h2>
      <div className={styles.closing_date}>Closes: {listing.closing_date}</div>
      <div className={styles.stats}>
        <div>{listing.views || 0} Views</div>
        <div className={styles.watchlistContainer}>
          <img src={groupIcon} alt="Group" className={styles.groupIcon} />
          <span>{listing.watchlist} others watchlisted</span>
        </div>
        <div>Share</div>
      </div>
    </div>
  );
};

export default ListingHeader;
