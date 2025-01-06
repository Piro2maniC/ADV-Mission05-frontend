import React from 'react';
import styles from './Footer.module.css';
import Logo from "../../../assets/trademe-logo-no-tagline.png"
import SpeechBubble from "../../../assets/speechBubble.png"
import Information from "../../../assets/information.png"
import FacebookLogo from "../../../assets/greyFacebook.png"
import TwitterLogo from "../../../assets/greyTwitter.png"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.topSection}>
                <span className={styles.upgrading}>We are upgrading some of our systems</span><img className={styles.information} src={Information} alt="Information"></img>
                <span className={styles.learnMore}>
                    Learn more</span><img className={styles.speechBubble} src={SpeechBubble} alt="Speech Bubble"></img>
                <span className={styles.tellUs}>
                    Tell us what you think</span>
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
                <p className={styles.copyrightText}>Desktop site </p>
                <p className={styles.copyrightText}>About Us </p>
                <p className={styles.copyrightText}>Careers </p>
                <p className={styles.copyrightText}>Advertise </p>
                <p className={styles.copyrightText}>Privacy policy </p>
                <p className={styles.copyrightText}>Terms & conditions </p>
                <p className={styles.copyrightText}>Contact Us</p>
                <img className={styles.socialIcons} src={FacebookLogo} alt="Facebook Logo"></img><img className={styles.socialIcons} src={TwitterLogo} alt="Twitter Logo"></img>
            </div>
        </div>
    );
};

export default Footer;
