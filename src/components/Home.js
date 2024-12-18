import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <h1>Auction Items Management</h1>
            <div className={styles.navGrid}>
                <Link to="/insert" className={styles.navCard}>
                    <h2>Add Item</h2>
                    <p>Add a new auction item to the database</p>
                </Link>
                <Link to="/find" className={styles.navCard}>
                    <h2>View Items</h2>
                    <p>Browse and search auction items</p>
                </Link>
                <Link to="/update" className={styles.navCard}>
                    <h2>Update Item</h2>
                    <p>Modify existing auction items</p>
                </Link>
                <Link to="/delete" className={styles.navCard}>
                    <h2>Delete Item</h2>
                    <p>Remove auction items from the database</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;
