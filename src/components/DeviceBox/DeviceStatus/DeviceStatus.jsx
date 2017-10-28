import React from 'react'
import styles from './DeviceStatus.scss';

import StatusPill from './StatusPill/StatusPill'

const DeviceStatus = (props) => {
  const voltage = props.voltage || '?'
  const temperature = props.temperature || '?'

  let accuracy = null;
  if (props.hz !== undefined) {
    accuracy = Math.round(1000 / props.hz)
  } else {
    accuracy = '?'
  }

  return <div className={styles.DeviceStatus}>
    <StatusPill>
      <div className={styles.IconBattery} />
      {voltage}V
    </StatusPill>

    <StatusPill>
      <div className={styles.IconTemperature} />
      {temperature}°C
    </StatusPill>

    <StatusPill>
      <div className={styles.IconAccuracy} />
      {accuracy}ms
    </StatusPill>
  </div>
}

export default DeviceStatus;
