import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
    return (
        <div className={styles.banner}>
            <h1>KIA ORA! READY TO FIND YOUR NEW?</h1>
            <input type="text" placeholder="Search all of Trade Me" />
            <button>Search</button>
        </div>
    );
};

export default Banner;
