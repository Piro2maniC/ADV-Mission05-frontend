import React from 'react';
import styles from './Card.module.css';
import WatchlistIcon from "../assets/addToWatchlist.png"


export default function Card({ picture, location, closingTime, title, price }) {
  return (
    <div className={styles.card}>
      <img src={WatchlistIcon} alt="Watchlist Icon" className={styles.watchlistIcon} />
      <img src={picture} alt={title} className={styles.picture} />
      <div className={styles.details}>
        <div className={styles.locationAndTime}>
        <p className={styles.location}>Location: {location}</p>  
         <p className={styles.closingTime}>Closing Time: {closingTime}</p>


        </div>
         <h2 className={styles.title}>{title}TITLE</h2>
         <p className={styles.reserve}>Reserve not met</p>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
}
