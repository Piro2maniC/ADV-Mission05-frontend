import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../../shared/Card'
import styles from '../../../styles/Search.module.css'

function Search() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [compareItems, setCompareItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/find');
        if (!response.ok) {
          throw new Error('Failed to fetch auction items');
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const categories = ['All Categories', ...new Set(items.map(item => item.category))].filter(Boolean);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCompare = (item) => {
    console.log('handleCompare called with item:', item);
    setCompareItems(prev => {
      const exists = prev.some(i => i.title === item.title);
      console.log('Item exists in compare list:', exists);
      console.log('Current compare items:', prev);
      
      if (exists) {
        const newItems = prev.filter(i => i.title !== item.title);
        console.log('Removing item, new list:', newItems);
        return newItems;
      } else if (prev.length < 2) {
        const newItems = [...prev, item];
        console.log('Adding item, new list:', newItems);
        return newItems;
      } else {
        alert('You can only compare up to 2 items');
        return prev;
      }
    });
  };

  const handleCompareClick = () => {
    if (compareItems.length === 2) {
      navigate('/compare', { state: { items: compareItems } });
    } else {
      alert('Please select 2 items to compare');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>{selectedCategory}</span>
        </div>
        <h1 className={styles.pageTitle}>{selectedCategory}</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>×</button>
          <button className={styles.saveSearch}>
            <span className={styles.saveIcon}>💾</span>
            Save this search
          </button>
        </div>
        <div className={styles.filterBar}>
          <button className={styles.refineButton}>Refine</button>
          <div className={styles.categoryDropdown}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.locationButton}>All Locations</button>
          <button className={styles.conditionButton}>New & Used</button>
          <button className={styles.shippingButton}>Shipping: All</button>
        </div>
      </div>

      <div className={styles.categoryList}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
            <span className={styles.categoryCount}>
              {category === 'All Categories' 
                ? items.length 
                : items.filter(item => item.category === category).length}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.viewToggle}>
        <button 
          className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
          onClick={() => setViewMode('grid')}
        >
          Grid
        </button>
        <button 
          className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => setViewMode('list')}
        >
          List
        </button>
      </div>

      <div className={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
        {filteredItems.map((item) => (
          <Card 
            key={item._id} 
            {...item} 
            onCompare={handleCompare}
            isCompareDisabled={compareItems.length === 2 && !compareItems.some(i => i.title === item.title)}
          />
        ))}
      </div>

      <button 
        className={styles.compareButton}
        onClick={handleCompareClick}
        style={{ display: compareItems.length > 0 ? 'flex' : 'none' }}
      >
        <span className={styles.compareCount}>{compareItems.length}</span>
        Compare
      </button>
    </div>
  )
}

export default Search
