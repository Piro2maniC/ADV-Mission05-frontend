import React from "react";
import { Link } from "react-router-dom";
// import { FaHeart, FaUser, FaSearch } from "react-icons/fa";
import styles from "./LandingHeader.module.css";
import Logo from "../../../assets/trademe-logo-no-tagline.png"
import WatchlistIcon from "../../../assets/Group.png"
import FavouritesIcon from "../../../assets/line-md_heart.png"
import StartListingIcon from "../../../assets/prime_pencil.png"
import MyTradeMeIcon from "../../../assets/lucide_circle-user-round.png"
import SearchIcon from "../../../assets/searchIcon.png"

export default function LandingHeader() {
  return (
    <header className={styles.headerSearchBarLanding}>
    <div className={styles.topNavLanding}>
    <div className={styles.headerNavLinksLanding}>
          <Link to="/">Trade Me</Link>
          <Link to="/insurance">Trade Me Insurance</Link>
          <Link to="/holiday">Holiday Houses</Link>
          <Link to="/findsomeone">FindSomeone</Link>
          <Link to="/motorweb">MotorWeb</Link>
          <Link to="/homes">homes.co.nz</Link>
        </div>
        <div className={styles.authLinksLanding}>
    <Link to="/register">Register</Link>
    <Link to="/login">Log in</Link>
  </div>
</div>

<div className={styles.mainNavLanding}>
  <div className={styles.logoLanding}>
          <Link to="/">
            <img src={Logo} alt="Trade Me" />
          </Link>
        </div>
        
        <div className={styles.searchSectionLanding}>
        <div className={styles.browseDropdownLanding}>
            Browse
            <span className={styles.dropdownArrowLanding}>▼</span>
</div>

        </div>
        
        <div className={styles.userActionsLanding}>
        <Link to="/watchlist" className={styles.actionLinkLanding}>
            <span className={styles.icon}>
            <img src={WatchlistIcon}></img></span>
          Watchlist
          </Link>
          <Link to="/favourites" className={styles.actionLinkLanding}>
          <span className={styles.icon}>
          <img src={FavouritesIcon}></img></span>
          Favourites
</Link>
<Link to="/listing/new" className={styles.actionLinkLanding}>
<span className={styles.iconLanding}>
<img src={StartListingIcon}></img></span>
 Start a listing
</Link>
<Link to="/my-trademe" className={styles.actionLinkLanding}>
My Trade Me <span className={styles.icon}><img src={MyTradeMeIcon}></img></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
