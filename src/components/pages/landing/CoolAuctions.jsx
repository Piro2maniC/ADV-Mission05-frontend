import React from 'react'
import styles from './CoolAuctions.module.css'
import Card from './Card'

export default function CoolAuctions() {
  return (
    <div>      
      <h1 className={styles.auctionsHeading}>Cool auctions</h1>

    <div className={styles.coolAuctions}>
<Card></Card>

    </div>
    </div>
  )
}
