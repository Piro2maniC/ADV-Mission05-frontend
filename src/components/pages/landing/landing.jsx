import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import TopGallery from "./TopGallery.jsx";
import CoolAuctions from "./CoolAuctions.jsx";
import Trending from "./Trending.jsx";
import Reserve from "./Reserve.jsx";
import Footer from "./Footer.jsx";
import searchIcon from "../../../assets/searchIcon.png"
// import Header from "./Header.jsx";

const Landing = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if (!keyword.trim()) {
      return; // Don't navigate if the search is empty or just whitespace
    }
    setHasSearched(true);
      //   try {
  //     const response = await axios.get(
  //       `http://localhost:5001/find${keyword ? `?search=${keyword}` : ''}`
  //     );
  //     setResults(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //   navigate(`/search/${keyword}`);
  // };

    navigate(`/search/${encodeURIComponent(keyword.trim())}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
       {/* <Header /> */}
      <div className={styles.backgroundBlock}></div>
      <div className={styles.searchContainer}>
        <h1 className={styles.heading}>KIA ORA! READY TO FIND YOUR NEW?</h1>
        <div className={styles.searchBox}>
        <div className={styles.iconContainer}>
          <img
            src={searchIcon}
            alt="Search Icon"
            className={styles.searchIcon}
          />
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search all of Trade Me"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          // will pass keyword through url, then run query on davids page
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        </div>

        <nav className={styles.categoryNav}>
          <a href="#" className={`${styles.categoryLink} ${styles.marketplace}`}>Marketplace</a>
          <a href="#" className={`${styles.categoryLink} ${styles.motors}`}>Motors</a>
          <a href="#" className={`${styles.categoryLink} ${styles.property}`}>Property</a>
          <a href="#" className={`${styles.categoryLink} ${styles.jobs}`}>Jobs</a>
          <a href="#" className={`${styles.categoryLink} ${styles.services}`}>Services</a>
        </nav>
        
        {/* {results.length > 0 && (
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>Results:</h2>
            <ul className={styles.resultsList}>
              {results.map((item) => (
                <li key={item._id} className={styles.resultItem}>
                  <div className={styles.resultTitle}>
                    <strong>{item.title}</strong>
                  </div>
                  <div className={styles.resultDescription}>{item.description}</div>
                  <div className={styles.resultPrice}>
                    Start Price: ${item.start_price} | Reserve Price: ${item.reserve_price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasSearched && results.length === 0 && (
          <div className={styles.noResults}>No items found</div>
        )} */}
      </div>
      <TopGallery></TopGallery>
      <CoolAuctions></CoolAuctions>
       <Trending></Trending>
       <Reserve></Reserve>
   <br></br>
   
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Landing;
