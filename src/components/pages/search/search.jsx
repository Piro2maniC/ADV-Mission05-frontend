import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom'
import Card from './SearchCard'
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
  const location = useLocation();
  const { keyword } = useParams();

  useEffect(() => {
    if (keyword) {
      setSearchQuery(keyword);
    }
  }, [keyword]);

  const fetchItems = async (query = '') => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/find${query ? `?search=${query}` : ''}`);
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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchQuery.trim()) {
      params.set('keyword', searchQuery.trim());
      navigate(`/search?${params.toString()}`);
      fetchItems(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  const clearSearchFromUrl = () => {
    navigate('/search');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    clearSearchFromUrl();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    clearSearchFromUrl();
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    clearSearchFromUrl();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    clearSearchFromUrl();
    fetchItems(''); // Fetch all items when clearing search
  };

  const handleCompare = (item) => {
    console.log('handleCompare called with item:', item);
    setCompareItems(prev => {
      const exists = prev.some(i => i._id === item._id);
      console.log('Item exists in compare list:', exists);
      console.log('Current compare items:', prev);
      
      if (exists) {
        const newItems = prev.filter(i => i._id !== item._id);
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
      navigate(`/compare?id1=${compareItems[0]._id}&id2=${compareItems[1]._id}`);
    } else {
      alert('Please select 2 items to compare');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const categories = ['All Categories', ...new Set(items.map(item => item.category))].filter(Boolean);

  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
      item.category === selectedCategory;

    return matchesCategory && matchesSearch;
  });

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
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
            <button type="button" className={styles.clearSearch} onClick={handleClearSearch}>×</button>
            <button type="button" className={styles.saveSearch} onClick={clearSearchFromUrl}>
              <span className={styles.saveIcon}>💾</span>
              Save this search
            </button>
          </form>
        </div>
        <div className={styles.filterBar}>
          <button className={styles.refineButton} onClick={clearSearchFromUrl}>Refine</button>
          <div className={styles.categoryDropdown}>
            <select 
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={styles.categorySelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.locationButton} onClick={clearSearchFromUrl}>All Locations</button>
          <button className={styles.conditionButton} onClick={clearSearchFromUrl}>New & Used</button>
          <button className={styles.shippingButton} onClick={clearSearchFromUrl}>Shipping: All</button>
        </div>
      </div>

      <div className={styles.categoryList}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
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
          onClick={() => handleViewModeChange('grid')}
        >
          Grid
        </button>
        <button 
          className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => handleViewModeChange('list')}
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
            isCompareDisabled={compareItems.length === 2 && !compareItems.some(i => i._id === item._id)}
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
