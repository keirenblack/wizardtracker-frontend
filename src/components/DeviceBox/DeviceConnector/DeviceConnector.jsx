import * as React from 'react';
import styles from './DeviceConnector.scss';

export default class DeviceConnector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPort: props.ports[0] || ''
    }

    this.onConnect = this.onConnect.bind(this)
    this.onChangePort = this.onChangePort.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedPort: nextProps.ports[0] || ''
    })
  }

  onConnect() {
    this.props.onConnect(this.state.selectedPort.port)
  }

  onChangePort(event) {
    this.setState({ selectedPort: event.target.value })
  }

  render() {
    let button = null;
    if (this.props.connected) {
      button = <button
          className={styles.ConnectButton}
          onClick={this.props.onDisconnect}
        >
          Disconnect
        </button>;
    } else {
      button = <button
          className={styles.ConnectButton}
          onClick={this.onConnect}
        >
          Connect
        </button>;
    }

    let connectionStatusStyle = null;
    if (this.props.connecting) {
      connectionStatusStyle = styles.ConnectionStatusConnecting;
    } else if (this.props.connected) {
      connectionStatusStyle = styles.ConnectionStatusConnected;
    } else {
      connectionStatusStyle = styles.ConnectionStatusDisconnected;
    }

    return (
      <div className={styles.DeviceConnector}>
        <div className={connectionStatusStyle}>
          {this.props.connecting ? 'Connecting...' : this.props.connected ? 'Connected' : 'Disconnected'}
        </div>

        <div className={styles.ConnectContainer}>
          <select
            className={styles.PortSelector}
            disabled={this.props.connected}
            value={this.state.selectedPort}
            onChange={this.onChangePort}
          >
            {this.props.ports.map((port, i) =>
              <option key={i} value={port}>{port.port} ({port.description})</option>
            )}
          </select>

          {button}
        </div>
      </div>
    )
  }
}
