import React, { useEffect, useState } from 'react';
import styles from './CoolAuctions.module.css';
import Card from './Card';
import axios from 'axios';

export default function CoolAuctions() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/auctions');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching auction items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1 className={styles.auctionsHeading}>Cool auctions</h1>
      <div className={styles.coolAuctions}>
        {items.map(item => (
          <Card
            key={item._id}
            picture={item.image_url}
            location={item.location}
            closingTime={item.closing_time}
            title={item.title}
            price={item.start_price}
          />
        ))}
      </div>
    </div>
  );
}