import * as React from 'react';
import * as io from 'socket.io-client';

import DeviceBox from '../DeviceBox/DeviceBox';

const socket = io.connect('http://127.0.0.1:5000/');

export default () =>
  <div>
    <DeviceBox />
  </div>
