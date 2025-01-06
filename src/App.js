// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Items from './components/Items';
import styles from './components/styles.module.css';
import Header from './components/pages/landing/LandingHeader.jsx';
import Landing from './components/pages/landing/Landing.jsx'

const App = () => {
    return (
        <Router>
            <div className={styles.app}>
                {/* <Routes>
                    <Route path="/" element={<Items />} />
                </Routes> */}
                <Header></Header>
                <Landing></Landing>
            </div>
        </Router>
    );
};

export default App;