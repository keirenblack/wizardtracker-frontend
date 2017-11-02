import React from 'react'
import styles from './Spinner.scss';

const Spinner = (props) => {
  return <div className={styles.Spinner}>
    <div className={styles.SpinnerGraphic} />
  </div>
}

export default Spinner;
