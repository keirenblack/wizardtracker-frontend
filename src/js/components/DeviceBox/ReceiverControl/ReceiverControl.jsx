import React from 'react'
import styles from './ReceiverControl.scss'

import channels from 'utils/channels'

export default function ReceiverControl (props) {
  const rssiPercent = Math.round(props.rssi / 255 * 100) + '%'
  const innerStyle = {
    width: rssiPercent
  }

  const frequencyOptions = []
  for (const i in channels.all) {
    const channel = channels.all[i]

    frequencyOptions.push(
      <option
        key={i}
        value={channel.frequency}
      >
        {channel.name} - {channel.frequency}
      </option>
    )
  }

  const selectedFrequency = channels.findByFrequency(props.frequency)

  return <div className={styles.ReceiverControl}>
    <select
      className={styles.FrequencySelector}
      value={selectedFrequency && selectedFrequency.frequency || 'unknown'}
      readOnly={true}
    >
      <option
        value={'unknown'}
        disabled
        hidden={selectedFrequency !== undefined}
      >
        ?? - {props.frequency}
      </option>

      {frequencyOptions}
    </select>

    <div className={styles.RssiBar}>
      <div className={styles.RssiBarInner} style={innerStyle} />
      <div className={styles.RssiBarText}>{rssiPercent}</div>
    </div>
  </div>
}
