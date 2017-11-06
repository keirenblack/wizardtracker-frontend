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

  const rssiFilteredPercent = props.rssiFiltered / 255
  const rssiFilteredText = Math.round(rssiFilteredPercent * 100) + '%'

  const rssiRawPercent = props.rssiRaw / 255

  const hue = frequencyToHue(props.frequency)
  const barStyle = {
    backgroundColor: `hsl(${hue}, 50%, 80%)`
  }

  const barInnerFilteredStyle = {
    backgroundColor: `hsl(${hue}, 50%, 66%)`,
    width: rssiFilteredPercent * 100 + '%'
  }

  const barInnerRawStyle = {
    backgroundColor: `hsl(${hue}, 50%, 50%)`,
    width: rssiRawPercent * 100 + '%'
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
        className={styles.RssiBarInnerFiltered}
        style={barInnerFilteredStyle}
      />
      <div
        className={styles.RssiBarInnerRaw}
        style={barInnerRawStyle}
      />
      <div className={styles.RssiBarText}>{rssiFilteredText}</div>
    </div>
  </div>
}
