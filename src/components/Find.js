import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Find = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchItems = async (search = '') => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/find${search ? `?search=${search}` : ''}`);
            if (response.ok) {
                const data = await response.json();
                setItems(data);
                setError(null);
            } else {
                setError('Failed to fetch items');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchItems(searchTerm);
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.itemsContainer}>
            <h2>Auction Items</h2>
            
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title or description..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </div>
            </form>

            {loading ? (
                <div className={styles.loading}>Loading auction items...</div>
            ) : (
                <>
                    {items.length === 0 ? (
                        <p className={styles.noItems}>No auction items found.</p>
                    ) : (
                        <div className={styles.itemsGrid}>
                            {items.map(item => (
                                <div key={item._id} className={styles.itemCard}>
                                    <h3>{item.title}</h3>
                                    <p className={styles.description}>{item.description}</p>
                                    <div className={styles.priceInfo}>
                                        <p>Starting Price: ${item.start_price}</p>
                                        <p>Reserve Price: ${item.reserve_price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => fetchItems()} className={styles.refreshButton}>
                        Refresh Items
                    </button>
                </>
            )}
        </div>
    );
};

export default Find;