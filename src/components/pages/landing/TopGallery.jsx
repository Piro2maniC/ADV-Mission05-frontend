import React from "react";
import styles from "./TopGallery.module.css";

const TopGallery = () => {
  return (
    <div className={styles.tiles}>
      <div className={styles.tileOne}>
        <h1>Trending</h1>
          <p>Shop last minute Xmas gifts!</p>
          <button>Shop now</button>
        </div>
      <div className={styles.tileTwo}>
      <h1>Property</h1>
          <p>You choose, we celebrate</p>
          <button>Nominate now</button>
      </div>
      <div className={styles.tileThree}>
      <h1>Properties</h1>
          <p>Selling info is here!</p>
          <button>Search now</button>
      </div>
    </div>
  );
};

export default TopGallery;
