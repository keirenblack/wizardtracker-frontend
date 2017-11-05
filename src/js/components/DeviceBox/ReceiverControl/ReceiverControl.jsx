import React from 'react'
import styles from './ReceiverControl.scss'

import channels from 'utils/channels'

export default function ReceiverControl (props) {
  const rssiPercent = props.rssi / 255
  const rssiText = Math.round(rssiPercent * 100) + '%'
  const innerStyle = {
    width: rssiPercent * 100 + '%'
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
    className={styles['FrequencySelector' + (props.index + 1)]}
      value={selectedFrequency && selectedFrequency.frequency || 'unknown'}
      onChange={event => {
        props.onSetFrequency(props.index, event.target.value)
      }}
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

    <div className={styles['RssiBar' + (props.index + 1)]}>
      <div
        className={styles['RssiBarInner' + (props.index + 1)]}
        style={innerStyle}
      />
      <div className={styles.RssiBarText}>{rssiText}</div>
    </div>
  </div>
}
