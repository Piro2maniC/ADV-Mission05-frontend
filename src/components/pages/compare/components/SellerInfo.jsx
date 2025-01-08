import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import styles from "./SellerInfo.module.css";

const SellerInfo = ({ listing }) => {
  // Mock data
  const sellerData = {
    name: "TechHub NZ",
    image: "https://via.placeholder.com/40",
    rating: 4.5,
    reviews: 847,
    location: "Auckland, New Zealand",
    positiveFeedback: 99.4,
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className={styles.starIcon} />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className={styles.starIcon} />);
    }
    return stars;
  };

  return (
    <div className={styles.sellerContainer}>
      <div className={styles.sellerHeader}>
        <img
          src={sellerData.image}
          alt={sellerData.name}
          className={styles.profileImage}
        />
        <div className={styles.sellerNameSection}>
          <h3 className={styles.sellerName}>{sellerData.name}</h3>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars(sellerData.rating)}</div>
            <span className={styles.reviews}>({sellerData.reviews})</span>
          </div>
        </div>
      </div>

      <div className={styles.verificationBadges}>
        <button className={styles.badge}>Address Verified</button>
        <button className={styles.badge}>In Trade</button>
      </div>

      <div className={styles.feedbackSection}>
        <div className={styles.feedbackRate}>
          {sellerData.positiveFeedback}% Positive Feedback
        </div>
        <div className={styles.location}>Located in {sellerData.location}</div>
      </div>

      <button className={styles.shopButton}>Visit Shop</button>
    </div>
  );
};

export default SellerInfo;
