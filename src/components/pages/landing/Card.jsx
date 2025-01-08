import React from 'react';
import styles from './Card.module.css';
import WatchlistIcon from "../../../assets/addToWatchlist.png"

export default function Card({ picture, location, closingTime, title, reserve_price }) {
  return (
    <div className={styles.card}>
      <img src={WatchlistIcon} alt="Watchlist Icon" className={styles.watchlistIcon} />
      <img src={picture} alt={title} className={styles.picture} />
      <div className={styles.details}>
        <div className={styles.locationAndTime}>
        <p className={styles.location}>{location}</p>  
         <p className={styles.closingTime}>{closingTime}</p>


        </div>
         <h2 className={styles.title}>{title}</h2>
         <p className={styles.reserve}>Reserve not met</p>
        <p className={styles.price}>${reserve_price}</p>
      </div>
    </div>
  );
}
