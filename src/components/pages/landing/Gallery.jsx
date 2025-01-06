import React from 'react';
import styles from './Gallery.module.css';

const Gallery = () => {
    return (
        <div className={styles.tiles}>
            <div className={styles.tile}>Tile 1</div>
            <div className={styles.tile}>Tile 2</div>
            <div className={styles.tile}>Tile 3</div>
        </div>
    );
};

export default Gallery;
