import React from 'react'
import styles from './ReceiverControl.scss';


export default function (props) {
  const rssiPercent = Math.round(props.rssi / 255 * 100) + '%';
  const innerStyle = {
    width: rssiPercent
  }

  return <div className={styles.ReceiverControl}>
    <select className={styles.FrequencySelector}>
      <option>{props.frequency}</option>
    </select>

    <div className={styles.RssiBar}>
      <div className={styles.RssiBarInner} style={innerStyle} />
      <div className={styles.RssiBarText}>{rssiPercent}</div>
    </div>
  </div>
}
