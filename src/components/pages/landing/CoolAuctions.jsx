import React, { useEffect, useState } from 'react';
import styles from './CoolAuctions.module.css';
import Card from './Card';
import axios from 'axios';

export default function CoolAuctions() {
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
      <h1 className={styles.auctionsHeading}>Cool auctions</h1>
      <div className={styles.coolAuctions}>
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


// In your backend server file
// app.get('/api/auctions', async (req, res) => {
//   try {
//       const items = await AuctionItems.find().limit(5); // Fetch 5 items
//       res.json(items);
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch auction items' });
//   }
// });