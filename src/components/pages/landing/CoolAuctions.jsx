import React, { useEffect, useState } from 'react';
import styles from './CoolAuctions.module.css';
import Card from './Card';
import axios from 'axios';

export default function CoolAuctions() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auctions');
        const shuffledItems = [...response.data].sort(() => 0.5 - Math.random());
        const uniqueItems = [...new Set(shuffledItems.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
        setItems(uniqueItems.slice(0, 4));
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
            reserve_price={item.reserve_price}
          />
        ))}
      </div>
    </div>
  );
}


// In your backend server file
// app.get('/api/auctions', async (req, res) => {
//   try {
//       const items = await AuctionItems.find().limit(5); // Fetch 5 items
//       res.json(items);
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch auction items' });
//   }
// });