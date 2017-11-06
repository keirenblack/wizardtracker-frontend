import React from 'react'
import styles from './DeviceStatus.scss';

const DeviceStatus = (props) => {
  const voltage = props.voltage !== undefined ? props.voltage : '?'
  const temperature = props.temperature !== undefined ? props.temperature : '?'

  let accuracy = null;
  if (props.hz !== undefined) {
    accuracy = Math.round(1000 / props.hz)
  } else {
    accuracy = '?'
  }

  return <div className={styles.DeviceStatus}>
    <div className={styles.Metric}>
      <div className={styles.IconBattery} />
      {voltage}V
    </div>

    <div className={styles.Metric}>
      <div className={styles.IconTemperature} />
      {temperature}°C
    </div>

    <div className={styles.Metric}>
      <div className={styles.IconAccuracy} />
      {accuracy}ms
    </div>
  </div>
}

export default DeviceStatus;
