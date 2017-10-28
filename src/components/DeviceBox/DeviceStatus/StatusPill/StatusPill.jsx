import React from 'react'
import styles from './StatusPill.scss'

const StatusPill = (props) =>
  <div className={styles.StatusPill}>
    {props.children}
  </div>

export default StatusPill
