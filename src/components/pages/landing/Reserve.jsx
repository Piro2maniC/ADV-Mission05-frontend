import React, { useEffect, useState } from 'react';
import styles from './Reserve.module.css';
import Card from './Card';
import axios from 'axios';

export default function Reserve() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auctions');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching auction items:', error);
      }
    };

    fetchItems();
  }, []);

  const displayedItems = items.slice(0, 4); // Limit to 4 items

  return (
    <div>
      <h1 className={styles.reserveHeading}>$1 reserve</h1>
      <div className={styles.reserve}>
        {displayedItems.map(item => (
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