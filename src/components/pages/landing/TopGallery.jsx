import React from "react";
import styles from "./TopGallery.module.css";

const Gallery = () => {
  return (
    <div className={styles.tiles}>
      <div className={styles.tileOne}>
        <h1>Trending</h1>
          <p>Shop last minute Xmas gifts!</p>
          <button>Shop now</button>
        </div>
      <div className={styles.tile2}>Tile 2</div>
      <div className={styles.tile3}>Tile 3</div>
    </div>
  );
};

export default Gallery;
