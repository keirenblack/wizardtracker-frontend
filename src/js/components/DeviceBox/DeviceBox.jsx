import React from 'react'
import { connect } from 'react-redux'

import ContentBox from '../ContentBox/ContentBox'
import DeviceConnector from './DeviceConnector/DeviceConnector'
import ReceiverControl from './ReceiverControl/ReceiverControl'
import DeviceStatus from './DeviceStatus/DeviceStatus'

const DeviceBox = (props) => {
  const receiverControls = []
  for (let i = 0; i < props.receiverCount; i++) {
    receiverControls.push(
      <ReceiverControl
        key={i}
        frequency={props.frequencies[i]}
        rssi={props.rssi[i]}
      />
    )
  }

  let deviceStatus = null;
  if (props.connected) {
    deviceStatus = <DeviceStatus
      temperature={props.temperature}
      voltage={props.voltage}
      hz={props.hz}
    />
  }

  return <ContentBox title='Device'>
    <DeviceConnector
      ports={props.ports}
      connecting={props.connecting}
      connected={props.connected}

      onConnect={props.onConnect}
      onDisconnect={props.onDisconnect}
    />

    {deviceStatus}
    {receiverControls}
  </ContentBox>
}

const mapStateToProps = (state) => state.device
const mapDispatchToProps = (dispatch) => {
  return {
    onDisconnect: () => { dispatch({ type: 'DISCONNECT_DEVICE' }) },
    onConnect: portName => { dispatch({ type: 'CONNECT_DEVICE', portName })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceBox)
