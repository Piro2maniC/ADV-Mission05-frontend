import React, { useState } from "react";
import styles from "./BiddingInfo.module.css";

const BiddingInfo = ({ listing }) => {
  const [bidAmount, setBidAmount] = useState("");

  return (
    <div className={styles.biddingContainer}>
      <div className={styles.priceInfo}>
        <div className={styles.buyNowSection}>
          <div>
            <span className={styles.priceLabel}>Buy Now</span>
            <div className={styles.priceAmount}>
              ${listing.buy_now_price || "N/A"}
            </div>
          </div>
          <button className={styles.buyNowButton}>Buy Now</button>
          <button className={styles.cartButton}>Add to Cart</button>
        </div>

        <div className={styles.bidSection}>
          <div>
            <span className={styles.priceLabel}>Current Bid</span>
            <div className={styles.priceAmount}>
              ${listing.current_bid || listing.start_price}
            </div>
          </div>
          <div className={styles.reserveStatus}>
            Reserve {listing.reserve_met ? "met" : "not met"}
          </div>
          <div className={styles.bidHistory}>Bid History (3)</div>
          <div className={styles.bidInput}>
            <button className={styles.bidButton}>Place Bid</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingInfo;
