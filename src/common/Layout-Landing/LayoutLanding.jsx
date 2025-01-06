import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../styles/LayoutLanding.module.css';
import ConstHeader from './ConstHeader';
import Footer from './Footer';

function LayoutLanding() {
  return (
    <div className={styles.layoutGrid}>
      <header className={styles.header}>
        <ConstHeader />
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default LayoutLanding;
