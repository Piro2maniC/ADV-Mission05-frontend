import React, { useEffect, useState } from 'react';
import styles from './Reserve.module.css';
import Card from './Card';
import axios from 'axios';

export default function Reserve() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auctions');
        const shuffledItems = [...response.data].sort(() => 0.5 - Math.random());
        const filteredItems = shuffledItems.filter(item => item.reserve_price === 1);
        setItems(filteredItems.slice(0, 4));
      } catch (error) {
        console.error('Error fetching auction items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1 className={styles.reserveHeading}>$1 reserve</h1>
      <div className={styles.reserve}>
        {items.map(item => (
          <Card
            key={item._id}
            picture={item.image_url}
            location={item.location}
            closingTime={item.closing_time}
            title={item.title}
            price={item.start_price}
            reserve_price={item.reserve_price}
          />
        ))}
      </div>
    </div>
  );
}