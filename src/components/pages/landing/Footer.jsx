import React from 'react';
import styles from './Footer.module.css';
import Logo from "../../../assets/trademe-logo-no-tagline.png"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.topSection}>
                <span>We are upgrading some of our systems</span>
                <span>Learn more</span>
                <span>Tell us what you think</span>
            </div>
            <div className={styles.middleSection}>
                <img src={Logo} alt="Trade Me Logo" />
                <span>List an item</span>
                <span>Watchlist</span>
                <span>Favourites</span>
                <span>My Trade Me</span>
                <span>Register</span>
                <span>Log in</span>
            </div>
            <div className={styles.bottomSection}>
                <div>
                    <h4>Marketplace</h4>
                    <ul>
                        <li>Latest deals</li>
                        <li>Stores</li>
                        <li>Closing soon</li>
                        <li>$1 reserve</li>
                    </ul>
                </div>
                <div>
                    <h4>Jobs</h4>
                    <ul>
                        <li>Browse categories</li>
                        <li>Careers advice</li>
                        <li>JobSmart</li>
                        <li>Advertisers advice</li>
                    </ul>
                </div>
                <div>
                    <h4>Motors</h4>
                    <ul>
                        <li>Browse all cars</li>
                        <li>Other vehicles</li>
                        <li>Buying & Selling</li>
                        <li>Dealer news & info</li>
                    </ul>
                </div>
                <div>
                    <h4>Property</h4>
                    <ul>
                        <li>International Property</li>
                        <li>News & guides</li>
                        <li>Homes.co.nz</li>
                        <li>OneHub for agents</li>
                    </ul>
                </div>
                <div>
                    <h4>Services</h4>
                    <ul>
                        <li>Trades</li>
                        <li>Domestic Services</li>
                        <li>Events & entertainment</li>
                        <li>Health & wellbeing</li>
                    </ul>
                </div>
                <div>
                    <h4>Community</h4>
                    <ul>
                        <li>Help</li>
                        <li>Announcements</li>
                        <li>Trust & safety</li>
                        <li>Seller information</li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyrightSection}>
                <p>&copy; 2024 Trade Me Limited</p>
                <p>Desktop site About Us Careers Advertise Privacy policy Terms & conditions Contact Us</p>
                <p>Social Media Icons</p>
            </div>
        </div>
    );
};

export default Footer;
