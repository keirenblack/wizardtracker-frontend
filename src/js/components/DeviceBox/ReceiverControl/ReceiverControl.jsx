import React from 'react'
import styles from './ReceiverControl.scss'

import channels, { frequencyToHue } from 'utils/channels'

export default function ReceiverControl (props) {
  const frequencyOptions = []
  for (const i in channels.all) {
    const channel = channels.all[i]
    const optionStyle = {
      backgroundColor: `hsl(${channel.hue}, 50%, 90%)`
    }

    frequencyOptions.push(
      <option
        key={i}
        value={channel.frequency}
        style={optionStyle}
      >
        {channel.name} - {channel.frequency}
      </option>
    )
  }

  const rssiPercent = props.rssi / 255
  const rssiText = Math.round(rssiPercent * 100) + '%'

  const hue = frequencyToHue(props.frequency)
  const barStyle = {
    backgroundColor: `hsl(${hue}, 50%, 80%)`
  }

  const barInnerStyle = {
    backgroundColor: `hsl(${hue}, 50%, 66%)`,
    width: rssiPercent * 100 + '%'
  }

  const frequencySelectStyle = {
    backgroundColor: `hsl(${hue}, 50%, 90%)`
  }

  const selectedFrequency = channels.findByFrequency(props.frequency)

  return <div className={styles.ReceiverControl}>
    <select
      className={styles.FrequencySelector}
      style={frequencySelectStyle}
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

    <div
      className={styles.RssiBar}
      style={barStyle}
    >
      <div
        className={styles.RssiBarInner}
        style={barInnerStyle}
      />
      <div className={styles.RssiBarText}>{rssiText}</div>
    </div>
  </div>
}
