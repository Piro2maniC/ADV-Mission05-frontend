import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/ConstHeader.module.css";
import Logo from "../../assets/trademe-logo-no-tagline.png"
import WatchlistIcon from "../../assets/Group.png"
import FavouritesIcon from "../../assets/line-md_heart.png"
import StartListingIcon from "../../assets/prime_pencil.png"
import MyTradeMeIcon from "../../assets/lucide_circle-user-round.png"
import SearchIcon from "../../assets/searchIcon.png"

export default function ConstHeader() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className={styles.headerSearchBar}>
      <div className={styles.topNav}>
        <div className={styles.headerNavLinks}>
          <Link to="/">Trade Me</Link>
          <Link to="/insurance">Trade Me Insurance</Link>
          <Link to="/holiday">Holiday Houses</Link>
          <Link to="/findsomeone">FindSomeone</Link>
          <Link to="/motorweb">MotorWeb</Link>
          <Link to="/homes">homes.co.nz</Link>
        </div>
        <div className={styles.authLinks}>
          <Link to="/register">Register</Link>
          <Link to="/login">Log in</Link>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Logo} alt="Trade Me" />
          </Link>
        </div>
        
        <div className={styles.searchSection}>
          <div className={styles.browseDropdown}>
            Browse
            <span className={styles.dropdownArrow}>▼</span>
          </div>
          {!isLandingPage && (
            <div className={styles.searchInputContainer}>
              <img className={styles.searchIcon} src={SearchIcon} alt="Search" />
              <input type="text" placeholder="Search" />
              <button className={styles.searchButton}>
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.userActions}>
          <Link to="/watchlist" className={styles.actionLink}>
            <span className={styles.icon}>
              <img src={WatchlistIcon} alt="Watchlist" />
            </span>
            Watchlist
          </Link>
          <Link to="/favourites" className={styles.actionLink}>
            <span className={styles.icon}>
              <img src={FavouritesIcon} alt="Favourites" />
            </span>
            Favourites
          </Link>
          <Link to="/listing/new" className={styles.actionLink}>
            <span className={styles.icon}>
              <img src={StartListingIcon} alt="Start Listing" />
            </span>
            Start a listing
          </Link>
          <Link to="/my-trademe" className={styles.actionLink}>
            My Trade Me 
            <span className={styles.icon}>
              <img src={MyTradeMeIcon} alt="My Trade Me" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
