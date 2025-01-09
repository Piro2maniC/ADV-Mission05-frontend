/**
 * Search Component
 * Main component for the search page that displays auction items in either grid or list view.
 * Includes functionality for searching, filtering by category, comparing items, and switching view modes.
 */
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import Card from "./SearchCard";
import styles from "../../../styles/Search.module.css";
import searchIcon from "../../../assets/Vector.png";
import GalleryIcon from "../../../assets/Gallery.png";
import ListIcon from "../../../assets/List.png";

function Search() {
  // State management for various features
  const [items, setItems] = useState([]); // All auction items
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for API calls
  const [viewMode, setViewMode] = useState("grid"); // Toggle between grid and list view
  const [compareItems, setCompareItems] = useState([]); // Items selected for comparison
  const [searchQuery, setSearchQuery] = useState(""); // Current search query
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // Selected category filter
  
  // Hooks for navigation and routing
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword } = useParams();

  // Set search query from URL parameters
  useEffect(() => {
    if (keyword) {
      setSearchQuery(keyword);
    }
  }, [keyword]);

  /**
   * Fetches auction items from the API
   * @param {string} query - Optional search query to filter items
   */
  const fetchItems = async (query = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/find${query ? `?search=${query}` : ""}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch auction items");
      }
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Initial fetch of items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  /**
   * Event Handlers for Search Functionality
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchQuery.trim()) {
      params.set("keyword", searchQuery.trim());
      navigate(`/search?${params.toString()}`);
      fetchItems(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  /**
   * Navigation and URL Management
   */
  const clearSearchFromUrl = () => {
    navigate("/search");
  };

  /**
   * Category Management
   */
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    clearSearchFromUrl();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    clearSearchFromUrl();
  };

  /**
   * View Mode Management
   */
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    clearSearchFromUrl();
  };

  /**
   * Search Reset
   */
  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    clearSearchFromUrl();
    fetchItems(""); // Fetch all items when clearing search
  };

  /**
   * Compare Functionality
   * Manages the addition and removal of items for comparison
   * Limited to 2 items maximum
   */
  const handleCompare = (item) => {
    setCompareItems((prev) => {
      const exists = prev.some((i) => i._id === item._id);

      if (exists) {
        return prev.filter((i) => i._id !== item._id);
      } else if (prev.length < 2) {
        return [...prev, item];
      } else {
        alert("You can only compare up to 2 items");
        return prev;
      }
    });
  };

  const handleCompareClick = () => {
    if (compareItems.length === 2) {
      navigate(
        `/compare?id1=${compareItems[0]._id}&id2=${compareItems[1]._id}`
      );
    } else {
      alert("Please select 2 items to compare");
    }
  };

  // Loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get unique categories from items
  const categories = [
    "All Categories",
    ...new Set(items.map((item) => item.category)),
  ].filter(Boolean);

  // Filter items based on search query and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    return matchesCategory && matchesSearch;
  });

  /**
   * Extracts just the city name from a location string
   * @param {string} location - Location string in format "City, Country"
   * @returns {string} - Just the city name
   */
  const getCity = (location) => {
    if (!location) return '';
    const parts = location.split(',');
    return parts[0].trim();
  };

  return (
    <div className={styles.searchContainer}>
      {/* Breadcrumb Navigation */}
      <div className={styles.searchHeader}>
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>{selectedCategory}</span>
        </div>

        {/* Page Title */}
        <h1 className={styles.pageTitle}>{selectedCategory}</h1>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <div className={styles.searchInputContainer}>
              <img
                src={searchIcon}
                alt="Search"
                className={styles.searchIcon}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder=""
                className={styles.searchInput}
              />
              <button
                type="button"
                className={styles.clearSearch}
                onClick={handleClearSearch}
              >
                ×
              </button>
            </div>
            <button
              type="button"
              className={styles.saveSearch}
              onClick={clearSearchFromUrl}
            >
              Save this search
            </button>
          </form>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <button className={styles.refineButton} onClick={clearSearchFromUrl}>
            Refine
          </button>
          <div className={styles.categoryDropdown}>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={styles.categorySelect}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            className={styles.categorySelect}
            onClick={clearSearchFromUrl}
          >
            All Locations
          </button>
          <button
            className={styles.categorySelect}
            onClick={clearSearchFromUrl}
          >
            New & Used
          </button>
          <button
            className={styles.categorySelect}
            onClick={clearSearchFromUrl}
          >
            Shipping: All
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            <span className={styles.categoryCount}>
              (
              {category === "All Categories"
                ? items.length
                : items.filter((item) => item.category === category).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Display Settings */}
      <div className={styles.displaySettingsContainer}>
        <div className={styles.results}>
          Showing {filteredItems.length} results for '{" "}

          <span className={styles.categoryName}>{selectedCategory}</span>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.sort}>
            Sort: Best Match{" "}
          </div>

          {/* View Mode Toggle */}
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleButtonList} ${
                viewMode === "list" ? styles.active : ""
              }`}
              onClick={() => handleViewModeChange("list")}
            >
              <img src={ListIcon} alt="" className={styles.listIcon} /> List
            </button>
            <button
              className={`${styles.toggleButtonGallery} ${
                viewMode === "grid" ? styles.active : ""
              }`}
              onClick={() => handleViewModeChange("grid")}
            >
              <img src={GalleryIcon} alt="" className={styles.galleryIcon} />{" "}
              Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Search Results Grid/List */}
      <div
        className={
          viewMode === "grid" ? styles.gridContainer : styles.listContainer
        }
      >
        
        {filteredItems.map((item) => (
          <Card
            key={item._id}
            {...item}
            location={getCity(item.location)}
            onCompare={handleCompare}
            isCompareDisabled={
              compareItems.length === 2 &&
              !compareItems.some((i) => i._id === item._id)
            }
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Compare Button */}
      <button
        className={styles.compareButton}
        onClick={handleCompareClick}
        style={{ display: compareItems.length > 0 ? "flex" : "none" }}
      >
        <span className={styles.compareCount}>{compareItems.length}</span>
        Compare
      </button>
    </div>
  );
}

export default Search;
