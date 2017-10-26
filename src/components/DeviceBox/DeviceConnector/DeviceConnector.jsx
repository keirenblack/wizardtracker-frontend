import * as React from 'react';
import styles from './DeviceConnector.scss';
import * as classNames from 'classnames';

export default class DeviceConnector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connecting: false
    }

    this.onConnect = this.onConnect.bind(this);
  }

  onConnect() {
    this.setState({
      connecting: true
    });
  }

  render() {
    let button = null;
    if (this.props.connected) {
      button = <button>Disconnect</button>;
    } else {
      button = <button onClick={this.onConnect}>Connect</button>;
    }

    let connectionStatusStyle = null;
    if (this.state.connecting) {
      connectionStatusStyle = styles.ConnectionStatusConnecting;
    } else if (this.props.connected) {
      connectionStatusStyle = styles.ConnectionStatusConnected;
    } else {
      connectionStatusStyle = styles.ConnectionStatusDisconnected;
    }

    return (
      <div className={styles.DeviceConnector}>
        <div className={connectionStatusStyle}>
          {this.state.connecting ? 'Connecting...' : this.props.connected ? 'Connected' : 'Disconnected'}
        </div>

        <select disabled={this.props.connected}>
          {this.props.comPorts.map((comPort, i) =>
            <option key={i}>{comPort}</option>
          )}
        </select>

        {button}
      </div>
    )
  }
}
