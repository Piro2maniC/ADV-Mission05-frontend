import React from 'react'
import Card from '../../shared/Card'
import './Search.css'

function Search() {
  // Sample data - replace with your actual data later
  const items = [
    { id: 1, title: "Item 1", price: "$100" },
    { id: 2, title: "Item 2", price: "$200" },
    { id: 3, title: "Item 3", price: "$300" },
  ];

  return (
    <div className="search-container">
      <div className="grid-container">
        {items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Search
