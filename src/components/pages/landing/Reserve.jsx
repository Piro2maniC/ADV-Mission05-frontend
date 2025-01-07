import React from 'react'
import styles from './Reserve.module.css'
import Card from './Card'

export default function Reserver() {
  return (
    <div>      
      <h1 className={styles.reserveHeading}>$1 reserve</h1>

    <div className={styles.reserve}>
<Card></Card>

    </div>
    </div>
  )
}
