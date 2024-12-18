// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Items from './components/Items';
import styles from './components/styles.module.css';

const App = () => {
    return (
        <Router>
            <div className={styles.app}>
                <Routes>
                    <Route path="/" element={<Items />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;