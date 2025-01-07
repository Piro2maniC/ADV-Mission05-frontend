import React, { useState } from "react";
import styles from "./BiddingInfo.module.css";

const BiddingInfo = ({ listing }) => {
  const [bidAmount, setBidAmount] = useState("");

  return (
    <div className={styles.biddingContainer}>
      <div className={styles.priceInfo}>
        <div className={styles.buyNowSection}>
          <div>Buy Now Price: ${listing.buy_now_price || "N/A"}</div>
          <button className={styles.buyNowButton}>Buy Now</button>
          <button className={styles.cartButton}>Add to Cart</button>
        </div>

        <div className={styles.bidSection}>
          <div>Current Bid: ${listing.current_bid || listing.start_price}</div>
          <div>Reserve: {listing.reserve_met ? "Met" : "Not Met"}</div>
          <div className={styles.bidInput}>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
            />
            <button className={styles.bidButton}>Place Bid</button>
          </div>
        </div>

        <div className={styles.bidHistory}>
          <h3>Bid History</h3>
          {/* Add bid history list here */}
        </div>
      </div>
    </div>
  );
};

export default BiddingInfo;
