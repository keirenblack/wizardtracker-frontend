import React from 'react'
import styles from './StatusPill.scss';

export default function (props) {
  return <div className={styles.StatusPill}>
    {props.children}
  </div>
}
