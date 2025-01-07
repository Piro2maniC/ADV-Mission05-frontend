import React from 'react'
import styles from './Trending.module.css'

export default function Trending() {
  return (
    <div>
      <h1 className={styles.trendingHeading}>Trending</h1>
      <h2 className={styles.categoriesHeading}>Categories</h2>
      <div className={styles.categories}>
          <div className={styles.categoryOne}>
              <h3>55,519+ Dresses</h3>
              <p>Marketplace / Clothing & Fashion / Women / Dresses</p>
          </div>
          <div className={styles.categoryTwo}>
          <h3>20,419+ Cars</h3>
              <p>Motors / Cars</p>
          </div>
          <div className={styles.categoryThree}>
          <h3>2,419+ Houses</h3>
              <p>Property / Houses</p>
          </div>
      </div>
    </div>
  )
}
